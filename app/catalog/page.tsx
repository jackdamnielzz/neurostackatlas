import { getCategories, getEntries } from "@/lib/data";
import { CatalogClient } from "@/app/catalog/catalog-client";

interface CatalogPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const entries = getEntries();
  const categories = getCategories();

  return (
    <CatalogClient
      entries={entries}
      categories={categories}
      initialQuery={params.q ?? ""}
      initialCategory={params.category ?? "all"}
    />
  );
}
