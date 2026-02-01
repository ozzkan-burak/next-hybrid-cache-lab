import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Bu endpoint ASLA cache'lenmesin (Backend tarafında)

export async function GET() {
  // 🐢 Yapay Gecikme: 2 Saniye
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 💰 Rastgele Fiyat
  const price = (Math.random() * 100 + 50).toFixed(2);

  return NextResponse.json({
    price: price,
    currency: 'USD',
    timestamp: new Date().toISOString(),
  });
}
