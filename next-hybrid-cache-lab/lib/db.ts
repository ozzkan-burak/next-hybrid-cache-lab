// Bu obje, uygulamamız çalışırken "Veritabanı" görevi görecek.
// Normalde burası PostgreSQL veya MongoDB olurdu.

export const fakeDb = {
  title: 'Nike Air Max 2026',
  description:
    "Bu metin build anında oluşturuldu ve cache'lendi. Değişmesi için 'Revalidate' tetiklenmeli.",
  lastUpdated: new Date().toISOString(),
};
