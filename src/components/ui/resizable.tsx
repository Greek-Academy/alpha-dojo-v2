'use client';

import * as ResizablePrimitive from 'react-resizable-panels';

import { cn } from '@/lib/utils';

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
      className
    )}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

// const ResizableHandleVariants = cva(
//   'bg-border-variant opacity-0 group-hover:opacity-100 transition-[opacity,width,height]',
//   {
//     variants: {
//       direction: {
//         horizontal: 'w-1 h-full group-active:w-0.5',
//         vertical: 'h-1 w-full group-active:h-0.5',
//       },
//     },
//     defaultVariants: {
//       direction: 'horizontal',
//     },
//   }
// );

const ResizableHandle = ({
  className,
  children,
  gap = 10,
  hitAreaMargins,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
  gap?: number;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      // shadcn original:
      // 'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90',
      'flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 ' +
        'group data-[panel-group-direction=horizontal]:!h-full data-[panel-group-direction=vertical]:!w-full',
      className
    )}
    style={{
      width: `${gap}px`,
      height: `${gap}px`,
      ...props.style,
    }}
    /** 余白を `gap` で指定しているため、追加のサイズ変更用の領域は不要
     * (`react-resizable-panels` のデフォルトでは、`gap` は存在しない)
     */
    hitAreaMargins={{ coarse: 0, fine: 0, ...hitAreaMargins }}
    {...props}
  >
    {children || (
      <div
        className={
          'bg-border-variant opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-[opacity,width,height] ' +
          'group-data-[panel-group-direction=horizontal]:w-1 group-data-[panel-group-direction=horizontal]:h-full group-active:group-data-[panel-group-direction=horizontal]:w-0.5 ' +
          'group-data-[panel-group-direction=vertical]:h-1   group-data-[panel-group-direction=vertical]:w-full   group-active:group-data-[panel-group-direction=vertical]:h-0.5'
        }
      />
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
