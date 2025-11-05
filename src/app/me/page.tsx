"use client";
import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';

export default function MePage(){
  const current = useAppStore((s) => s.getCurrentUser());
  if (!current) return <div>Please sign in.</div>;
  return (
    <div className="grid gap-2">
      <h1 className="text-2xl font-bold">{current.name}</h1>
      <div className="text-muted">Reputation: {current.reputation}</div>
      <div className="flex gap-2">
        {current.badges.map((b)=> (
          <span key={b} className="px-2 py-0.5 rounded-full bg-brand/10 text-brand text-sm">{b}</span>
        ))}
      </div>
      <Link href={`/u/${current.id}`} className="btn btn-outline w-fit">View public profile</Link>
    </div>
  );
}
