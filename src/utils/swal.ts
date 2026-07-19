"use client";

import { toast } from "sonner";

export interface SwalConfig {
  title: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  icon?: "warning" | "error" | "success" | "info" | "question";
}

let confirmHandler: ((config: SwalConfig) => Promise<boolean>) | null = null;

export const registerSwalConfirmHandler = (handler: (config: SwalConfig) => Promise<boolean>) => {
  confirmHandler = handler;
};

export const SwalConfirm = async (
  title: string = "Are you sure?",
  text: string = "You won't be able to revert this!",
  confirmButtonText: string = "Yes, delete it!",
  icon: "warning" | "error" | "success" | "info" | "question" = "warning"
): Promise<boolean> => {
  if (confirmHandler) {
    return confirmHandler({ title, text, confirmButtonText, icon });
  }

  // Sonner fallback if modal handler not mounted
  return new Promise((resolve) => {
    toast(title, {
      description: text,
      duration: 12000,
      action: {
        label: confirmButtonText,
        onClick: () => resolve(true),
      },
      cancel: {
        label: "Cancel",
        onClick: () => resolve(false),
      },
      onDismiss: () => resolve(false),
      onAutoClose: () => resolve(false),
    });
  });
};

export const SwalAlert = (
  title: string,
  text: string,
  icon: "warning" | "error" | "success" | "info" | "question" = "info"
) => {
  if (icon === "error") {
    toast.error(title, { description: text });
  } else if (icon === "success") {
    toast.success(title, { description: text });
  } else {
    toast.info(title, { description: text });
  }
};

export const SwalSuccess = (title: string, text: string = "") => {
  toast.success(title, { description: text });
};

export const SwalError = (title: string, text: string = "") => {
  toast.error(title, { description: text });
};
