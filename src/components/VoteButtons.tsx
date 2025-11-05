"use client";
import React from 'react';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';

export function VoteButtons({ score, onUp, onDown }: { score: number; onUp: ()=>void; onDown: ()=>void }){
  return (
    <div className="flex items-center gap-2">
      <button className="btn btn-outline p-2" onClick={onUp} aria-label="Upvote"><ArrowBigUp className="w-5 h-5"/></button>
      <span className="text-sm font-medium w-10 text-center">{score}</span>
      <button className="btn btn-outline p-2" onClick={onDown} aria-label="Downvote"><ArrowBigDown className="w-5 h-5"/></button>
    </div>
  );
}
