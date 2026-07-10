import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/home/category-grid";
import { SearchByBrand } from "@/components/home/search-by-brand";
import { LatestProducts } from "@/components/home/latest-products";
import { TrustSection } from "@/components/home/trust-section";
import { ValueProps } from "@/components/home/value-props";
import { HowToBuy } from "@/components/home/how-to-buy";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CategoryGrid />
      <SearchByBrand />
      <LatestProducts />
      <TrustSection />
      <ValueProps />
      <HowToBuy />
    </main>
  );
}
