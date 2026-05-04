"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { useCartStore } from "@/lib/store";

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  images?: any[];
  sizes?: string[];
  inStock: boolean;
  collection?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const hasLowStock = false; // Can be extended with real stock count

  const mainImage = product.images?.[0] ? urlFor(product.images[0]).width(600).height(800).url() : null;

  return (
    <div className="group cursor-pointer">
      <Link href={`/product/${product.slug.current}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs uppercase tracking-widest">
              No Image
            </div>
          )}
          
          {/* Quick Add Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem({
                _id: product._id,
                name: product.name,
                price: product.price,
                image: mainImage,
                size: product.sizes?.[0] || 'M',
                quantity: 1,
              });
            }}
            disabled={!product.inStock}
            className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm text-black py-3 text-xs uppercase tracking-widest font-medium opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
          </button>

          {/* Collection Badge */}
          {product.collection && (
            <span className="absolute top-3 left-3 bg-black/80 text-white text-[10px] uppercase tracking-wider px-2 py-1">
              {product.collection}
            </span>
          )}

          {/* Low Stock Warning */}
          {hasLowStock && product.inStock && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] uppercase tracking-wider px-2 py-1 animate-pulse">
              Мало
            </span>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-1">
        <Link href={`/product/${product.slug.current}`}>
          <h3 className="font-medium text-sm tracking-wide truncate">{product.name}</h3>
        </Link>
        
        {product.sizes && product.sizes.length > 0 && (
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Размеры: {product.sizes.join(', ')}
          </p>
        )}
        
        <p className="text-sm font-serif">
          {product.price.toLocaleString('ru-RU')} TJS
        </p>
      </div>
    </div>
  );
}
