"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export default function UserProfile(){
  const params = useParams();
  const id = params?.id as string;
  const user = useAppStore((s) => s.getUserById(id));
  if (!user) return <div>Not found</div>;
  return (
    <div className="grid gap-2">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <div className="text-muted">Reputation: {user.reputation}</div>
      <div className="flex gap-2">
        {user.badges.map((b)=> (
          <span key={b} className="px-2 py-0.5 rounded-full bg-brand/10 text-brand text-sm">{b}</span>
        ))}
      </div>
    </div>
  );
}
