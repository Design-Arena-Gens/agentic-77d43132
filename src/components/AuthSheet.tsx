"use client";
import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';

export function AuthSheet() {
  const { t } = useI18n();
  const signInWithEmail = useAppStore((s) => s.signInWithEmail);
  const signInWithGoogle = useAppStore((s) => s.signInWithGoogle);
  const signInWithPhone = useAppStore((s) => s.signInWithPhone);

  const [tab, setTab] = useState<'email' | 'google' | 'phone'>('email');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  return (
    <div className="card p-4 w-full max-w-md">
      <div className="flex gap-2 mb-4">
        <button className={`btn btn-outline ${tab==='email'?'bg-gray-100 dark:bg-gray-800':''}`} onClick={() => setTab('email')}>{t('emailSignIn')}</button>
        <button className={`btn btn-outline ${tab==='google'?'bg-gray-100 dark:bg-gray-800':''}`} onClick={() => setTab('google')}>{t('googleSignIn')}</button>
        <button className={`btn btn-outline ${tab==='phone'?'bg-gray-100 dark:bg-gray-800':''}`} onClick={() => setTab('phone')}>{t('mobileSignIn')}</button>
      </div>

      {tab === 'email' && (
        <form className="grid gap-2" onSubmit={(e)=>{e.preventDefault(); signInWithEmail(name||'User', email||`user${Math.floor(Math.random()*1000)}@example.com`);}}>
          <input className="input" placeholder={t('name')} value={name} onChange={(e)=>setName(e.target.value)} />
          <input className="input" placeholder={t('email')} value={email} onChange={(e)=>setEmail(e.target.value)} />
          <button className="btn btn-primary" type="submit">{t('signIn')}</button>
        </form>
      )}

      {tab === 'google' && (
        <div className="grid gap-3">
          <button className="btn btn-primary" onClick={()=>signInWithGoogle()}>{t('googleSignIn')}</button>
        </div>
      )}

      {tab === 'phone' && (
        <div className="grid gap-2">
          <input className="input" placeholder={t('name')} value={name} onChange={(e)=>setName(e.target.value)} />
          <input className="input" placeholder={t('phone')} value={phone} onChange={(e)=>setPhone(e.target.value)} />
          {!otpSent ? (
            <button className="btn btn-outline" onClick={()=> setOtpSent(true)}>{t('sendOtp')}</button>
          ): (
            <>
              <input className="input" placeholder={t('otp')} value={otp} onChange={(e)=>setOtp(e.target.value)} />
              <button className="btn btn-primary" onClick={()=>{ if(otp==='123456'){ signInWithPhone(name||'User', phone||''); } }}>
                {t('verify')}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
