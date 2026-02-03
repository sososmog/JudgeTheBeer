"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: unknown;
}) => {
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const init = () => {
    canvas = canvasRef.current;
    // if (!canvas) return;
    ctx = canvas.getContext("2d");
    // if (!ctx) return;

    // 增加额外的尺寸来补偿模糊溢出
    const blurOffset = blur * 3;
    w = ctx.canvas.width = window.innerWidth + blurOffset * 2;
    h = ctx.canvas.height = window.innerHeight + blurOffset * 2;

    ctx.filter = `blur(${blur}px)`;
    nt = 0;

    window.onresize = function () {
      // if (!ctx) return;
      w = ctx.canvas.width = window.innerWidth + blurOffset * 2;
      h = ctx.canvas.height = window.innerHeight + blurOffset * 2;
      ctx.filter = `blur(${blur}px)`;
    };
    render();
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];
  const drawWave = (n: number) => {
    // if (!ctx) return;

    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100;  // var 改成 let
        ctx.lineTo(x, y + h * 0.5);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  let animationId: number;
  const render = () => {
    // if (!ctx) return;

    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    // I'm sorry but i have got to support it on safari.
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center overflow-hidden",
        containerClassName
      )}
      // 使用黑色背景色填充blur缝隙
      style={{ backgroundColor: backgroundFill || "#181818" }}
    >
      {/* 单独包裹 canvas 的容器 */}
      <div className="absolute inset-0 overflow-hidden">
        <canvas
          ref={canvasRef}
          id="canvas"
          style={{
            position: "absolute",
            top: `-${blur * 3}px`,
            left: `-${blur * 3}px`,
            ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
          }}
        ></canvas>
      </div>

      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
