"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { SolutionItem } from '@/components/SolutionItem';
import { VoteButtons } from '@/components/VoteButtons';
import { useI18n } from '@/lib/i18n';

export default function ProblemDetail(){
  const params = useParams();
  const { t, lang } = useI18n();
  const id = params?.id as string;
  const p = useAppStore((s) => s.problems[id]);
  const current = useAppStore((s) => s.getCurrentUser());
  const voteProblem = useAppStore((s) => s.voteProblem);
  const addSolution = useAppStore((s) => s.addSolution);
  const solutions = useAppStore((s) => s.getSolutionsForProblem(id));
  const ensureAiUser = useAppStore((s) => s.ensureAiUser);

  const [content, setContent] = useState('');
  const score = (p?.upvoterIds.length ?? 0) - (p?.downvoterIds.length ?? 0);

  if (!p) return <div>Not found</div>;

  const runAi = async () => {
    const res = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: p.title, description: p.description, language: lang }) });
    const data = await res.json();
    const aiUser = ensureAiUser();
    addSolution(p.id, data.suggestion as string, { userId: aiUser.id, isAi: true });
  };

  return (
    <div className="grid gap-4">
      <div className="card p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{p.title}</h1>
          <VoteButtons score={score} onUp={()=> current && voteProblem(p.id, current.id, 1)} onDown={()=> current && voteProblem(p.id, current.id, -1)} />
        </div>
        <p className="mt-2 whitespace-pre-wrap">{p.description}</p>
        {p.media.length>0 && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {p.media.map((m)=> (
              <div key={m.id} className="border rounded-lg overflow-hidden">
                {m.type==='image' && <img src={m.src} alt="" className="w-full h-auto"/>}
                {m.type==='video' && <video src={m.src} className="w-full" controls/>}
                {m.type==='audio' && <audio src={m.src} className="w-full" controls/>}
              </div>
            ))}
          </div>
        )}
        <div className="mt-3">
          <button className="btn btn-primary" onClick={runAi}>{t('aiSuggest')}</button>
        </div>
      </div>

      <div className="grid gap-2">
        <h2 className="text-lg font-semibold">{t('solutions')}</h2>
        {solutions.length===0 && <div className="text-muted">{t('noSolutionsYet')}</div>}
        {solutions.map((s)=> <SolutionItem key={s.id} id={s.id} />)}
      </div>

      <div className="card p-4 grid gap-2">
        <textarea className="input min-h-[100px]" placeholder={t('addSolution')} value={content} onChange={(e)=>setContent(e.target.value)} />
        <button className="btn btn-primary w-fit" onClick={()=>{ if(!current) return; addSolution(p.id, content); setContent(''); }}>{t('submit')}</button>
      </div>
    </div>
  );
}
