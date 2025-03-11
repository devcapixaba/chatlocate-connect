
import React from "react";

interface ProfileInfoProps {
  name: string;
  isOnline: boolean;
  lastOnline?: string;
  distance?: number;
  status?: string;
}

export const ProfileInfo = ({ name, isOnline, lastOnline, distance, status }: ProfileInfoProps) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <h3 className="text-white text-xl font-bold">{name}</h3>
        {isOnline && (
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        )}
      </div>
      
      <div className="flex items-center space-x-2 text-gray-400">
        {distance !== undefined && (
          <>
            <span>{distance}km</span>
            <span>•</span>
          </>
        )}
        <span>{isOnline ? 'Online agora' : `Online ${lastOnline}`}</span>
      </div>
      
      {status && <div className="text-white">{status}</div>}
    </>
  );
};
