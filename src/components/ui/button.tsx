import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  cn(
    // "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-label-large transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-secondary focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    'rounded-full cursor-pointer transition overflow-hidden ring-offset-2',
    /* State layer */ 'relative after:absolute after:inset-0 after:opacity-0 after:transition-opacity',
    /* Hovered */ 'hover:after:opacity-8',
    /* Focused */ 'focus-visible:after:opacity-10',
    /* Pressed */ 'active:after:opacity-10 active:drop-shadow-none',
    /* Disabled */ 'disabled:text-foreground/38',
    /* Icon */ '[&>[class*="material-symbols-"]]:first:text-[18px]!'
  ),
  {
    variants: {
      variant: {
        default:
          'hover:drop-shadow-sm bg-primary text-primary-foreground after:bg-primary-foreground disabled:bg-foreground/12',
        destructive:
          'hover:drop-shadow-sm bg-destructive text-white after:bg-primary-foreground focus-visible:ring-destructive disabled:bg-foreground/12',
        outline:
          'border text-primary after:bg-primary disabled:border-foreground/12',
        secondary:
          'hover:drop-shadow-sm bg-secondary text-secondary-foreground after:bg-secondary-foreground disabled:bg-foreground/12',
        ghost: 'text-primary after:bg-primary',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'px-6 py-2.5 [&>[class*="material-symbols-"]]:first:-ml-2 [&>[class*="material-symbols-"]]:last:-mr-2',
        sm: 'px-3 py-2.5 has-[[class*="material-symbols-"]:first-child]:pr-4 has-[[class*="material-symbols-"]:last-child]:pl-4',
        lg: 'rounded-md px-6',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/** SVG アイコンのサイズは自動的に 1rem に縮小されるので、
 *  強制的に変更したい場合は className に important modifier をつける。 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
