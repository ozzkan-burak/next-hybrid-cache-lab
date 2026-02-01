import { getStock } from '@/lib/api';

export default async function Stock() {
  // Burası sunucuyu 3.5 saniye bloklar!
  const data = await getStock();

  return (
    <div className="border-2 border-red-500 bg-red-50 p-6 rounded-lg shadow-sm">
      <h3 className="text-red-800 font-bold mb-2 text-sm uppercase">
        Dynamic Component
      </h3>
      <div
        className={`text-2xl font-bold ${data.inStock ? 'text-green-600' : 'text-red-600'}`}
      >
        {data.inStock ? `Stokta Var (${data.stock} Adet)` : 'Tükendi'}
      </div>
      <p className="text-sm text-gray-500 mt-1">Canlı Stok Kontrolü</p>
    </div>
  );
}
