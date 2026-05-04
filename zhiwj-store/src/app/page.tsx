import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/sanity";

interface HomePageProps {
  searchParams: { col?: string };
}

export default async function Home({ searchParams }: HomePageProps) {
  const collection = searchParams.col;
  const products = await getProducts(collection);

  return (
    <>
      {/* Hero Section */}
      <HeroSlider />

      {/* Collection Filter Info */}
      {collection && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 text-center">
            Коллекция: {collection}
          </p>
        </div>
      )}

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wide">
            {collection || 'Все коллекции'}
          </h2>
          <p className="text-sm text-gray-500">
            {products.length} товаров
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm uppercase tracking-widest">
              В этой коллекции пока нет товаров
            </p>
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-[0.2em] mb-8">
            ZHIWJ
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Премиальная одежда, созданная с уважением к традициям и вниманием к деталям. 
            Каждая вещь — это история, которую вы носите с собой.
          </p>
          <div className="mt-12 flex justify-center gap-8 text-xs uppercase tracking-widest text-gray-500">
            <span>Tamaddoon</span>
            <span>•</span>
            <span>Metomorfoz</span>
            <span>•</span>
            <span>Bahor</span>
          </div>
        </div>
      </section>
    </>
  );
}
