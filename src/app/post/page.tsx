"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import type { Category, MediaItem } from '@/lib/types';
import { useI18n } from '@/lib/i18n';

export default function PostPage(){
  const { t } = useI18n();
  const router = useRouter();
  const current = useAppStore((s) => s.getCurrentUser());
  const addProblem = useAppStore((s) => s.addProblem);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('Other');
  const [media, setMedia] = useState<MediaItem[]>([]);

  const handleFile = async (files: FileList | null, type: 'image'|'video'|'audio') => {
    if (!files) return;
    const readers = Array.from(files).map((file) => new Promise<string>((resolve)=>{
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result as string);
      fr.readAsDataURL(file);
    }));
    const urls = await Promise.all(readers);
    setMedia((prev)=> [...prev, ...urls.map((src)=> ({ id: crypto.randomUUID(), type, src }))]);
  };

  const submit = () => {
    if (!current) { router.push('/auth'); return; }
    const p = addProblem({ title, description, category, media });
    router.push(`/p/${p.id}`);
  };

  return (
    <div className="grid gap-3 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">{t('postProblem')}</h1>
      <input className="input" placeholder={t('title')} value={title} onChange={(e)=>setTitle(e.target.value)} />
      <textarea className="input min-h-[140px]" placeholder={t('description')} value={description} onChange={(e)=>setDescription(e.target.value)} />
      <select className="input" value={category} onChange={(e)=> setCategory(e.target.value as Category)}>
        {['Tech','Life','Career','Relationship','Business','Study','Health','Other'].map((c)=> (
          <option key={c} value={c}>{t(c.toLowerCase())}</option>
        ))}
      </select>

      <div className="grid gap-2">
        <label className="text-sm text-muted">{t('addMedia')}</label>
        <div className="grid gap-2">
          <input type="file" accept="image/*" multiple onChange={(e)=> handleFile(e.target.files, 'image')} />
          <input type="file" accept="video/*" multiple onChange={(e)=> handleFile(e.target.files, 'video')} />
          <input type="file" accept="audio/*" multiple onChange={(e)=> handleFile(e.target.files, 'audio')} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {media.map((m)=> (
            <div key={m.id} className="border rounded-lg overflow-hidden">
              {m.type==='image' && <img src={m.src} alt="" className="w-full h-24 object-cover"/>}
              {m.type==='video' && <video src={m.src} className="w-full h-24" controls/>}
              {m.type==='audio' && <audio src={m.src} className="w-full" controls/>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={submit}>{t('submit')}</button>
      </div>
    </div>
  );
}
