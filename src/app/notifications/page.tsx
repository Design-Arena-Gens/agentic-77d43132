"use client";
import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';

export default function NotificationsPage(){
  const current = useAppStore((s) => s.getCurrentUser());
  const items = useAppStore((s) => current ? s.getNotificationsForUser(current.id) : []);
  const markRead = useAppStore((s) => s.markNotificationRead);
  if (!current) return <div>Please sign in to view notifications.</div>;
  return (
    <div className="grid gap-2">
      {items.length===0 && <div className="text-muted">No notifications</div>}
      {items.map((n)=> (
        <div key={n.id} className="card p-3 flex items-center justify-between">
          <div className="text-sm">
            {n.type==='new_solution' && (
              <>
                New solution on your problem ? <Link href={`/p/${n.data.problemId}`} className="underline">view</Link>
              </>
            )}
            {n.type==='upvote' && (
              <>
                Your problem received an upvote ? <Link href={`/p/${n.data.problemId}`} className="underline">view</Link>
              </>
            )}
          </div>
          {!n.read && <button className="btn btn-outline" onClick={()=> markRead(n.id)}>Mark read</button>}
        </div>
      ))}
    </div>
  );
}
