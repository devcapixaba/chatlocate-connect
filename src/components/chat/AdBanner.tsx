
import React from "react";

export const AdBanner = () => {
  return (
    <div className="w-full p-2 bg-yellow-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-bold text-black text-xl ml-2">XTRA</span>
          <span className="text-black ml-4">Obtém 600 perfis e muito mais</span>
        </div>
        <span className="text-white mr-2">✕</span>
      </div>
    </div>
  );
};
