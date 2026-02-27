export default function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      <div className="h-px w-16 bg-gold/30" />
      <span className="text-gold/60 text-sm">&#9670;</span>
      <div className="h-px w-16 bg-gold/30" />
    </div>
  );
}
