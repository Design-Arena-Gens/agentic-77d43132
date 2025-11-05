"use client";
import React from 'react';
import type { Category } from '@/lib/types';
import { useI18n } from '@/lib/i18n';

const all: Category[] = ['Tech','Life','Career','Relationship','Business','Study','Health','Other'];

export function CategoryChips({ value, onChange }: { value?: Category; onChange: (c?: Category)=>void }){
  const { t } = useI18n();
  return (
    <div className="flex flex-wrap gap-2">
      <button className={`btn btn-outline ${!value?'bg-gray-100 dark:bg-gray-800':''}`} onClick={()=>onChange(undefined)}>{t('categories')}</button>
      {all.map((c)=> (
        <button key={c} className={`btn btn-outline ${value===c?'bg-gray-100 dark:bg-gray-800':''}`} onClick={()=>onChange(c)}>
          {t(c.toLowerCase())}
        </button>
      ))}
    </div>
  );
}
