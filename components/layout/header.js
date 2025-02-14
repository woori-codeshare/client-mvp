"use client";

import { useState } from "react";
import { FaBell } from "react-icons/fa";

export default function Header() {
  // const [hasNewQuestion, setHasNewQuestion] = useState(true);

  return (
    <header className="border-b border-gray-800 p-4">
      <div className="flex justify-between items-center pl-4">
        <h1 className="text-2xl font-bold text-blue-400">CodeShare</h1>
        <div className="flex items-center gap-4">
          <button className="relative p-2">
            {/* TODO: 추후 알림 기능을 구현할 때 주석 해제 */}
            {/* <FaBell className="text-xl" /> */}
            {/* {hasNewQuestion && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )} */}
          </button>
        </div>
      </div>
    </header>
  );
}
