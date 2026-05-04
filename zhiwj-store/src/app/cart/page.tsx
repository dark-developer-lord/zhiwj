"use client";

import { useCartStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">Корзина пуста</h1>
        <p className="text-gray-500 text-sm mb-8">
          Похоже, вы ещё ничего не выбрали
        </p>
        <Link 
          href="/"
          className="inline-block bg-black text-white px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl font-serif font-bold mb-12 text-center">Корзина</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={`${item._id}-${item.size}`} className="flex gap-6 pb-6 border-b border-gray-100">
              {/* Image */}
              <div className="relative w-24 h-32 bg-gray-100 flex-shrink-0">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px]">
                    Нет фото
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-500">Размер: {item.size}</p>
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-200">
                    <button
                      onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Price & Remove */}
                  <div className="text-right">
                    <p className="font-medium text-sm mb-1">
                      {(item.price * item.quantity).toLocaleString('ru-RU')} TJS
                    </p>
                    <button
                      onClick={() => removeItem(item._id, item.size)}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 ml-auto"
                    >
                      <X size={12} />
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Clear Cart */}
          <button
            onClick={clearCart}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wider"
          >
            Очистить корзину
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 sticky top-24">
            <h2 className="text-lg font-serif font-bold mb-6">Ваш заказ</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Товары ({items.reduce((acc, i) => acc + i.quantity, 0)} шт)</span>
                <span>{total().toLocaleString('ru-RU')} TJS</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Доставка</span>
                <span className="text-green-600">Бесплатно</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between font-medium">
                <span>Итого</span>
                <span>{total().toLocaleString('ru-RU')} TJS</span>
              </div>
            </div>

            {/* Checkout Button - Will be connected to Stripe */}
            <button
              onClick={() => alert('Переход к оплате... (требуется настройка Stripe)')}
              className="w-full bg-black text-white py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Оформить заказ
            </button>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-xs text-gray-500">
              <p>✓ Безопасная оплата</p>
              <p>✓ Быстрая доставка по Таджикистану</p>
              <p>✓ Возврат в течение 14 дней</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
