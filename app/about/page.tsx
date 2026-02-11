"use client";

import { Info } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#181818]">
      <Info className="w-16 h-16 text-amber-400 mb-4" />
      <h1 
        className="text-4xl text-amber-400 mb-2"
        style={{ fontFamily: 'OrangeJuice' }}
      >
        关于
      </h1>
      <p className="text-gray-400 text-center max-w-md">
        JudgeTheBeer 是一款专业的啤酒品鉴工具，帮助你从外观、香气、味道、口感等多维度记录和评价每一杯啤酒。
      </p>
      <p className="text-gray-500 text-sm mt-4">
        版本 1.0.0
      </p>
    </div>
  );
}