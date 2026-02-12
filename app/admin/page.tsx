"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Users, Database, Settings, UserCog } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    // 检查用户登录状态和权限
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }

    const userData = JSON.parse(stored);
    if (userData.role !== "admin") {
      router.push("/");
      return;
    }

    // 使用函数式更新避免警告
    Promise.resolve().then(() => setUser(userData));
  }, [router]);

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#181818]">
        <div className="text-gray-400">加载中...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#181818] p-8">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-10 h-10 text-amber-400" />
          <div>
            <h1 
              className="text-3xl text-amber-400"
              style={{ fontFamily: 'OrangeJuice' }}
            >
              后台管理
            </h1>
            <p className="text-gray-400">欢迎回来，{user.username}</p>
          </div>
        </div>

        {/* 功能卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-amber-400/30 transition-colors cursor-pointer">
            <UserCog className="w-8 h-8 text-amber-400 mb-3" />
            <h2 className="text-white text-lg font-semibold mb-1">管理员信息设置</h2>
            <p className="text-gray-400 text-sm">修改管理员账号和密码</p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-amber-400/30 transition-colors cursor-pointer">
            <Users className="w-8 h-8 text-amber-400 mb-3" />
            <h2 className="text-white text-lg font-semibold mb-1">用户管理</h2>
            <p className="text-gray-400 text-sm">查看和管理所有注册用户</p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-amber-400/30 transition-colors cursor-pointer">
            <Database className="w-8 h-8 text-amber-400 mb-3" />
            <h2 className="text-white text-lg font-semibold mb-1">风味数据库</h2>
            <p className="text-gray-400 text-sm">管理风味条目和分类</p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-amber-400/30 transition-colors cursor-pointer">
            <Settings className="w-8 h-8 text-amber-400 mb-3" />
            <h2 className="text-white text-lg font-semibold mb-1">系统设置</h2>
            <p className="text-gray-400 text-sm">配置网站基本设置</p>
          </div>
        </div>
      </div>
    </div>
  );
}