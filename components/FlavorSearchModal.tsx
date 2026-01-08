"use client";

import { useFlavorSearch, Flavor } from "@/hooks/useFlavorSearch";

interface FlavorSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FlavorSearchModal({ isOpen, onClose }: FlavorSearchModalProps) {
  const {
    query,
    setQuery,
    type,
    setType,
    results,
    loading,
    error,
    reset,
  } = useFlavorSearch();

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 遮罩 */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* 弹窗 */}
      <div className="relative w-full max-w-lg max-h-[80vh] bg-neutral-900 rounded-xl border border-neutral-700 overflow-hidden flex flex-col">
        {/* 头部 */}
        <div className="p-4 border-b border-neutral-700 flex items-center justify-between">
          <h2 className="text-lg font-bold text-amber-400">风味词典</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* 搜索区域 */}
        <div className="p-4 border-b border-neutral-700 space-y-3">
          {/* 搜索框 */}
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索风味名称..."
              autoFocus
              className="w-full p-3 pl-10 border border-neutral-600 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {loading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* 类型筛选 */}
          <div className="flex gap-2">
            <button
              onClick={() => setType("")}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                type === ""
                  ? "bg-amber-600 text-white"
                  : "bg-neutral-700 text-gray-300 hover:bg-neutral-600"
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setType("good")}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                type === "good"
                  ? "bg-green-600 text-white"
                  : "bg-neutral-700 text-gray-300 hover:bg-neutral-600"
              }`}
            >
              😊 好的风味
            </button>
            <button
              onClick={() => setType("bad")}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                type === "bad"
                  ? "bg-red-600 text-white"
                  : "bg-neutral-700 text-gray-300 hover:bg-neutral-600"
              }`}
            >
              😕 异味
            </button>
          </div>
        </div>

        {/* 结果列表 */}
        <div className="flex-1 overflow-y-auto p-4">
          {error ? (
            <div className="text-center py-8 text-red-400">{error}</div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              {query ? "没有找到匹配的风味" : "输入关键词开始搜索"}
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-400 mb-3">
                找到 {results.length} 个结果
              </p>
              {results.map((flavor) => (
                <FlavorItem key={flavor.id} flavor={flavor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 单个风味项
function FlavorItem({ flavor }: { flavor: Flavor }) {
  const isGood = flavor.type === "good";

  return (
    <div className="p-3 rounded-lg bg-neutral-800 hover:bg-neutral-750 transition-all">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-white">{flavor.name}</span>
            {flavor.nameEn && (
              <span className="text-gray-500 text-sm">({flavor.nameEn})</span>
            )}
          </div>
          {flavor.description && (
            <p className="text-sm text-gray-400 mt-1">{flavor.description}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`text-xs px-2 py-0.5 rounded ${
              isGood
                ? "bg-green-900/30 text-green-400"
                : "bg-red-900/30 text-red-400"
            }`}
          >
            {flavor.category}
          </span>
          {flavor.subCategory && (
            <span className="text-xs text-gray-500">{flavor.subCategory}</span>
          )}
        </div>
      </div>
    </div>
  );
}