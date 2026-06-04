export const CATEGORIES = ["FRONTEND", "BACKEND", "SQL", "INFRA", "OTHER"] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  FRONTEND: "フロントエンド",
  BACKEND: "バックエンド",
  SQL: "SQL",
  INFRA: "インフラ",
  OTHER: "その他"
};

export function isCategory(value: FormDataEntryValue | null): value is Category {
  return typeof value === "string" && CATEGORIES.includes(value as Category);
}
