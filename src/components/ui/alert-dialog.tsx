'use client';

import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { createRoot } from 'react-dom/client';
import { DialogPortalProps } from '@radix-ui/react-dialog';

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot='alert-dialog' {...props} />;
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot='alert-dialog-trigger' {...props} />
  );
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot='alert-dialog-portal' {...props} />
  );
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot='alert-dialog-overlay'
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        'absolute',
        'data-[state=closed]:pointer-events-none',
        className
      )}
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  container,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  /** @see Radix UI Alert Dialog's {@link https://www.radix-ui.com/primitives/docs/components/alert-dialog#custom-portal-container | Custom portal container} */
  container?: DialogPortalProps['container'];
}) {
  return (
    <AlertDialogPortal container={container}>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot='alert-dialog-content'
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          'absolute',
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-dialog-header'
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-dialog-footer'
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot='alert-dialog-title'
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot='alert-dialog-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> & {
  variant: React.ComponentProps<typeof Button>['variant'];
}) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      {...props}
    />
  );
}

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
  variant?: React.ComponentProps<typeof Button>['variant'],
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
