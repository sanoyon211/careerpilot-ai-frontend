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

    let variantClasses = "bg-[#8B5CF6] text-white hover:bg-[#7C3AED] active:scale-[0.98]";
    if (variant === "ai") variantClasses = "bg-[#8B5CF6] text-white hover:bg-[#7C3AED] active:scale-[0.98]";
    if (variant === "secondary") variantClasses = "bg-[#0F172A] text-white hover:bg-[#1E293B] active:scale-[0.98]";
    if (variant === "destructive") variantClasses = "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]";
    if (variant === "outline") variantClasses = "border border-[#E5E7EB] bg-white hover:bg-[#FAFAFA] text-[#0F172A] hover:text-[#0F172A] active:scale-[0.98]";
    if (variant === "ghost") variantClasses = "hover:bg-[#FAFAFA] text-[#0F172A] hover:text-[#0F172A]";
    if (variant === "link") variantClasses = "text-[#8B5CF6] underline-offset-4 hover:underline";

    let sizeClasses = "h-11 px-6 py-2.5 rounded-full text-sm font-extrabold tracking-tight";
    if (size === "sm") sizeClasses = "h-9 px-4 rounded-full text-xs font-extrabold tracking-tight";
    if (size === "lg") sizeClasses = "h-13 px-8 rounded-full text-base font-extrabold tracking-tight";
    if (size === "icon") sizeClasses = "h-10 w-10 rounded-full flex items-center justify-center";

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
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
