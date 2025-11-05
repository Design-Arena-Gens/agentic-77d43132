"use client";
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function NotificationBell(){
  const current = useAppStore((s) => s.getCurrentUser());
  const count = useAppStore((s) => current ? s.getNotificationsForUser(current.id).filter(n=>!n.read).length : 0);
  return (
    <Link href="/notifications" className="relative btn btn-outline p-2">
      <Bell className="w-5 h-5"/>
      {count>0 && (
        <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5">{count}</span>
      )}
    </Link>
  );
}
