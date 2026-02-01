// src/lib/api.ts

// Artık fetch yok, doğrudan Promise gecikmesi var.
// Bu yöntem Next.js'in "Streaming" mekanizmasını garanti altına alır.

export async function getPrice() {
  // 2 Saniye Bekle (Yapay Gecikme)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    price: (Math.random() * 100 + 50).toFixed(2),
    timestamp: new Date().toISOString(),
  };
}

export async function getStock() {
  // 3.5 Saniye Bekle
  await new Promise((resolve) => setTimeout(resolve, 3500));

  return {
    stock: Math.floor(Math.random() * 20),
    inStock: Math.random() > 0.5,
    timestamp: new Date().toISOString(),
  };
}
