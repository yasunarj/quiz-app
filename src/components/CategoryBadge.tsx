import { CATEGORY_LABELS, type Category } from "@/lib/categories";

type CategoryBadgeProps = {
  category: string;
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const label = CATEGORY_LABELS[category as Category] ?? category;

  return (
    <span className="inline-flex h-7 items-center rounded-full bg-slate-100 px-3 text-xs font-semibold text-slate-700">
      {label}
    </span>
  );
}
