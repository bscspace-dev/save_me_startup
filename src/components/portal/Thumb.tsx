import Image from "next/image";

export function Thumb({
  label,
  tone,
  badge,
  image,
  count,
}: {
  label: string;
  tone: string;
  badge?: string;
  image?: string;
  count?: number;
}) {
  return (
    <div className={`relative flex aspect-[4/3] items-end overflow-hidden bg-gradient-to-br ${tone} p-4`}>
      {image ? (
        <Image src={image} alt={label} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      ) : (
        <span className="text-sm font-bold text-pt-text/80">{label}</span>
      )}
      {badge && <span className="absolute left-3 top-3 rounded-full bg-pt-gold px-3 py-1 text-xs font-bold text-pt-accent">{badge}</span>}
      {count != null && count > 1 && (
        <span className="absolute right-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white">{count}장</span>
      )}
    </div>
  );
}
