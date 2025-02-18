'use client';

import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '@/lib/utils';
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { createRoot } from 'react-dom/client';
import { DialogPortalProps } from '@radix-ui/react-dialog';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      // shadcn original:
      // "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      'absolute inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:pointer-events-none',
      className
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> & {
    /** @see Radix UI Alert Dialog's {@link https://www.radix-ui.com/primitives/docs/components/alert-dialog#custom-portal-container | Custom portal container} */
    container?: DialogPortalProps['container'];
  }
>(({ className, container, ...props }, ref) => (
  <AlertDialogPortal container={container}>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        // shadcn original:
        // "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        'absolute left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & {
    variant?: ButtonProps['variant'];
  }
>(({ className, variant, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants({ variant }), className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: 'outline' }),
      'mt-2 sm:mt-0',
      className
    )}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

/** Use Radix UI's Alert Dialog like `window.confirm()`
 * @example
 * ```tsx
 * import { DialogPortalProps } from '@radix-ui/react-dialog';
 *
 * const [container, setContainer] = React.useState<DialogPortalProps["container"]>(null)
 * const result = await Confirm(
 *   '言語を切り替えますか？',
 *   'コーディング言語を切り替えると今までの作業内容は失われ、デフォルトの状態に戻ります。',
 *   container
 * );
 *
 * return (
 *   // position: relative でダイアログの表示範囲を指定
 *   <div className='relative'>
 *     ...
 *     <div ref={setContainer} />
 *   </div>
 * )
 * ```
 */
export const Confirm = (
  title?: string,
  description?: string,
  variant?: ButtonProps['variant'],
  /** Confirm Dialog のレンダリング先。デフォルトは `document.body`
   * @see Radix UI Alert Dialog's {@link https://www.radix-ui.com/primitives/docs/components/alert-dialog#custom-portal-container | Custom portal container}
   */
  portalContainer?: DialogPortalProps['container']
): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    const ConfirmDialog = () => {
      const [open, setOpen] = React.useState(true); // 最初から開いた状態にする

      const handleAction = () => {
        resolve(true);
        setOpen(false);
      };

      const handleCancel = () => {
        resolve(false);
        setOpen(false);
      };

      return (
        <AlertDialog open={open}>
          <AlertDialogContent
            container={portalContainer}
            // 関数から呼び出すと、なぜか Esc が効かない
            // (認識はしているのに...)
            onEscapeKeyDown={() => setOpen(false)}
          >
            <AlertDialogHeader>
              {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
              {description && (
                <AlertDialogDescription>{description}</AlertDialogDescription>
              )}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>
                キャンセル
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleAction} variant={variant}>
                続行
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    };

    // DOM にコンポーネントをマウントするための div を作成
    const container = document.createElement('div');
    // document.body.appendChild(container);

    // React.render を使ってコンポーネントをマウント
    const root = createRoot(container);
    root.render(<ConfirmDialog />);

    // unmount 処理を追加
    // const cleanup = () => {
    //     root.unmount();
    //     document.body.removeChild(container);
    // };

    // resolve 時に cleanup を実行
    const originalResolve = resolve;
    resolve = (value: boolean | PromiseLike<boolean>) => {
      originalResolve(value);

      // Alert Dialog を閉じる際のアニメーションを待機
      // setTimeout(() => {
      //   cleanup();
      // }, 10000)
    };
  });
};

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
