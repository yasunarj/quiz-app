"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isCategory } from "@/lib/categories";

export type MemoFormState = {
  errors: {
    title?: string;
    content?: string;
    category?: string;
  };
};

export async function createMemo(
  _previousState: MemoFormState,
  formData: FormData
): Promise<MemoFormState> {
  const title = formData.get("title");
  const content = formData.get("content");
  const category = formData.get("category");
  const normalizedTitle = typeof title === "string" ? title.trim() : "";
  const normalizedContent = typeof content === "string" ? content.trim() : "";
  const normalizedCategory = isCategory(category) ? category : null;

  const errors: MemoFormState["errors"] = {};

  if (normalizedTitle.length === 0) {
    errors.title = "タイトルを入力してください。";
  }

  if (normalizedContent.length === 0) {
    errors.content = "メモ内容を入力してください。";
  }

  if (!normalizedCategory) {
    errors.category = "カテゴリを選択してください。";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  if (!normalizedCategory) {
    return { errors: { category: "カテゴリを選択してください。" } };
  }

  await prisma.memo.create({
    data: {
      title: normalizedTitle,
      content: normalizedContent,
      category: normalizedCategory
    }
  });

  redirect("/");
}
