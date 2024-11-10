import { Button, ButtonProps } from "@/components/ui/button"
import { MaterialSymbols } from "../Icons/MaterialSymbols"
import React from "react";

/** 
 * @param iconName Material Symbols のアイコン名  
 * @param iconUrl  アイコンファイルの URL
 * 
 * @remarks
 * `iconName`と`iconUrl`を同時に指定した場合の動作はサポートしません
 */
export function ActionButton({
    iconName,
    iconUrl,
    children,

    // components/ui/button.tsx を参考に
    className,
    variant,
    size,
    asChild = false,
    ...props
}: {
    iconName?: string,
    iconUrl?:  string,
    children?: React.ReactNode;
} & ButtonProps) {
    return (
        <Button className={`flex gap-2 pl-4 pr-6 py-[10px] rounded-full ${className}`}
                variant={variant}
                size={size}
                asChild={asChild}
                {...props}>
            {
                iconName ? <MaterialSymbols size={18}>add</MaterialSymbols> : null
            }
            {
                iconUrl ? <img src={iconUrl} /> : null
            }
            {
                children
            }
        </Button>
    )
}