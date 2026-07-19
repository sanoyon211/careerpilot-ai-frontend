import * as React from "react";
import { cn } from "@/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, isLoading, disabled, children, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";

    let variantClasses = "bg-primary text-primary-foreground hover:opacity-90 shadow-sm active:scale-[0.98]";
    if (variant === "destructive") variantClasses = "bg-red-600 text-white hover:bg-red-700 shadow-sm active:scale-[0.98]";
    if (variant === "outline") variantClasses = "border border-border/80 bg-card/60 hover:bg-secondary text-foreground active:scale-[0.98]";
    if (variant === "secondary") variantClasses = "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]";
    if (variant === "ghost") variantClasses = "hover:bg-secondary text-foreground";
    if (variant === "link") variantClasses = "text-primary underline-offset-4 hover:underline";

    let sizeClasses = "h-10 px-5 py-2 rounded-full text-sm font-semibold";
    if (size === "sm") sizeClasses = "h-8 px-3.5 rounded-full text-xs font-semibold";
    if (size === "lg") sizeClasses = "h-12 px-8 rounded-full text-base font-semibold";
    if (size === "icon") sizeClasses = "h-10 w-10 rounded-full flex items-center justify-center";

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
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
