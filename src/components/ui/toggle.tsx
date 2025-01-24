'use client';

import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const toggleVariants = cva(
  // shadcn original:
  // "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-[color,background-color,border-color,filter] hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-secondary-container data-[state=on]:text-on-secondary-container ' +
    'text-xs',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          // shadcn original:
          // "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
          'border border-outline-variant bg-transparent hover:bg-on-surface-variant/5 ' +
          'text-on-surface-variant font-medium data-[state=on]:border-0 hover:data-[state=on]:drop-shadow',
      },
      size: {
        default: 'h-8 px-3',
        sm: 'h-6 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
