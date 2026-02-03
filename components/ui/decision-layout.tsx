import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

// 定义单个选项的配置接口
interface DecisionOption {
  title: string;
  description?: string;
  icon: LucideIcon;
  colorClass: string;
  action: () => void;
  isRecommended?: boolean;
}

// 定义整个页面的属性接口
interface DecisionLayoutProps {
  mainTitle: string;
  subTitle?: string;
  options: [DecisionOption, DecisionOption];
  footerText?: ReactNode;
}

export const DecisionLayout: React.FC<DecisionLayoutProps> = ({ 
  mainTitle, 
  subTitle, 
  options,
  footerText 
}) => {
  return (
    <div className="flex-1 bg-zinc-900 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl text-center">
        {/* 响应式换行 */}
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-12">
          {mainTitle.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br className="block sm:hidden" />}
              {i > 0 && <span className="hidden sm:inline"> </span>}
              {line}
            </React.Fragment>
          ))}
        </h1>
        {subTitle && <p className="text-zinc-400 mb-12">{subTitle}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {options.map((opt, index) => (
            <button
              key={index}
              onClick={opt.action}
              className={`group bg-zinc-800 border-2 border-zinc-700 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all hover:scale-[1.02] text-left focus:outline-none focus:ring-4 focus:ring-${opt.colorClass}-500/20 hover:border-${opt.colorClass}-500`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl bg-${opt.colorClass}-500/10 text-${opt.colorClass}-500 group-hover:bg-${opt.colorClass}-500 group-hover:text-white transition-colors`}>
                  <opt.icon size={24} />
                </div>
                {opt.isRecommended && (
                  <span className={`text-xs font-bold text-${opt.colorClass}-500 uppercase tracking-wider`}>推荐</span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{opt.title}</h3>
              {opt.description && <p className="text-sm text-zinc-400">{opt.description}</p>}
            </button>
          ))}
        </div>
        
        {footerText && <div className="mt-10 text-zinc-500 text-sm">{footerText}</div>}
      </div>
    </div>
  );
};