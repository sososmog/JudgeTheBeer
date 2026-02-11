"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// Alert
import { useAlert } from "@/contexts/alert-context";


// TODO: 页面逻辑

/* 点击会返回

export default function FlowPlaceholder() {
  const router = useRouter();
  // Alert
  const { showAlert } = useAlert();

  useEffect(() => {
    showAlert({
      title: "功能开发中...",
      description: "该品类的品鉴流程正在开发中，敬请期待！",
    });
    router.back();
  }, [router]);

  return null;
}

*/


// 不返回
export default function FlowPlaceholder() {
  const { showAlert } = useAlert();

  useEffect(() => {
    showAlert({
      title: "🚧 功能开发中",
      description: "该品类的品鉴流程正在开发中，敬请期待！",
    });
  }, []);

  return null;
}