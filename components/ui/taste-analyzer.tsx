"use client";

import React, { useState, useMemo } from 'react';
import { Info, CheckCircle2, RotateCcw, Fingerprint } from 'lucide-react';

/** ---------------- 类型定义 ---------------- **/

interface SubOption {
  id: string;
  label: string;
}

interface TasteZone {
  id: string;
  label: string;
  taste: string;
  description: string;
  color: string;
  path: string;
  subOptions: SubOption[];
}

interface TasteMapProps {
  zones: TasteZone[];
  selections: Record<string, string>;
  onToggle: (zoneId: string, optionId: string) => void;
  hoveredZone: TasteZone | null;
  onHover: (zone: TasteZone | null) => void;
}

interface TasteZoneCardProps {
  zone: TasteZone;
  selectedOptionId: string | undefined;
  onOptionSelect: (zoneId: string, optionId: string) => void;
  onHover: (zone: TasteZone | null) => void;
  isAnyFirstSelected: boolean;
}

interface TasteAnalyzerProps {
  onSubmit: (selections: Record<string, string>) => void;
  onBack?: () => void;
  showBack?: boolean;
  initialSelections?: Record<string, string>;
}

/** ---------------- 常量数据 ---------------- **/

const TASTE_ZONES: TasteZone[] = [
  {
    id: 'back',
    label: '舌根',
    taste: '苦味',
    description: '感知苦味物质，在大部分IPA中非常明显。',
    color: 'fill-emerald-400',
    path: 'M 75,70 C 100,45 200,45 225,70 L 235,140 C 150,155 65,140 65,140 Z',
    subOptions: [
      { id: 'bitter-first', label: '苦感先出' },
      { id: 'bitter-yes', label: '有苦感' },
      { id: 'bitter-no', label: '无苦感' },
    ]
  },
  {
    id: 'sides-back',
    label: '舌后侧',
    taste: '酸味',
    description: '舌后侧对氢离子浓度敏感，但在IPA中通常需要仔细感受。',
    color: 'fill-amber-400',
    path: 'M 65,140 C 55,180 60,220 75,250 L 115,240 C 100,200 100,160 110,140 Z M 235,140 C 245,180 240,220 225,250 L 185,240 C 200,200 200,160 190,140 Z',
    subOptions: [
      { id: 'sour-first', label: '酸感先出' },
      { id: 'sour-yes', label: '有酸感' },
      { id: 'sour-no', label: '无酸感' },
    ]
  },
  {
    id: 'tip',
    label: '舌尖',
    taste: '甜味',
    description: '感知糖分与碳水化合物，通常来源于麦芽或酵母。',
    color: 'fill-rose-400',
    path: 'M 115,310 C 130,345 150,360 150,360 C 150,360 170,345 185,310 C 165,325 135,325 115,310 Z',
    subOptions: [
      { id: 'sweet-first', label: '甜感先出' },
      { id: 'sweet-yes', label: '有甜感' },
      { id: 'sweet-no', label: '无甜感' },
    ]
  }
];

/** ---------------- 子组件 ---------------- **/

const TasteMap: React.FC<TasteMapProps> = ({ zones, selections, onToggle, hoveredZone, onHover }) => (
  <div className="relative w-full max-w-[340px] flex flex-col items-center">
    {/* 顶部标识：舌根 */}
    <div className="mb-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] flex items-center gap-2">
      <div className="w-6 md:w-8 h-[1px] bg-slate-800"></div>
      舌根
      <div className="w-6 md:w-8 h-[1px] bg-slate-800"></div>
    </div>

    <div className="relative w-full aspect-[3/4]">
      <svg viewBox="0 0 300 400" className="w-full h-full filter drop-shadow-[0_0_30px_rgba(185,28,28,0.25)]">
        <path 
          d="M 150,30 C 70,30 55,180 55,250 C 55,340 130,375 150,375 C 170,375 245,340 245,250 C 245,180 230,30 150,30 Z" 
          fill="#7f1d1d" 
          className="transition-all duration-700"
        />
        <path 
          d="M 150,35 C 75,35 60,180 60,250 C 60,335 135,370 150,370 C 165,370 240,335 240,250 C 240,180 225,35 150,35 Z" 
          fill="#991b1b" 
          stroke="#b91c1c" 
          strokeWidth="2"
        />
        <path 
          d="M 150,60 C 150,60 145,200 150,320" 
          stroke="#7f1d1d" 
          strokeWidth="2" 
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        {zones.map((zone) => {
          const isSelected = !!selections[zone.id] && !selections[zone.id]?.endsWith('-no');
          return (
            <path
              key={zone.id}
              d={zone.path}
              className={`cursor-pointer transition-all duration-300 ease-out stroke-white/5 stroke-1
                ${isSelected 
                  ? `${zone.color} opacity-90 brightness-110 shadow-lg` 
                  : 'fill-black/20 hover:fill-amber-400/60 opacity-40'}
              `}
              onClick={() => {
                const defaultOption = zone.subOptions[1].id;
                onToggle(zone.id, selections[zone.id] ? "" : defaultOption);
              }}
              onMouseEnter={() => onHover(zone)}
              onMouseLeave={() => onHover(null)}
            />
          );
        })}
        <g opacity="0.2" pointerEvents="none">
          {[
            {x: 150, y: 100, r: 2}, {x: 120, y: 80, r: 1.5}, {x: 180, y: 80, r: 1.5},
            {x: 90, y: 150, r: 1.2}, {x: 210, y: 150, r: 1.2}, {x: 150, y: 200, r: 1.5}
          ].map((dot, i) => (
            <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} fill="#fecaca" />
          ))}
        </g>
      </svg>

      {hoveredZone && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#1a1a1a]/95 backdrop-blur-xl border border-amber-500/30 px-5 py-2.5 rounded-2xl shadow-[0_0_30px_rgba(251,191,36,0.15)] animate-in fade-in zoom-in-95 duration-200 z-10">
          <p className="text-[10px] font-black text-amber-500 tracking-[0.2em] uppercase mb-0.5 whitespace-nowrap">检测区域</p>
          <p className="text-sm font-bold text-white whitespace-nowrap">
            {hoveredZone.label} — <span className={hoveredZone.color.replace('fill-', 'text-')}>{hoveredZone.taste}</span>
          </p>
        </div>
      )}
    </div>

    {/* 底部标识：舌尖 */}
    <div className="mt-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] flex items-center gap-2">
      <div className="w-6 md:w-8 h-[1px] bg-slate-800"></div>
      舌尖
      <div className="w-6 md:w-8 h-[1px] bg-slate-800"></div>
    </div>
  </div>
);

const TasteZoneCard: React.FC<TasteZoneCardProps> = ({ zone, selectedOptionId, onOptionSelect, onHover, isAnyFirstSelected }) => {
  const isSelected = !!selectedOptionId;

  return (
    <div 
      onMouseEnter={() => onHover(zone)}
      onMouseLeave={() => onHover(null)}
      className={`group p-4 md:p-5 rounded-2xl border transition-all duration-500 flex flex-col gap-4
        ${isSelected 
          ? 'border-amber-500/40 bg-amber-500/10 shadow-[0_0_20px_rgba(251,191,36,0.08)]' 
          : 'border-white/5 hover:border-white/10 bg-transparent'}
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500
          ${isSelected ? zone.color.replace('fill-', 'bg-') : 'bg-white/5 text-slate-600 group-hover:text-slate-400'}
        `}>
          <Fingerprint size={18} className={isSelected ? 'text-white' : ''} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={`font-bold text-sm md:text-base transition-colors ${isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
              {zone.label} <span className="text-[10px] md:text-xs font-normal opacity-50 ml-1">({zone.taste})</span>
            </h3>
            {isSelected && !selectedOptionId?.endsWith('-no') && <CheckCircle2 size={16} className="text-amber-500 animate-in zoom-in" />}
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5 font-medium leading-relaxed line-clamp-1">{zone.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {zone.subOptions.map((option) => {
          const isFirstOption = option.id.endsWith('-first');
          const isDisabled = isFirstOption && isAnyFirstSelected && selectedOptionId !== option.id;

          return (
            <button
              key={option.id}
              disabled={isDisabled}
              onClick={(e) => {
                e.stopPropagation();
                onOptionSelect(zone.id, option.id);
              }}
              className={`py-2 px-1 rounded-lg text-[10px] font-bold transition-all border
                ${selectedOptionId === option.id 
                  ? 'bg-amber-500 border-amber-400 text-[#1f1f1f] shadow-inner shadow-black/10' 
                  : isDisabled
                    ? 'bg-white/5 border-transparent text-slate-700 cursor-not-allowed opacity-30'
                    : 'bg-white/5 border-transparent text-slate-500 hover:border-white/10 hover:text-slate-300'}
              `}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/** ---------------- 主导出组件 ---------------- **/

export const TasteAnalyzer: React.FC<TasteAnalyzerProps> = ({ onSubmit, onBack, showBack = true, initialSelections = {} }) => {
  const [selections, setSelections] = useState<Record<string, string>>(initialSelections);
  const [hoveredZone, setHoveredZone] = useState<TasteZone | null>(null);

  const isAnyFirstSelected = useMemo(() => {
    return Object.values(selections).some(optionId => optionId?.endsWith('-first'));
  }, [selections]);

  const firstTasteName = useMemo(() => {
    const zoneIdWithFirst = Object.keys(selections).find(id => selections[id]?.endsWith('-first'));
    if (!zoneIdWithFirst) return null;
    return TASTE_ZONES.find(z => z.id === zoneIdWithFirst)?.taste;
  }, [selections]);

  const handleSelect = (zoneId: string, optionId: string) => {
    setSelections(prev => {
      const next = { ...prev };
      if (prev[zoneId] === optionId) {
        delete next[zoneId];
      } else {
        next[zoneId] = optionId;
      }
      return next;
    });
  };

  const selectedCount = useMemo(() => 
    Object.values(selections).filter(id => id && !id.endsWith('-no')).length, 
  [selections]);

  const handleSubmit = () => {
    onSubmit(selections);
  };

  return (
    <div className="flex-1 bg-zinc-900 p-4 md:p-8 font-sans text-slate-200 flex flex-col items-center justify-center gap-6">
      <div className="max-w-5xl w-full bg-[#262626] rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden flex flex-col md:flex-row">
        
        {/* 左侧区域：交互模型 */}
        <div className="flex-[1.2] p-6 md:p-8 bg-gradient-to-b from-[#2a2a2a] to-[#1f1f1f] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
          <header className="text-center mb-6 md:mb-10">
            <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent italic tracking-tighter">
              再喝一口，你尝到了什么？
            </h1>
            <p className="text-slate-500 text-[9px] md:text-[10px] mt-2 tracking-[0.3em] uppercase opacity-70">感受你的舌面</p>
          </header>

          <TasteMap 
            zones={TASTE_ZONES}
            selections={selections}
            onToggle={handleSelect}
            hoveredZone={hoveredZone}
            onHover={setHoveredZone}
          />

          <button 
            onClick={() => setSelections({})}
            className="mt-6 md:mt-10 flex items-center gap-2 text-slate-500 hover:text-amber-500 transition-all text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] group"
          >
            <RotateCcw size={14} className="group-hover:rotate-[-180deg] transition-transform duration-700" />
            重置味觉选择
          </button>
        </div>

        {/* 右侧区域：列表与提交 */}
        <div className="flex-1 p-6 md:p-8 lg:p-12 bg-[#232323]/50">
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">在不同区域进行感受</h2>
              <p className="text-slate-500 text-[10px] md:text-xs mt-1 font-medium">让酒体流过舌面</p>
            </div>
            <div className="text-right">
              <span className="block text-3xl md:text-4xl font-black text-amber-500 leading-none">{selectedCount}</span>
              <span className="text-[8px] md:text-[9px] text-slate-500 uppercase font-black tracking-widest whitespace-nowrap">选择数量</span>
            </div>
          </div>

          <div className="space-y-4 mb-8 md:mb-10">
            {TASTE_ZONES.map((zone) => (
              <TasteZoneCard 
                key={zone.id}
                zone={zone}
                selectedOptionId={selections[zone.id]}
                onOptionSelect={handleSelect}
                onHover={setHoveredZone}
                isAnyFirstSelected={isAnyFirstSelected}
              />
            ))}
          </div>

          <footer className="space-y-6 md:space-y-8">
            {firstTasteName && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-[10px] text-amber-500 flex items-center gap-2 font-bold tracking-wider">
                  <Info size={12} className="shrink-0" />
                  您先尝到了{firstTasteName}。
                </p>
              </div>
            )}
            
            <button 
              onClick={handleSubmit}
              disabled={Object.keys(selections).length === 0}
              className={`w-full py-4 md:py-5 rounded-2xl font-black text-md uppercase tracking-[0.25em] transition-all transform active:scale-[0.97]
                ${Object.keys(selections).length > 0 
                  ? 'bg-amber-500 text-[#1f1f1f] hover:bg-amber-400 shadow-[0_10px_40px_-10px_rgba(245,158,11,0.4)]' 
                  : 'bg-[#1a1a1a] text-slate-600 cursor-not-allowed'}
              `}
            >
              确认选择
            </button>
          </footer>
        </div>

      </div>

      {/* 上一步按钮 - 组件底部 */}
      {showBack && onBack && (
        <button 
          onClick={onBack}
          className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.25em] transition-all transform active:scale-[0.97] border border-white/20 text-slate-400 hover:text-white hover:border-white/40"
        >
          ← 上一步
        </button>
      )}
    </div>
  );
};

export default TasteAnalyzer;