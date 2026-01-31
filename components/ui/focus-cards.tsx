"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    multiSelect,
    isSelected,
    onToggle,
  }: {
    card: CardType;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    multiSelect?: boolean;
    isSelected?: boolean;
    onToggle?: () => void;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => {
        if (multiSelect && onToggle) {
          onToggle();
        } else {
          card.onClick?.();
        }
      }}
      className={cn(
        "rounded-lg relative bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden h-60 md:h-90 w-full md:w-68 lg:w-68 transition-all duration-300 ease-out cursor-pointer",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
        hovered === index && "scale-[1.02]",
        isSelected && "ring-2 ring-amber-500"
      )}
    >
      {/* 图片（如果有） */}
      {card.src && (
        <img
          src={card.src}
          alt={card.title}
          className="object-cover absolute inset-0 w-full h-full"
        />
      )}
      
      {/* 遮罩 */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-50"
        )}
      />

      {/* 选中标记 */}
      {multiSelect && isSelected && (
        <div className="absolute top-3 right-3 bg-amber-500 rounded-full p-1">
          <Check className="w-5 h-5 text-white" />
        </div>
      )}
      
      {/* 内容 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        <div
          className={cn(
            "relative text-lg md:text-xl text-center transition-all duration-300 text-white px-6 py-4 rounded-xl",
            hovered === index ? "font-extrabold" : "font-semibold"
          )}
          style={{ 
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)"
          }}
        >
          {card.title}
        </div>
        
        {/* 箭头指示 - 单选模式 */}
        {!multiSelect && (
          <div
            className={cn(
              "mt-4 flex items-center gap-2 text-white transition-all duration-300",
              hovered === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
          >
            <span className="text-sm font-medium">选择</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}

        {/* 点击提示 - 多选模式 */}
        {multiSelect && (
          <div
            className={cn(
              "mt-4 flex items-center gap-2 transition-all duration-300",
              isSelected ? "text-amber-400" : "text-white",
              hovered === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
          >
            <span className="text-sm font-medium">{isSelected ? "已选择" : "点击选择"}</span>
          </div>
        )}
      </div>

      {/* 边框 */}
      <div
        className={cn(
          "absolute inset-0 rounded-lg border-2 transition-all duration-300",
          isSelected ? "border-amber-500" : hovered === index ? "border-amber-500/50" : "border-zinc-700/50"
        )}
      />
    </div>
  )
);

Card.displayName = "Card";

type CardType = {
  title: string;
  src?: string;
  onClick?: () => void;
};

interface FocusCardsProps {
  cards: CardType[];
  multiSelect?: boolean;
  selectedIndices?: number[];
  onSelectionChange?: (indices: number[]) => void;
  onConfirm?: () => void;
}

export function FocusCards({ 
  cards, 
  multiSelect = false,
  selectedIndices = [],
  onSelectionChange,
  onConfirm,
}: FocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    if (!onSelectionChange) return;
    
    if (selectedIndices.includes(index)) {
      onSelectionChange(selectedIndices.filter(i => i !== index));
    } else {
      onSelectionChange([...selectedIndices, index]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-6 max-w-8xl mx-auto w-full px-4">
        {cards.map((card, index) => (
          <Card
            key={card.title + index}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            multiSelect={multiSelect}
            isSelected={selectedIndices.includes(index)}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
      
      {/* 多选确认按钮 */}
      {multiSelect && (
        <button
          onClick={onConfirm}
          disabled={selectedIndices.length === 0}
          className={cn(
            "px-8 py-3 rounded-lg text-lg font-medium transition-all",
            selectedIndices.length > 0
              ? "bg-amber-500 hover:bg-amber-600 text-black cursor-pointer"
              : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
          )}
        >
          确认选择 ({selectedIndices.length})
        </button>
      )}
    </div>
  );
}