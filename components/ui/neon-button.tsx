import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const neonButtonVariants = cva(
  " relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer group overflow-hidden border-1",
  {
    variants: {
      variant: {
        primary: ["text-primary drop-shadow-[0px_0px_28px_rgb(191, 243, 0)]"],
        pink: [
          "text-fiveiron-pink drop-shadow-[0px_0px_28px_rgb(255, 125, 167)] ",
        ],
        blue: ["text-fiveiron-cyan drop-shadow-[0px_0px_28px_rgb(6, 83, 140)]"],
        purple: [
          "text-fiveiron-purple drop-shadow-[0px_0px_28px_rgb(201, 51, 146)]",
        ],
      },
      size: {
        default: "px-8 py-4 text-4xl w-full h-28 md:h-36",
        sm: "px-6 py-3 text-base",
        lg: "px-10 py-5 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
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
