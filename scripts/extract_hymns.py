"""Extract CCC hymns from PDF and output as JSON for the hymnal page."""
import sys
import io
import json
import re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from PyPDF2 import PdfReader

reader = PdfReader(r"C:\Users\sikir\Desktop\CCC-Hymns.pdf")

full_text = ""
for page in reader.pages:
    text = page.extract_text()
    if text:
        full_text += text + "\n"

# Parse hymns - they follow a pattern: "Hymn N" or "Orin N"
# Each hymn has Yoruba (Orin) and English (Hymn) versions side by side
hymns = []
current_hymn_num = None
current_section = None

# Split into lines and process
lines = full_text.split('\n')

# Strategy: find all "Hymn N" blocks and extract surrounding text
# The PDF has Yoruba on left, English on right, but text extraction merges them

# Let's use a regex-based approach to find hymn markers
hymn_pattern = re.compile(r'(?:^|\s)Hymn\s+(\d+)\s*$', re.MULTILINE)
orin_pattern = re.compile(r'(?:^|\s)Orin\s+(\d+)\s*$', re.MULTILINE)

# Find all hymn positions
hymn_positions = [(m.start(), int(m.group(1)), 'english') for m in hymn_pattern.finditer(full_text)]
orin_positions = [(m.start(), int(m.group(1)), 'yoruba') for m in orin_pattern.finditer(full_text)]

# Combine and sort by position
all_positions = sorted(hymn_positions + orin_positions, key=lambda x: x[0])

print(f"Found {len(hymn_positions)} English hymn markers and {len(orin_positions)} Yoruba markers", file=sys.stderr)

# Extract text between markers
hymn_data = {}

for i, (pos, num, lang) in enumerate(all_positions):
    # Get text from this marker to the next marker
    if i + 1 < len(all_positions):
        end_pos = all_positions[i + 1][0]
    else:
        end_pos = len(full_text)

    chunk = full_text[pos:end_pos].strip()

    # Remove header lines
    chunk = re.sub(r'\d+\s*\|\s*P\s*a\s*g\s*e\s*', '', chunk)
    chunk = re.sub(r'CELESTIAL CHRUCH OF CHRIST.*?LONDON\s*', '', chunk)

    # Remove the "Hymn N" or "Orin N" header
    chunk = re.sub(r'^(?:Hymn|Orin)\s+\d+\s*', '', chunk).strip()

    if num not in hymn_data:
        hymn_data[num] = {'number': num, 'yoruba': '', 'english': '', 'solfa': ''}

    # Extract solfa notation (lines with semicolons and musical notes like d; r; m;)
    solfa_lines = []
    lyric_lines = []
    for line in chunk.split('\n'):
        line = line.strip()
        if not line:
            continue
        # Check if line is solfa notation
        if re.search(r'[drmfslt];', line) and len(line) < 100:
            solfa_lines.append(line)
        elif re.match(r'^\s*[\]}]\s*\d', line):  # continuation markers like ]2ce
            solfa_lines.append(line)
        else:
            lyric_lines.append(line)

    text = '\n'.join(lyric_lines).strip()

    # Remove section headers that got mixed in
    text = re.sub(r'(?:PROCESSIONAL HYMN|HYMN FOR LIG[HT]TING CANDLE|HYMN WHILE KNEELING DOWN|FORGIVENESS AND REPENTANCE|HYMN OF OFFERING|COMMUNION HYMN|CLOSING HYMN).*?(?=\n|$)', '', text, flags=re.IGNORECASE).strip()

    if lang == 'yoruba':
        hymn_data[num]['yoruba'] = text
        if solfa_lines and not hymn_data[num]['solfa']:
            hymn_data[num]['solfa'] = '\n'.join(solfa_lines)
    else:
        hymn_data[num]['english'] = text
        if solfa_lines and not hymn_data[num]['solfa']:
            hymn_data[num]['solfa'] = '\n'.join(solfa_lines)

# Also try to extract section/category info
# Look for common section headers in the text
section_markers = [
    (r'PROCESSIONAL HYMN', 'Processional'),
    (r'HYMN FOR LIG[HT].*?CANDLE', 'Candle Lighting'),
    (r'HYMN WHILE KNEELING', 'Kneeling'),
    (r'FORGIVENESS AND REPENTANCE', 'Forgiveness & Repentance'),
    (r'ORIN AKUNL[ẸE]K[ỌO]', 'Kneeling'),
    (r'ORIN FITILA', 'Candle Lighting'),
    (r'ORIN AK[ỌO]W[ỌO]LE', 'Processional'),
    (r'IDARIJI ATI IRONUPIWADA', 'Forgiveness & Repentance'),
    (r'ORIN GBIGBA?\s*OR[EẸ]', 'Offering'),
    (r'ORIN [ÀA]J[ÀA]', 'Thanksgiving'),
    (r'ORIN [ÌI]W[ÀA]S[ÙU]', 'Sermon'),
    (r'ORIN [ÌI]PARI', 'Closing'),
    (r'CLOSING HYMN', 'Closing'),
]

# Convert to sorted list
sorted_hymns = sorted(hymn_data.values(), key=lambda x: x['number'])

# Clean up and format
output = []
for h in sorted_hymns:
    entry = {
        'number': h['number'],
        'yoruba': h['yoruba'].strip(),
        'english': h['english'].strip(),
    }
    if h['solfa']:
        entry['solfa'] = h['solfa'].strip()
    if entry['yoruba'] or entry['english']:
        output.append(entry)

# Write to JSON file
output_path = r"C:\Users\sikir\Desktop\church-website\data\hymns.json"
import os
os.makedirs(os.path.dirname(output_path), exist_ok=True)

with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(output)} hymns to {output_path}", file=sys.stderr)

# Also print a summary
for h in output[:5]:
    print(f"\n--- Hymn {h['number']} ---", file=sys.stderr)
    eng = h['english'][:100] + '...' if len(h['english']) > 100 else h['english']
    print(f"English: {eng}", file=sys.stderr)
