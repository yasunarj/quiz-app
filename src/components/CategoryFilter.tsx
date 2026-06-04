import Link from "next/link";
import { CATEGORIES, CATEGORY_LABELS, type Category } from "@/lib/categories";

type CategoryFilterProps = {
  activeCategory?: Category;
};

export function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  const filters = [
    {
      href: "/",
      label: "すべて",
      isActive: !activeCategory
    },
    ...CATEGORIES.map((category) => ({
      href: `/?category=${category}`,
      label: CATEGORY_LABELS[category],
      isActive: activeCategory === category
    }))
  ];

  return (
    <div className="-mx-5 overflow-x-auto px-5">
      <div className="flex min-w-max gap-2">
        {filters.map((filter) => (
          <Link
            key={filter.href}
            href={filter.href}
            className={
              filter.isActive
                ? "rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
                : "rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            }
          >
            {filter.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
