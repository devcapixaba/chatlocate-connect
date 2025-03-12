
export const AdBanner = () => {
  return (
    <div className="w-full p-4">
      <div className="relative w-full h-16 bg-[#111111] rounded overflow-hidden">
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-white text-xs">
          AD
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-black font-bold rounded px-3 py-1 text-sm">
          DOWNLOAD
        </div>
      </div>
    </div>
  );
};
