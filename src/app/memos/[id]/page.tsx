import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryBadge } from "@/components/CategoryBadge";
import { formatDate } from "@/lib/formatDate";
import { prisma } from "@/lib/prisma";

type MemoDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MemoDetailPage({ params }: MemoDetailPageProps) {
  const { id } = await params;
  const memo = await prisma.memo.findUnique({
    where: {
      id
    },
    select: {
      title: true,
      content: true,
      category: true,
      createdAt: true
    }
  });

  if (!memo) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-md px-5 py-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Memo Detail
          </p>
          <h1 className="mt-1 text-2xl font-bold leading-8 text-slate-950">{memo.title}</h1>
        </div>
        <Link
          href="/"
          className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
        >
          戻る
        </Link>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <CategoryBadge category={memo.category} />
        <p className="text-xs font-medium text-slate-500">{formatDate(memo.createdAt)}</p>
      </div>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">メモ内容</h2>
        <p className="mt-3 whitespace-pre-wrap text-base leading-7 text-slate-800">
          {memo.content}
        </p>
      </section>

      <section className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
        <h2 className="text-sm font-semibold text-slate-900">次のStep</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Step 4で、このメモをもとにAIが復習問題を1問生成します。
        </p>
        <button
          type="button"
          disabled
          className="mt-4 h-12 w-full cursor-not-allowed rounded-lg bg-slate-300 px-4 text-sm font-semibold text-slate-600"
        >
          問題を生成する
        </button>
      </section>
    </main>
  );
}
