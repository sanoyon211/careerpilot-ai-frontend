"use client";

import { useState, useEffect } from "react";
import { registerSwalConfirmHandler, SwalConfig } from "@/utils/swal";
import { AlertTriangle, Info, CheckCircle2, XCircle, HelpCircle, X } from "lucide-react";
import { Button } from "@/components/common/Button";

interface ActiveDialog extends SwalConfig {
  resolve: (value: boolean) => void;
}

export function SweetAlertProvider({ children }: { children: React.ReactNode }) {
  const [activeDialog, setActiveDialog] = useState<ActiveDialog | null>(null);

  useEffect(() => {
    registerSwalConfirmHandler((config) => {
      return new Promise<boolean>((resolve) => {
        setActiveDialog({ ...config, resolve });
      });
    });
  }, []);

  const handleConfirm = () => {
    if (activeDialog) {
      activeDialog.resolve(true);
      setActiveDialog(null);
    }
  };

  const handleCancel = () => {
    if (activeDialog) {
      activeDialog.resolve(false);
      setActiveDialog(null);
    }
  };

  const renderIcon = () => {
    switch (activeDialog?.icon) {
      case "warning":
        return (
          <div className="h-14 w-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto border border-amber-500/20">
            <AlertTriangle className="h-7 w-7" />
          </div>
        );
      case "error":
        return (
          <div className="h-14 w-14 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center mx-auto border border-red-500/20">
            <XCircle className="h-7 w-7" />
          </div>
        );
      case "success":
        return (
          <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/20">
            <CheckCircle2 className="h-7 w-7" />
          </div>
        );
      default:
        return (
          <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-500/20">
            <Info className="h-7 w-7" />
          </div>
        );
    }
  };

  return (
    <>
      {children}

      {activeDialog && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-card border rounded-xl p-6 sm:p-8 w-full max-w-md space-y-5 text-center animate-in zoom-in-95 duration-150">
            <div className="flex justify-end">
              <button onClick={handleCancel} className="p-1 text-muted-foreground hover:text-foreground rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>

            {renderIcon()}

            <div className="space-y-1.5">
              <h3 className="text-xl font-extrabold text-foreground">{activeDialog.title}</h3>
              {activeDialog.text && (
                <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                  {activeDialog.text}
                </p>
              )}
            </div>

            <div className="pt-3 flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1 rounded-2xl font-bold text-xs py-2.5"
              >
                {activeDialog.cancelButtonText || "Cancel"}
              </Button>
              <Button
                type="button"
                onClick={handleConfirm}
                className={`flex-1 rounded-2xl font-bold text-xs py-2.5 ${
                  activeDialog.icon === "warning" || activeDialog.icon === "error"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-primary hover:bg-primary/90 text-white"
                }`}
              >
                {activeDialog.confirmButtonText || "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
