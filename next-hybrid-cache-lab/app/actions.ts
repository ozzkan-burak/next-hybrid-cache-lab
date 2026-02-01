'use server';

import { fakeDb } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateProductTitle(formData: FormData) {
  const newTitle = formData.get('title') as string;

  // 1. Veritabanını güncelle
  fakeDb.title = newTitle;
  fakeDb.lastUpdated = new Date().toISOString();

  // 2. 💣 CACHE BOZMA İŞLEMİ (Sihir burada!)
  // Bu komut Next.js'e der ki: "/" rotasındaki tüm statik veriyi sil ve yeniden oluştur.
  revalidatePath('/');
}
