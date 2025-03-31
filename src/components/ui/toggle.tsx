'use client';

import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const toggleVariants = cva(
  cn(
    // "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
    "inline-flex items-center justify-center gap-2 rounded-md text-sm hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
    'transition-[color,background-color,border-color,filter]',
    'text-xs'
  ),
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: cn(
          'border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground',
          'border-outline-variant text-label-large overflow-hidden',
          /* State layer */ 'relative after:absolute after:inset-0 after:opacity-0 after:transition-opacity',
          /* Hovered */ 'hover:after:opacity-8',
          /* Focused */ 'focus-visible:after:opacity-10',
          /* Pressed */ 'active:after:opacity-10 active:drop-shadow-none',
          /* Disabled */ 'disabled:text-foreground/38',
          /* Selected */ 'data-[state=on]:border-0 data-[state=on]:bg-secondary-container data-[state=on]:text-secondary-container-foreground',
          'after:bg-foreground-variant text-on-surface-variant'
        ),
      },
      size: {
        default: 'h-8 px-3 min-w-8',
        sm: 'h-7 px-2.5 min-w-7',
        lg: 'h-9 px-3.5 min-w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
