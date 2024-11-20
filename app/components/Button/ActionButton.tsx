import { Button, ButtonProps } from "@/components/ui/button"
import { MaterialSymbols } from "../Icons/MaterialSymbols"
import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

/** 
 * @param iconName Material Symbols のアイコン名  
 * @param iconSrc  import した静的画像 or 外部 URL
 * 
 * @remarks
 * `iconName`と`iconUrl`を同時に指定した場合の動作はサポートしません
 */
export function ActionButton({
    iconName,
    iconSrc,
    children,

    // components/ui/button.tsx を参考に
    className,
    variant,
    size,
    asChild = false,
    ...props
}: {
    iconName?: string,
    iconSrc?:  string | StaticImport,
    children?: React.ReactNode;
} & ButtonProps) {
    return (
        // 左右で余白が違うのは Material Design 3 の仕様
        //     (アイコンが小さく表示されて左右の余白がズレたように見えるから？)
        // 文字だけを表示した際には、文字の左に margin 8px をつけているので揃う
        // gap-0: shadcn がデフォルトで入れている間隔を削除
        <Button className={`gap-0 pl-[16px] pr-[24px] py-[10px] rounded-full ${className}`}
                variant={variant}
                size={size}
                asChild={asChild}
                {...props}>
            {
                iconName
                    ?   <MaterialSymbols size={18}>
                            {iconName}
                        </MaterialSymbols>
                    :   null
            }
            {
                iconSrc
                    ? <Image src={iconSrc} height={18} alt="" />
                    : null
            }
            {
                <span className="ml-[8px]">
                    {children}
                </span>
            }
        </Button>
    )
}