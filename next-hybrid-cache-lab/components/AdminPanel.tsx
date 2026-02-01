'use client';

import { updateProductTitle } from '@/app/actions';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPanel() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      // 1. Server Action: Veritabanını güncelle
      await updateProductTitle(formData);

      // 2. Client Navigation: URL'i değiştirerek sayfayı "Yeni" gibi yükle.
      // Bu sayede page.tsx'teki 'key' değişecek ve Skeletonlar zorla görünecek.
      const randomID = Date.now();
      router.push(`/?v=${randomID}`);
    });
  };

  return (
    <div className="mt-8 pt-8 border-t">
      <div className="bg-gray-800 p-4 rounded text-white shadow-lg">
        <h3 className="mb-2 font-bold text-lg">
          🔧 Admin Panel (Force Navigation)
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          Butona bastığında URL değişecek (?v=...) ve Streaming tetiklenecek.
        </p>

        <form action={handleSubmit} className="flex gap-3">
          <input
            name="title"
            className="text-white bg-white px-3 py-2 rounded flex-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Yeni ürün adı girin..."
            disabled={isPending}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 px-6 py-2 rounded text-sm font-bold transition-colors disabled:cursor-not-allowed"
          >
            {isPending ? 'Yükleniyor...' : 'Güncelle & İzle'}
          </button>
        </form>
      </div>
    </div>
  );
}
