"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, History, User, Settings, Info, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlavorSearchModal } from "@/components/FlavorSearchModal";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isFlavorModalOpen, setIsFlavorModalOpen] = useState(false);

  return (
    <>
    <nav
      className="w-full fixed top-0 z-50 h-[8vh] min-h-[50px]"
      style={{ backgroundColor: "rgb(24, 24, 24)" }}
    >
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span 
            className="text-amber-400"
            style={{ fontFamily: 'OrangeJuice', fontSize: '3.1rem' }}
          >
            JudgeTheBeer
          </span>
        </Link>

        {/* 右侧：风味搜索 + Dropdown */}
        <div className="flex items-center gap-3">
          {/* 风味搜索按钮 */}
          <Button
            onClick={() => setIsFlavorModalOpen(true)}
            className="text-gray-300 hover:text-amber-400 border border-neutral-600"
            style={{ backgroundColor: "rgb(31, 31, 31)" }}
          >
            🔍 风味搜索
          </Button>

          {/* Dropdown */}
          <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-105"
          >
            {open ? (
              <X className="w-5 h-5 text-amber-400" />
            ) : (
              <Menu className="w-5 h-5 text-amber-400" />
            )}
          </button>

          {open && (
            <>
              {/* 点击外部关闭 */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setOpen(false)}
              />

              {/* 下拉菜单 */}
              <div className="absolute right-0 mt-3 w-52 py-2 bg-black/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 z-50">
                {/* 登录注册按钮 */}
                <Link
                  href="/login"
                  className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-white/10 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <LogIn className="w-5 h-5 text-amber-400" /> 登录 / 注册
                </Link>
                <div className="my-2 mx-4 border-t border-white/20" />
                <Link
                  href="/history"
                  className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-white/10 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <History className="w-5 h-5 text-amber-400" /> 历史记录
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-white/10 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <User className="w-5 h-5 text-amber-400" /> 个人中心
                </Link>
                <div className="my-2 mx-4 border-t border-white/20" />
                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-white/10 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Settings className="w-5 h-5 text-amber-400" /> 设置
                </Link>
                <Link
                  href="/about"
                  className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-white/10 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Info className="w-5 h-5 text-amber-400" /> 关于
                </Link>
              </div>
            </>
          )}
          </div>
        </div>
      </div>
    </nav>

    {/* 风味搜索弹窗 */}
    <FlavorSearchModal
      isOpen={isFlavorModalOpen}
      onClose={() => setIsFlavorModalOpen(false)}
    />
    </>
  );
}