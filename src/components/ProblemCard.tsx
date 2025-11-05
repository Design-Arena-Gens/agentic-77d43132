"use client";
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { formatRelativeTime } from '@/lib/utils';
import { VoteButtons } from './VoteButtons';
import { useI18n } from '@/lib/i18n';

export function ProblemCard({ id }: { id: string }) {
  const { t } = useI18n();
  const problem = useAppStore((s) => s.problems[id]);
  const getUserById = useAppStore((s) => s.getUserById);
  const voteProblem = useAppStore((s) => s.voteProblem);
  const current = useAppStore((s) => s.getCurrentUser());
  if (!problem) return null;
  const author = getUserById(problem.userId);
  const score = problem.upvoterIds.length - problem.downvoterIds.length;
  return (
    <div className="card p-4 flex gap-4">
      <div>
        <VoteButtons
          score={score}
          onUp={() => current && voteProblem(problem.id, current.id, 1)}
          onDown={() => current && voteProblem(problem.id, current.id, -1)}
        />
      </div>
      <div className="flex-1">
        <Link href={`/p/${problem.id}`} className="text-lg font-semibold hover:underline">{problem.title}</Link>
        <div className="text-muted text-sm mt-1">
          {t('by')} {author?.name ?? 'Anon'} ? {formatRelativeTime(problem.createdAt)} ? {t(problem.category.toLowerCase())}
        </div>
        <p className="mt-2 line-clamp-3 whitespace-pre-wrap">{problem.description}</p>
        {problem.media.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {problem.media.slice(0,3).map((m)=> (
              <div key={m.id} className="aspect-video overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
                {m.type==='image' && <img src={m.src} alt="" className="w-full h-full object-cover"/>}
                {m.type==='video' && <video src={m.src} className="w-full h-full" controls/>}
                {m.type==='audio' && <audio src={m.src} className="w-full" controls/>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
