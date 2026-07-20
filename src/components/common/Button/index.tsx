import * as React from "react";
import { cn } from "@/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ai" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, isLoading, disabled, children, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";

    let variantClasses = "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-md shadow-blue-600/15 active:scale-[0.98]";
    if (variant === "ai") variantClasses = "bg-[#8B5CF6] text-white hover:bg-[#7C3AED] shadow-md shadow-purple-600/20 active:scale-[0.98]";
    if (variant === "destructive") variantClasses = "bg-red-600 text-white hover:bg-red-700 shadow-sm active:scale-[0.98]";
    if (variant === "outline") variantClasses = "border border-[#E2E8F0] bg-white hover:bg-[#F4F7FE] text-[#1E293B] hover:text-[#2563EB] hover:border-[#CBD5E1] active:scale-[0.98]";
    if (variant === "secondary") variantClasses = "bg-[#F4F7FE] text-[#2563EB] hover:bg-[#E0E7FF] border border-[#E2E8F0] active:scale-[0.98]";
    if (variant === "ghost") variantClasses = "hover:bg-[#F4F7FE] text-[#1E293B] hover:text-[#2563EB]";
    if (variant === "link") variantClasses = "text-[#2563EB] underline-offset-4 hover:underline";

    let sizeClasses = "h-11 px-6 py-2.5 rounded-full text-sm font-bold tracking-tight";
    if (size === "sm") sizeClasses = "h-9 px-4 rounded-full text-xs font-bold tracking-tight";
    if (size === "lg") sizeClasses = "h-13 px-8 rounded-full text-base font-bold tracking-tight";
    if (size === "icon") sizeClasses = "h-10 w-10 rounded-full flex items-center justify-center";

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variantClasses,
          sizeClasses,
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
