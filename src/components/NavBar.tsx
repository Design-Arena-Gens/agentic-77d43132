"use client";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Plus } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { NotificationBell } from './NotificationBell';

export function NavBar(){
  const { theme, setTheme } = useTheme();
  const { t, lang, setLang } = useI18n();
  const current = useAppStore((s) => s.getCurrentUser());
  const signOut = useAppStore((s) => s.signOut);
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur">
      <div className="container h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-brand">SolveIt</Link>
        <div className="flex items-center gap-2">
          <Link href="/post" className="btn btn-primary"><Plus className="w-4 h-4 mr-1"/> {t('post')}</Link>
          <NotificationBell />
          <button className="btn btn-outline" onClick={()=> setLang(lang==='en'?'hi':'en')}>{lang==='en'?t('hindi'):t('english')}</button>
          <button className="btn btn-outline" onClick={()=> setTheme(theme==='dark'?'light':'dark')} aria-label="Toggle theme">
            {theme==='dark'? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
          </button>
          {current ? (
            <div className="flex items-center gap-2">
              <Link href="/me" className="btn btn-outline">{current.name}</Link>
              <button className="btn btn-outline" onClick={()=>signOut()}>{t('signOut')}</button>
            </div>
          ) : (
            <Link href="/auth" className="btn btn-outline">{t('signIn')}</Link>
          )}
        </div>
      </div>
    </header>
  );
}
