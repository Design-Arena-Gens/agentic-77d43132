"use client";
import React from 'react';
import { useAppStore } from '@/lib/store';
import { formatRelativeTime } from '@/lib/utils';
import { VoteButtons } from './VoteButtons';

export function SolutionItem({ id }: { id: string }){
  const sol = useAppStore((s) => s.solutions[id]);
  const getUserById = useAppStore((s) => s.getUserById);
  const current = useAppStore((s) => s.getCurrentUser());
  const voteSolution = useAppStore((s) => s.voteSolution);
  if (!sol) return null;
  const author = getUserById(sol.userId);
  const score = sol.upvoterIds.length - sol.downvoterIds.length;
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between text-sm text-muted">
        <div className="flex items-center gap-2">
          <span className="font-medium">{author?.name ?? 'User'}</span>
          <span>? {formatRelativeTime(sol.createdAt)}</span>
          {sol.isAi && <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-brand/10 text-brand">AI</span>}
        </div>
        <VoteButtons score={score} onUp={()=> current && voteSolution(sol.id, current.id, 1)} onDown={()=> current && voteSolution(sol.id, current.id, -1)} />
      </div>
      <div className="mt-2 whitespace-pre-wrap">
        {sol.content}
      </div>
    </div>
  );
}
