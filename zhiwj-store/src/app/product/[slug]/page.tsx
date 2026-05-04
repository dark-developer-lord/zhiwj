import { getProduct } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const images = product.images || [];
  const mainImage = images[0] ? urlFor(images[0]).width(800).height(1000).url() : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Images */}
        <div className="space-y-4">
          {mainImage && (
            <div className="relative aspect-[3/4] bg-gray-100">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(1, 5).map((img: any, index: number) => {
                const thumbUrl = urlFor(img).width(200).height(200).url();
                return (
                  <div key={index} className="relative aspect-square bg-gray-100">
                    <Image
                      src={thumbUrl}
                      alt={`${product.name} - view ${index + 2}`}
                      fill
                      className="object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          {/* Collection Badge */}
          {product.collection && (
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              {product.collection}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            {product.name}
          </h1>

          <p className="text-2xl font-medium mb-8">
            {product.price.toLocaleString('ru-RU')} TJS
          </p>

          {/* Description */}
          {product.description && (
            <div className="prose prose-sm mb-8 text-gray-600">
              <p>{product.description}</p>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest mb-3">Размеры в наличии:</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: string) => (
                  <span 
                    key={size}
                    className="px-4 py-2 border border-gray-200 text-sm hover:border-black hover:bg-black hover:text-white transition-all cursor-pointer"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stock Status */}
          <div className="mb-8">
            {product.inStock ? (
              <p className="text-green-600 text-sm">✓ В наличии</p>
            ) : (
              <p className="text-red-500 text-sm">✕ Нет в наличии</p>
            )}
          </div>

          {/* History / Trophies */}
          {product.history && (
            <div className="border-t border-gray-100 pt-8 mt-8">
              <h3 className="text-sm uppercase tracking-widest mb-4">История изделия</h3>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {product.history}
              </p>
            </div>
          )}

          {/* Add to Cart Button - Client Component needed for full functionality */}
          <button 
            disabled={!product.inStock}
            className="w-full bg-black text-white py-4 text-sm uppercase tracking-[0.2em] font-medium hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mt-8"
          >
            {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
          </button>

          {/* Trust Badges */}
          <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500">Бесплатная доставка</p>
              <p className="text-[10px] text-gray-400 mt-1">от 500 TJS</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Возврат</p>
              <p className="text-[10px] text-gray-400 mt-1">14 дней</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Поддержка</p>
              <p className="text-[10px] text-gray-400 mt-1">24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
