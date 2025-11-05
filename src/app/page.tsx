"use client";
import React, { useMemo, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Category } from '@/lib/types';
import { CategoryChips } from '@/components/CategoryChips';
import { ProblemCard } from '@/components/ProblemCard';
import { useI18n } from '@/lib/i18n';

export default function HomePage(){
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'latest'|'trending'>('latest');
  const [category, setCategory] = useState<Category|undefined>();
  const problems = useAppStore((s) => s.getProblemsArray());

  const filtered = useMemo(()=>{
    let list = problems;
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p)=> p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (category) list = list.filter((p)=> p.category === category);
    if (tab === 'trending') {
      list = [...list].sort((a,b)=> (b.upvoterIds.length - b.downvoterIds.length) - (a.upvoterIds.length - a.downvoterIds.length));
    }
    return list;
  }, [problems, query, category, tab]);

  return (
    <div className="grid gap-4">
      <div className="flex gap-2">
        <input className="input" placeholder={t('searchPlaceholder')} value={query} onChange={(e)=>setQuery(e.target.value)} />
        <div className="flex gap-2">
          <button className={`btn btn-outline ${tab==='latest'?'bg-gray-100 dark:bg-gray-800':''}`} onClick={()=>setTab('latest')}>{t('latest')}</button>
          <button className={`btn btn-outline ${tab==='trending'?'bg-gray-100 dark:bg-gray-800':''}`} onClick={()=>setTab('trending')}>{t('trending')}</button>
        </div>
      </div>
      <CategoryChips value={category} onChange={setCategory} />
      <div className="grid gap-3">
        {filtered.map((p)=> (
          <ProblemCard key={p.id} id={p.id} />
        ))}
        {filtered.length===0 && (
          <div className="text-center text-muted py-10">No problems yet. Post one!</div>
        )}
      </div>
    </div>
  );
}
