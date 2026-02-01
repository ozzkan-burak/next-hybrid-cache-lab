export function CardSkeleton({ title }: { title: string }) {
  return (
    <div className="border-2 border-dashed border-gray-300 bg-gray-50 p-6 rounded-lg h-[140px] animate-pulse flex flex-col justify-center">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-2/3"></div>
      <p className="text-xs text-gray-400 mt-4 text-center">
        {title} bekleniyor...
      </p>
    </div>
  );
}
