"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock, User, ArrowLeft, Loader2, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 注册时检查密码一致性
      if (!isLogin && formData.password !== formData.confirmPassword) {
        setError("两次输入的密码不一致");
        setLoading(false);
        return;
      }

      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error);
        setLoading(false);
        return;
      }

      // 保存用户信息到 localStorage
      localStorage.setItem("user", JSON.stringify(data.data));

      // 根据角色跳转
      if (data.data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("网络错误，请重试");
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-[#181818]">
      <div className="w-full max-w-md">
        {/* 返回首页 */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-amber-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> 返回首页
        </Link>

        {/* 标题 */}
        <h1 
          className="text-4xl text-amber-400 mb-2 text-center"
          style={{ fontFamily: 'OrangeJuice' }}
        >
          {isLogin ? "欢迎回来" : "加入我们"}
        </h1>
        <p className="text-gray-400 text-center mb-8">
          {isLogin ? "登录以记录你的品鉴之旅" : "创建账号开始你的品鉴之旅"}
        </p>

        {/* 表单 */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* 错误提示 */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl py-2 px-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* 用户名（登录和注册都需要） */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="用户名"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 transition-colors"
              />
            </div>

            {/* 注册时显示邮箱 */}
            {!isLogin && (
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="邮箱"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 transition-colors"
                />
              </div>
            )}

            {/* 密码 */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                placeholder="密码"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 transition-colors"
              />
            </div>

            {/* 注册时确认密码 */}
            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  placeholder="确认密码"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 transition-colors"
                />
              </div>
            )}

            {/* 登录时显示忘记密码 */}
            {isLogin && (
              <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">
                  忘记密码？
                </Link>
              </div>
            )}

            {/* 提交按钮 */}
            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-xl mt-2 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                isLogin ? "登录" : "注册"
              )}
            </Button>
          </form>

          {/* 切换登录/注册 */}
          <div className="mt-6 text-center text-gray-400">
            {isLogin ? "还没有账号？" : "已有账号？"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-amber-400 hover:text-amber-300 ml-1 transition-colors"
            >
              {isLogin ? "立即注册" : "立即登录"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}