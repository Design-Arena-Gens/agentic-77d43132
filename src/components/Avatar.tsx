"use client";
import Image from 'next/image';
import { getAvatarFallback } from '@/lib/utils';

export function Avatar({ name, url, size = 32 }: { name: string; url?: string; size?: number }) {
  if (url) {
    return (
      <Image
        src={url}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    );
  }
  return (
    <div
      className="rounded-full bg-brand text-white grid place-items-center"
      style={{ width: size, height: size }}
      aria-label={name}
    >
      <span className="text-xs font-bold">{getAvatarFallback(name)}</span>
    </div>
  );
}
