"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontSize } from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiLink,
  FiType,
} from "react-icons/fi";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      TextStyle,
      Color,
      FontSize,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-accent underline" },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[200px] px-4 py-3 focus:outline-none text-foreground",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  if (!editor) return null;

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const setFontSize = (size: string) => {
    (editor.chain().focus() as any).setFontSize(size).run();
  };

  const btnClass = (active: boolean) =>
    `p-1.5 rounded transition ${
      active
        ? "bg-accent/20 text-accent"
        : "text-foreground/60 hover:bg-muted-light hover:text-foreground"
    }`;

  return (
    <div className="rounded-lg border border-border bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-muted-light/50 px-2 py-1.5">
        {/* Text formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive("bold"))}
          title="Bold"
        >
          <FiBold size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive("italic"))}
          title="Italic"
        >
          <FiItalic size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={btnClass(editor.isActive("underline"))}
          title="Underline"
        >
          <FiUnderline size={16} />
        </button>

        <div className="mx-1 h-5 w-px bg-border" />

        {/* Font size */}
        <select
          onChange={(e) => {
            const val = e.target.value;
            if (val === "default") {
              (editor.chain().focus() as any).unsetFontSize().run();
            } else {
              setFontSize(val);
            }
          }}
          className="rounded border border-border bg-white px-1.5 py-1 text-xs focus:outline-none"
          title="Font Size"
        >
          <option value="default">Size</option>
          <option value="12px">Small</option>
          <option value="14px">Normal</option>
          <option value="16px">Medium</option>
          <option value="18px">Large</option>
          <option value="22px">X-Large</option>
          <option value="28px">XX-Large</option>
        </select>

        {/* Text color */}
        <input
          type="color"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
          className="h-7 w-7 cursor-pointer rounded border border-border"
          title="Text Color"
          defaultValue="#000000"
        />

        <div className="mx-1 h-5 w-px bg-border" />

        {/* Headings */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={btnClass(editor.isActive("heading", { level: 2 }))}
          title="Heading"
        >
          <FiType size={16} />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`${btnClass(editor.isActive("heading", { level: 3 }))} text-xs font-bold`}
          title="Subheading"
        >
          H3
        </button>

        <div className="mx-1 h-5 w-px bg-border" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive("bulletList"))}
          title="Bullet List"
        >
          <FiList size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${btnClass(editor.isActive("orderedList"))} text-xs font-bold`}
          title="Numbered List"
        >
          1.
        </button>

        <div className="mx-1 h-5 w-px bg-border" />

        {/* Alignment */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={btnClass(editor.isActive({ textAlign: "left" }))}
          title="Align Left"
        >
          <FiAlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={btnClass(editor.isActive({ textAlign: "center" }))}
          title="Align Center"
        >
          <FiAlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={btnClass(editor.isActive({ textAlign: "right" }))}
          title="Align Right"
        >
          <FiAlignRight size={16} />
        </button>

        <div className="mx-1 h-5 w-px bg-border" />

        {/* Link */}
        <button
          type="button"
          onClick={addLink}
          className={btnClass(editor.isActive("link"))}
          title="Add Link"
        >
          <FiLink size={16} />
        </button>
        {editor.isActive("link") && (
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="px-1.5 py-1 text-xs text-destructive hover:underline"
          >
            Unlink
          </button>
        )}
      </div>

      {/* Editor area */}
      <div className="relative">
        {!content && placeholder && (
          <div className="pointer-events-none absolute left-4 top-3 text-sm text-muted/50">
            {placeholder}
          </div>
        )}
        <EditorContent editor={editor} />
      </div>

      {/* Editor styles */}
      <style jsx global>{`
        .ProseMirror {
          min-height: 200px;
          padding: 12px 16px;
          font-size: 14px;
          line-height: 1.6;
        }
        .ProseMirror:focus {
          outline: none;
        }
        .ProseMirror h2 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          font-family: var(--font-serif);
        }
        .ProseMirror h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-top: 0.75rem;
          margin-bottom: 0.25rem;
        }
        .ProseMirror p {
          margin-bottom: 0.5rem;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .ProseMirror ul {
          list-style: disc;
        }
        .ProseMirror ol {
          list-style: decimal;
        }
        .ProseMirror a {
          color: var(--accent);
          text-decoration: underline;
        }
        .ProseMirror blockquote {
          border-left: 3px solid var(--border);
          padding-left: 1rem;
          color: var(--muted);
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
