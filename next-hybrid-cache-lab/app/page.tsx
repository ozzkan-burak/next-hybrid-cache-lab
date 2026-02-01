import { Suspense } from 'react';
import Price from '@/components/Price';
import Stock from '@/components/Stock';
import { CardSkeleton } from '@/components/Skeletons';
import AdminPanel from '@/components/AdminPanel';
import { fakeDb } from '@/lib/db';

// Sayfanın statik değil, dinamik (Server-Side Rendered) olmasını zorunlu kılıyoruz.
export const dynamic = 'force-dynamic';

// Next.js 15 standartlarına uygun searchParams tipi
type Props = {
  searchParams: Promise<{ v?: string }>;
};

export default async function Home({ searchParams }: Props) {
  // URL'deki "v" parametresini alıyoruz (Örn: ?v=12345)
  const params = await searchParams;
  const versionKey = params.v || 'default';

  // Veritabanı simülasyonundan veriyi çek (Anlık - Senkron)
  const product = fakeDb;

  return (
    <div className="min-h-screen p-10 bg-gray-100 font-sans">
      {/* STATIC SHELL KISMI */}
      <div className="max-w-4xl mx-auto border-4 border-green-500 bg-white p-8 rounded-xl shadow-xl transition-all">
        <div className="mb-8 border-b pb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
              STATIC SHELL
            </div>
            <span className="text-xs text-gray-400">
              Sunucu Saati: {new Date().toLocaleTimeString()}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 transition-all duration-300">
            {product.title}
          </h1>
          <p className="text-gray-600 mt-2 text-lg">{product.description}</p>

          {/* Tarayıcı Buffer'ını aşmak için dolgu metni (Streaming garantisi için) */}
          <p className="text-gray-300 text-[10px] mt-4 select-none">
            System Status: Shell Loaded. Waiting for holes to stream... Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. (Bu yazı HTML
            boyutunu artırıp tarayıcının hemen render etmesini sağlar)
          </p>
        </div>

        {/* DYNAMIC HOLES KISMI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* KEY MANTIĞI: 
            URL'deki "versionKey" değiştiğinde React bu bileşeni tamamen yok eder 
            ve yerine YENİSİNİ koyar. Bu da Skeleton'un görünmesini zorunlu kılar.
          */}

          <Suspense
            key={`price-${versionKey}`}
            fallback={<CardSkeleton title="Fiyat Hesaplanıyor..." />}
          >
            <Price />
          </Suspense>

          <Suspense
            key={`stock-${versionKey}`}
            fallback={<CardSkeleton title="Stok Sorgulanıyor..." />}
          >
            <Stock />
          </Suspense>
        </div>

        {/* Navigasyon yapan Admin Paneli */}
        <AdminPanel />
      </div>
    </div>
  );
}
