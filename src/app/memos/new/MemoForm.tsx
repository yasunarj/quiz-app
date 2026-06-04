"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/categories";
import { createMemo, type MemoFormState } from "./actions";

const initialState: MemoFormState = {
  errors: {}
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="h-12 w-full rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {pending ? "保存中..." : "メモを保存"}
    </button>
  );
}

export function MemoForm() {
  const [state, formAction] = useActionState(createMemo, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-5">
      <div>
        <label htmlFor="title" className="text-sm font-semibold text-slate-900">
          タイトル
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-base text-slate-950 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
          placeholder="例: useEffectの依存配列が分からない"
        />
        {state.errors.title ? (
          <p className="mt-2 text-sm text-red-600">{state.errors.title}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="category" className="text-sm font-semibold text-slate-900">
          カテゴリ
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue=""
          className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-base text-slate-950 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
        >
          <option value="" disabled>
            選択してください
          </option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {CATEGORY_LABELS[category]}
            </option>
          ))}
        </select>
        {state.errors.category ? (
          <p className="mt-2 text-sm text-red-600">{state.errors.category}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="content" className="text-sm font-semibold text-slate-900">
          メモ内容
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={8}
          className="mt-2 w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-3 text-base leading-6 text-slate-950 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
          placeholder="何が分からなかったか、どこでつまずいたかを書いてください。"
        />
        {state.errors.content ? (
          <p className="mt-2 text-sm text-red-600">{state.errors.content}</p>
        ) : null}
      </div>

      <SubmitButton />
    </form>
  );
}
