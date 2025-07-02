import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const neonButtonVariants = cva(
  "relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold uppercase tracking-wider rounded-lg border-2 transition-all duration-300 hover:scale-105 cursor-pointer group overflow-hidden",
  {
    variants: {
      variant: {
        pink: [
          "text-pink-300 border-pink-500 bg-black/80",
          "shadow-[0_0_20px_rgba(236,72,153,0.3)]",
          "hover:shadow-[0_0_30px_rgba(236,72,153,0.6),0_0_60px_rgba(236,72,153,0.3)]",
          "hover:border-pink-400 hover:text-pink-200",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-pink-500/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        ],
        blue: [
          "text-blue-300 border-blue-500 bg-black/80",
          "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
          "hover:shadow-[0_0_30px_rgba(59,130,246,0.6),0_0_60px_rgba(59,130,246,0.3)]",
          "hover:border-blue-400 hover:text-blue-200",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-blue-500/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        ],
        green: [
          "text-green-300 border-green-500 bg-black/80",
          "shadow-[0_0_20px_rgba(34,197,94,0.3)]",
          "hover:shadow-[0_0_30px_rgba(34,197,94,0.6),0_0_60px_rgba(34,197,94,0.3)]",
          "hover:border-green-400 hover:text-green-200",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-green-500/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        ],
        purple: [
          "text-purple-300 border-purple-500 bg-black/80",
          "shadow-[0_0_20px_rgba(168,85,247,0.3)]",
          "hover:shadow-[0_0_30px_rgba(168,85,247,0.6),0_0_60px_rgba(168,85,247,0.3)]",
          "hover:border-purple-400 hover:text-purple-200",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-purple-500/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        ],
      },
      size: {
        default: "px-8 py-4 text-lg",
        sm: "px-6 py-3 text-base",
        lg: "px-10 py-5 text-xl",
      },
    },
    defaultVariants: {
      variant: "pink",
      size: "default",
    },
  }
);

interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neonButtonVariants> {
  children: React.ReactNode;
}

export function NeonButton({
  className,
  variant,
  size,
  children,
  ...props
}: NeonButtonProps) {
  return (
    <button
      className={cn(neonButtonVariants({ variant, size, className }))}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
