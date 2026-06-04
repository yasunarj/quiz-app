import Link from "next/link";
import { CategoryBadge } from "@/components/CategoryBadge";
import { formatDate } from "@/lib/formatDate";

type MemoCardProps = {
  memo: {
    id: string;
    title: string;
    category: string;
    createdAt: Date;
  };
};

export function MemoCard({ memo }: MemoCardProps) {
  return (
    <Link
      href={`/memos/${memo.id}`}
      className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="min-w-0 flex-1 text-base font-semibold leading-6 text-slate-950">
          {memo.title}
        </h2>
        <CategoryBadge category={memo.category} />
      </div>
      <p className="mt-3 text-xs font-medium text-slate-500">{formatDate(memo.createdAt)}</p>
    </Link>
  );
}
