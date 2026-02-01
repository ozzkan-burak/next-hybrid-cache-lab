import { getPrice } from '@/lib/api';

// 1. "async" kelimesi ZORUNLU
export default async function Price() {
  // 2. "await" burada olmalı.
  // Next.js buraya geldiğinde duracak, Suspense devreye girip Skeleton gösterecek.
  const data = await getPrice();

  return (
    <div className="border-2 border-red-500 bg-red-50 p-6 rounded-lg shadow-sm">
      <h3 className="text-red-800 font-bold mb-2 text-sm uppercase">
        🔴 Dynamic Price
      </h3>
      <div className="text-4xl font-bold text-gray-900">${data.price}</div>
      <p className="text-sm text-gray-500 mt-1">
        Güncelleme: {new Date(data.timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
}
