"use client";
import { useEffect, useState } from "react";

export default function LoadingBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((prevWidth) => {
        if (prevWidth >= 100) {
          clearInterval(interval);
          return 100; 
        }
        return prevWidth + 10; 
      });
    }, 100); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white rounded-full h-1"> 
      <div
        className="bg-blue-500 h-full rounded-full transition-all duration-300"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}