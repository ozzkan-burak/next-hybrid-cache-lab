import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // 🐢 Yapay Gecikme: 3.5 Saniye (Fiyattan daha yavaş olsun)
  await new Promise((resolve) => setTimeout(resolve, 3500));

  // 📦 Rastgele Stok Durumu
  const stock = Math.floor(Math.random() * 20);

  return NextResponse.json({
    stock: stock,
    inStock: stock > 0,
    timestamp: new Date().toISOString(),
  });
}
