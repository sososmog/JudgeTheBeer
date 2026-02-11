"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertOptions {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<AlertOptions>({
    title: "",
  });

  const showAlert = (opts: AlertOptions) => {
    setOptions(opts);
    setOpen(true);
  };

  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    options.onConfirm?.();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    options.onCancel?.();
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-zinc-800 border-zinc-700 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-lg">
              {options.title}
            </AlertDialogTitle>
            {options.description && (
              <AlertDialogDescription className="text-zinc-400">
                {options.description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            {options.showCancel && (
              <AlertDialogCancel
                onClick={handleCancel}
                className="bg-zinc-700 border-zinc-600 text-zinc-300 hover:bg-zinc-600 hover:text-white"
              >
                {options.cancelText || "取消"}
              </AlertDialogCancel>
            )}
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-amber-500 hover:bg-amber-600 text-black font-medium"
            >
              {options.confirmText || "知道了"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}