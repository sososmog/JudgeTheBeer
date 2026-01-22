"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FlowPlaceholder() {
  const router = useRouter();

  useEffect(() => {
    alert("TBD");
    router.back();
  }, [router]);

  return null;
}