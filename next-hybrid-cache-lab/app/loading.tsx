export default function Loading() {
  return (
    <div className="min-h-screen p-10 bg-gray-50 flex flex-col items-center justify-center">
      {/* Yeşil Dönen Çember */}
      <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>

      <h2 className="text-2xl font-bold text-gray-800">Shell Yükleniyor...</h2>
      <p className="text-gray-500 mt-2">Static Shell cache'den getiriliyor.</p>

      {/* Tarayıcı buffer'ını doldurmak için gizli veri */}
      <div className="hidden">
        {Array.from({ length: 1000 }).map((_, i) => (
          <span key={i}>Buffering... </span>
        ))}
      </div>
    </div>
  );
}
