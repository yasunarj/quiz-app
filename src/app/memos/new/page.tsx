import Link from "next/link";
import { MemoForm } from "./MemoForm";

export default function NewMemoPage() {
  return (
    <main className="mx-auto min-h-screen max-w-md px-5 py-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            New Memo
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-950">つまずきを保存</h1>
        </div>
        <Link
          href="/"
          className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
        >
          戻る
        </Link>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-700">
        開発中に分からなかったことを短く残しておくと、次のStepでAIが復習問題に変換できます。
      </p>

      <MemoForm />
    </main>
  );
}
