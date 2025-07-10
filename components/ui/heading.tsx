'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const headingVariants = cva('font-extrabold text-balance uppercase ', {
  variants: {
    variant: {
      primary: 'text-primary ',
      secondary: 'text-fiveiron-yellow',
      white: 'text-white'
    },
    size: {
      default: 'text-4xl md:text-5xl lg:text-6xl',
      sm: 'text-2xl md:text-3xl lg:text-4xl',
      lg: 'text-5xl md:text-6xl lg:text-7xl'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default'
  }
});

function Heading({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> &
  VariantProps<typeof headingVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'h1';

  return <Comp data-slot="button" className={cn(headingVariants({ variant, size, className }))} {...props} />;
}

export { Heading, headingVariants };
