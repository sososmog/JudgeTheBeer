"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

/**
 * 类型定义
 */
interface RatingOption {
  id: string;
  label: string;
  sublabel?: string;
  score: number;
  icon?: React.ReactNode;
}

interface RatingStepData {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  options: RatingOption[];
}

interface SingleRatingProps {
  data: RatingStepData;
  onConfirm: (score: number, optionId: string, optionLabel: string) => void;
  onBack?: () => void;
  showBack?: boolean;
  currentTotalScore: number;
  initialSelectedId?: string | null;
}

interface RatingStepProps {
  data: RatingStepData;
  onConfirm: (score: number, optionId: string) => void;
  onBack?: () => void;
  showBack?: boolean;
  currentTotalScore: number;
  stepIndex: number;
  totalSteps: number;
  selectedOptionId?: string | null;
}

interface MultiStepRatingProps {
  steps: RatingStepData[];
  initialScore?: number;
  onComplete: (finalScore: number, selections: Record<string, string>) => void;
  onBack?: () => void;
  showBack?: boolean;
  initialSelections?: Record<string, string>;
}

/**
 * 核心：动态数字滚动组件
 */
const ScoreCounter = ({ value, baseScore }: { value?: number; baseScore: number }) => {
  const nodeRef = React.useRef<HTMLSpanElement>(null);
  const displayValue = baseScore + (value || 0);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(parseFloat(node.textContent || '0') || baseScore, displayValue, {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) { if (node) node.textContent = v.toFixed(1); }
    });
    return () => controls.stop();
  }, [displayValue, baseScore]);

  return <span ref={nodeRef}>{baseScore.toFixed(1)}</span>;
};

/**
 * 单步评分组件 - 可独立使用
 */
export const SingleRating: React.FC<SingleRatingProps> = ({ 
  data, 
  onConfirm,
  onBack,
  showBack = false,
  currentTotalScore,
  initialSelectedId
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId || null);
  const selectedOption = data.options.find(o => o.id === selectedId);
  const maxScale = 5.0;
  const circumference = 490;
  const delta = selectedOption?.score || 0;
  const targetOffset = circumference - (circumference * ((currentTotalScore + delta) / maxScale));

  const handleConfirm = () => {
    if (selectedId && selectedOption) {
      onConfirm(selectedOption.score, selectedId, selectedOption.label);
    }
  };

  return (
    <div className="flex-1 bg-[#080705] text-amber-50/90 flex flex-col items-center justify-center p-4 sm:p-6 overflow-x-hidden relative min-h-screen">
      {/* 对称式背景光晕设计 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[50%] bg-amber-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-[-15%] right-[-10%] w-[60%] h-[50%] bg-amber-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-15%] left-[-5%] w-[50%] h-[50%] bg-orange-900/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] bg-orange-900/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        key={data.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="relative z-10 w-full max-w-lg mx-auto"
      >
        {/* 1. 仪表盘区域 */}
        <div className="relative flex flex-col items-center mb-12 md:mb-20">
          <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
            
            {/* 分值变动气泡 */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none z-30">
              <AnimatePresence mode="wait">
                {selectedId && delta !== 0 && (
                  <motion.div
                    key={selectedId}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`font-mono text-xs font-bold px-4 py-1.5 rounded-full border backdrop-blur-xl shadow-lg ${
                      delta > 0 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    }`}
                  >
                    {delta > 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 176 176">
              <defs>
                <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#92400e" />
                </linearGradient>
              </defs>
              <circle cx="88" cy="88" r="78" stroke="rgba(255,255,255,0.03)" strokeWidth="4" fill="transparent" />
              <motion.circle 
                cx="88" cy="88" r="78" 
                stroke="url(#amberGrad)" 
                strokeWidth="5" 
                fill="transparent"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset: targetOffset }}
                transform="rotate(-90 88 88)"
                strokeLinecap="round"
                transition={{ type: "spring", stiffness: 45, damping: 15 }}
              />
            </svg>

            <div className="flex flex-col items-center justify-center pt-2">
              <div className="text-5xl md:text-6xl font-extralight tracking-tighter text-white">
                <ScoreCounter value={delta} baseScore={currentTotalScore} />
              </div>
              <div className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-amber-500/50 font-bold mt-4 text-center pl-[0.25em]">
                Score
              </div>
            </div>
          </div>
        </div>

        {/* 2. 标题与描述 */}
        <div className="text-center mb-10 px-4">
          <h1 className="text-3xl md:text-4xl font-light text-white mb-3">
            {data.title}
            {data.subtitle && (
              <>
                <span className="opacity-10 font-extralight italic mx-3 text-2xl md:text-3xl">/</span>
                <span className="text-amber-500/40 font-extralight italic text-xl md:text-2xl tracking-widest">{data.subtitle}</span>
              </>
            )}
          </h1>
          {data.description && (
            <p className="text-slate-500 text-sm font-light max-w-xs mx-auto leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        {/* 3. 选项列表 */}
        <div className="space-y-3 mb-12">
          {data.options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedId(option.id)}
              className={`relative w-full group transition-all duration-500 rounded-2xl border ${
                selectedId === option.id 
                ? 'border-amber-500/50 bg-amber-500/10 shadow-[0_0_40px_rgba(245,158,11,0.1)]' 
                : 'border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04]'
              }`}
            >
              <div className="relative z-10 flex items-center justify-between p-5 text-left">
                <div className="flex items-center gap-5">
                  {option.icon && (
                    <div className={`p-4 rounded-xl transition-all duration-700 ${
                      selectedId === option.id ? 'bg-amber-500 text-black' : 'bg-white/5 text-amber-500/30'
                    }`}>
                      {option.icon}
                    </div>
                  )}
                  <div>
                    <div className={`text-lg transition-colors ${selectedId === option.id ? 'text-white font-medium' : 'text-slate-400'}`}>
                      {option.label}
                    </div>
                    {option.sublabel && (
                      <div className="text-xs text-slate-600 font-light mt-1 tracking-wide">{option.sublabel}</div>
                    )}
                  </div>
                </div>
                <div className={`font-semibold text-sm tabular-nums ${
                  selectedId === option.id 
                    ? (option.score > 0 ? 'text-emerald-400' : option.score < 0 ? 'text-rose-400' : 'text-amber-400') 
                    : 'text-slate-600'
                }`}>
                  {option.score > 0 ? `+${option.score.toFixed(1)}` : option.score.toFixed(1)}
                </div>
              </div>
              {selectedId === option.id && (
                <motion.div layoutId="singleActiveGlow" className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/5 via-transparent to-transparent z-0" />
              )}
            </button>
          ))}
        </div>

        {/* 4. 提交按钮 */}
        <div className="px-1 mb-6">
          <button
            onClick={handleConfirm}
            disabled={!selectedId}
            className={`group relative w-full py-6 rounded-2xl transition-all duration-700 flex items-center justify-center gap-4 font-bold tracking-[0.4em] uppercase text-lg
              ${selectedId 
                ? 'text-black cursor-pointer bg-amber-500 shadow-[0_20px_60px_rgba(245,158,11,0.3)]' 
                : 'text-amber-500/20 cursor-not-allowed bg-white/[0.03] border border-white/5'}
            `}
          >
            <span className="relative z-10">确认</span>
            <ChevronRight className={`relative z-10 w-5 h-5 transition-transform duration-500 ${selectedId ? 'group-hover:translate-x-2' : ''}`} />
          </button>
        </div>

        {/* 5. 上一步按钮 */}
        {showBack && onBack && (
          <div className="px-1 pb-10">
            <button
              onClick={onBack}
              className="w-full py-4 rounded-2xl font-bold tracking-[0.2em] uppercase text-xs border border-white/10 text-slate-500 hover:text-amber-500 hover:border-amber-500/30 transition-all"
            >
              ← 上一步
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

/**
 * 多步骤中的单步组件 - 供 MultiStepRating 使用
 */
const RatingStep: React.FC<RatingStepProps> = ({ 
  data, 
  onConfirm,
  onBack,
  showBack = false,
  currentTotalScore, 
  stepIndex, 
  totalSteps,
  selectedOptionId: initialSelectedId
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId || null);
  const selectedOption = data.options.find(o => o.id === selectedId);
  const maxScale = 5.0;
  const circumference = 490;
  const delta = selectedOption?.score || 0;
  const targetOffset = circumference - (circumference * ((currentTotalScore + delta) / maxScale));

  const handleConfirm = () => {
    if (selectedId && selectedOption) {
      onConfirm(selectedOption.score, selectedId);
    }
  };

  return (
    <motion.div 
      key={data.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="relative z-10 w-full max-w-lg mx-auto"
    >
      {/* 1. 仪表盘区域 */}
      <div className="relative flex flex-col items-center mb-12 md:mb-20">
        <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
          
          {/* 分值变动气泡 */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none z-30">
            <AnimatePresence mode="wait">
              {selectedId && delta !== 0 && (
                <motion.div
                  key={selectedId}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`font-mono text-xs font-bold px-4 py-1.5 rounded-full border backdrop-blur-xl shadow-lg ${
                    delta > 0 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  }`}
                >
                  {delta > 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 176 176">
            <defs>
              <linearGradient id="amberGradStep" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#92400e" />
              </linearGradient>
            </defs>
            <circle cx="88" cy="88" r="78" stroke="rgba(255,255,255,0.03)" strokeWidth="4" fill="transparent" />
            <motion.circle 
              cx="88" cy="88" r="78" 
              stroke="url(#amberGradStep)" 
              strokeWidth="5" 
              fill="transparent"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset: targetOffset }}
              transform="rotate(-90 88 88)"
              strokeLinecap="round"
              transition={{ type: "spring", stiffness: 45, damping: 15 }}
            />
          </svg>

          <div className="flex flex-col items-center justify-center pt-2">
            <div className="text-6xl md:text-7xl font-extralight tracking-tighter text-white">
              <ScoreCounter value={delta} baseScore={currentTotalScore} />
            </div>
            <div className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] text-amber-500/50 font-bold mt-4">
              Step {stepIndex + 1} / {totalSteps}
            </div>
          </div>
        </div>
      </div>

      {/* 2. 标题与描述 */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-3xl md:text-4xl font-light text-white mb-3">
          {data.title}
          {data.subtitle && (
            <>
              <span className="opacity-10 font-extralight italic mx-3 text-2xl md:text-3xl">/</span>
              <span className="text-amber-500/40 font-extralight italic text-xl md:text-2xl tracking-widest">{data.subtitle}</span>
            </>
          )}
        </h1>
        {data.description && (
          <p className="text-slate-500 text-sm font-light max-w-xs mx-auto leading-relaxed">
            {data.description}
          </p>
        )}
      </div>

      {/* 3. 选项列表 */}
      <div className="space-y-3 mb-12">
        {data.options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedId(option.id)}
            className={`relative w-full group transition-all duration-500 rounded-2xl border ${
              selectedId === option.id 
              ? 'border-amber-500/50 bg-amber-500/10 shadow-[0_0_40px_rgba(245,158,11,0.1)]' 
              : 'border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04]'
            }`}
          >
            <div className="relative z-10 flex items-center justify-between p-5 text-left">
              <div className="flex items-center gap-5">
                {option.icon && (
                  <div className={`p-4 rounded-xl transition-all duration-700 ${
                    selectedId === option.id ? 'bg-amber-500 text-black' : 'bg-white/5 text-amber-500/30'
                  }`}>
                    {option.icon}
                  </div>
                )}
                <div>
                  <div className={`text-lg transition-colors ${selectedId === option.id ? 'text-white font-medium' : 'text-slate-400'}`}>
                    {option.label}
                  </div>
                  {option.sublabel && (
                    <div className="text-xs text-slate-600 font-light mt-1 tracking-wide">{option.sublabel}</div>
                  )}
                </div>
              </div>
              <div className={`font-mono text-sm tracking-tighter ${
                selectedId === option.id 
                  ? (option.score > 0 ? 'text-emerald-400' : option.score < 0 ? 'text-rose-400' : 'text-amber-400') 
                  : 'text-slate-700'
              }`}>
                {option.score > 0 ? `+${option.score.toFixed(1)}` : option.score.toFixed(1)}
              </div>
            </div>
            {selectedId === option.id && (
              <motion.div layoutId="stepActiveGlow" className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/5 via-transparent to-transparent z-0" />
            )}
          </button>
        ))}
      </div>

      {/* 4. 提交按钮 */}
      <div className="px-1 mb-6">
        <button
          onClick={handleConfirm}
          disabled={!selectedId}
          className={`group relative w-full py-6 rounded-2xl transition-all duration-700 flex items-center justify-center gap-4 font-bold tracking-[0.4em] uppercase text-sm
            ${selectedId 
              ? 'text-black cursor-pointer bg-amber-500 shadow-[0_20px_60px_rgba(245,158,11,0.3)]' 
              : 'text-amber-500/20 cursor-not-allowed bg-white/[0.03] border border-white/5'}
          `}
        >
          <span className="relative z-10">{stepIndex === totalSteps - 1 ? '完成评价 / Finish' : '下一步 / Next Step'}</span>
          <ChevronRight className={`relative z-10 w-5 h-5 transition-transform duration-500 ${selectedId ? 'group-hover:translate-x-2' : ''}`} />
        </button>
      </div>

      {/* 5. 上一步按钮 */}
      {showBack && onBack && (
        <div className="px-1 pb-10">
          <button
            onClick={onBack}
            className="w-full py-4 rounded-2xl font-bold tracking-[0.2em] uppercase text-xs border border-white/10 text-slate-500 hover:text-amber-500 hover:border-amber-500/30 transition-all"
          >
            ← Back
          </button>
        </div>
      )}
    </motion.div>
  );
};

/**
 * 多步骤打分组件
 */
export const MultiStepRating: React.FC<MultiStepRatingProps> = ({
  steps,
  initialScore = 3.5,
  onComplete,
  onBack,
  showBack = true,
  initialSelections = {}
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalScore, setTotalScore] = useState(initialScore);
  const [selections, setSelections] = useState<Record<string, string>>(initialSelections);

  // 安全检查：如果 steps 不存在或为空，返回 null 以防止崩溃
  if (!steps || steps.length === 0) return null;

  const handleStepConfirm = (scoreChange: number, optionId: string) => {
    const newScore = Math.min(5, Math.max(0, totalScore + scoreChange));
    setTotalScore(newScore);
    setSelections(prev => ({ ...prev, [steps[currentStep].id]: optionId }));

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(newScore, { ...selections, [steps[currentStep].id]: optionId });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStepId = steps[currentStep - 1].id;
      const prevOption = steps[currentStep - 1].options.find(o => o.id === selections[prevStepId]);
      if (prevOption) {
        setTotalScore(prev => Math.max(0, prev - prevOption.score));
      }
      setCurrentStep(prev => prev - 1);
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <div className="flex-1 bg-[#080705] text-amber-50/90 flex flex-col items-center justify-center p-4 sm:p-6 overflow-x-hidden min-h-screen relative">
      {/* 对称式背景光晕设计 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[50%] bg-amber-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-[-15%] right-[-10%] w-[60%] h-[50%] bg-amber-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-15%] left-[-5%] w-[50%] h-[50%] bg-orange-900/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] bg-orange-900/5 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        <RatingStep 
          key={steps[currentStep].id}
          data={steps[currentStep]}
          stepIndex={currentStep}
          totalSteps={steps.length}
          currentTotalScore={totalScore}
          onConfirm={handleStepConfirm}
          onBack={handleBack}
          showBack={showBack && (currentStep > 0 || !!onBack)}
          selectedOptionId={selections[steps[currentStep].id]}
        />
      </AnimatePresence>
    </div>
  );
};

export default MultiStepRating;




// 修改分数显示为两位小数
// onUpdate(v) { if (node) node.textContent = v.toFixed(2); }
// return <span ref={nodeRef}>{baseScore.toFixed(2)}</span>;
// {selectedOption.score > 0 ? `+${selectedOption.score.toFixed(2)}` : selectedOption.score.toFixed(2)}
// {option.score > 0 ? `+${option.score.toFixed(2)}` : option.score.toFixed(2)}