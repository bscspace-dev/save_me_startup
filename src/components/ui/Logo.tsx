import Image from "next/image";

// 로고 원본(public/logo.png)은 둥근 로고 바깥에 배경 여백이 있어서, 살짝 확대해 원형으로 잘라 씁니다.
export function Logo({ size = 36 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="relative inline-block shrink-0 overflow-hidden rounded-full"
      style={{ width: size, height: size }}
    >
      <Image src="/logo.png" alt="" width={size * 2} height={size * 2} priority className="size-full scale-[1.1] object-cover" />
    </span>
  );
}
