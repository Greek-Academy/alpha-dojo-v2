import { Button, ButtonProps } from "@/components/ui/button"
import React, { ReactNode } from "react";

/** 
 * @param icon React コンポーネント
 * 
 * @remarks
 * `iconName`と`iconUrl`を同時に指定した場合の動作はサポートしません
 */
export function ActionButton({
    icon,
    children,

    // components/ui/button.tsx を参考に
    className,
    variant,
    size,
    asChild = false,
    ...props
}: {
    icon?:     ReactNode,
    children?: React.ReactNode;
} & ButtonProps) {
    return (
        // 左右で余白が違うのは Material Design 3 の仕様
        //     (アイコンが小さく表示されて左右の余白がズレたように見えるから？)
        // 文字だけを表示した際には、文字の左に margin 8px をつけているので揃う
        // gap-0: shadcn がデフォルトで入れている間隔を削除
        <Button className={`gap-0 pl-4 pr-6 py-2 rounded-full ${className}`}
                variant={variant}
                size={size}
                asChild={asChild}
                {...props}>
            { icon }
            <span className="ml-2">
                {children}
            </span>
        </Button>
    )
}