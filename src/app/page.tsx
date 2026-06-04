import Link from "next/link";
import { CategoryFilter } from "@/components/CategoryFilter";
import { MemoCard } from "@/components/MemoCard";
import { CATEGORY_LABELS, isCategory, type Category } from "@/lib/categories";
import { prisma } from "@/lib/prisma";

type HomeProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { category } = await searchParams;
  const queryCategory = category ?? null;
  const activeCategory: Category | undefined = isCategory(queryCategory)
    ? queryCategory
    : undefined;

  const memos = await prisma.memo.findMany({
    where: activeCategory
      ? {
          category: activeCategory
        }
      : undefined,
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      title: true,
      category: true,
      createdAt: true
    }
  });

  return (
    <main className="mx-auto min-h-screen max-w-md px-5 py-6">
      <section className="pt-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Learning Quiz
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-10 text-slate-950">
          つまずきを、復習できる問題に変える
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-700">
          開発中に分からなかったことをメモとして保存し、あとでAIが問題化します。スキマ時間に見返して、理解を少しずつ固めるための学習アプリです。
        </p>
        <Link
          href="/memos/new"
          className="mt-6 flex h-12 items-center justify-center rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          メモを作成する
        </Link>
      </section>

      <section className="mt-8 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-white px-2 py-3 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs font-semibold text-slate-500">1</p>
          <p className="mt-1 text-xs font-semibold leading-5 text-slate-800">つまずきを保存</p>
        </div>
        <div className="rounded-lg bg-white px-2 py-3 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs font-semibold text-slate-500">2</p>
          <p className="mt-1 text-xs font-semibold leading-5 text-slate-800">AIが問題化</p>
        </div>
        <div className="rounded-lg bg-white px-2 py-3 shadow-sm ring-1 ring-slate-200">
          <p className="text-xs font-semibold text-slate-500">3</p>
          <p className="mt-1 text-xs font-semibold leading-5 text-slate-800">短時間で復習</p>
        </div>
      </section>

      <section className="mt-9">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-950">復習メモ</h2>
            <p className="mt-1 text-sm text-slate-600">
              {activeCategory
                ? `${CATEGORY_LABELS[activeCategory]} を復習中`
                : "保存したつまずきを新しい順に確認できます"}
            </p>
          </div>
          <Link
            href="/memos/new"
            className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
          >
            新規作成
          </Link>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            カテゴリ別に復習する
          </p>
          <CategoryFilter activeCategory={activeCategory} />
        </div>

        {memos.length > 0 ? (
          <div className="mt-5 space-y-3">
            {memos.map((memo) => (
              <MemoCard key={memo.id} memo={memo} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-white p-5 text-center">
            <h3 className="text-base font-semibold text-slate-950">
              {activeCategory ? "このカテゴリのメモはまだありません" : "まだメモがありません"}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              分からなかったことを1件保存しておくと、次の復習の入口になります。
            </p>
            <Link
              href="/memos/new"
              className="mt-5 flex h-12 items-center justify-center rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              最初のメモを作成
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
