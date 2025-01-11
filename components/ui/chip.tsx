import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import React from "react"

const innerTextVariants = {
  default: '',
  Easy:    'text-difficulty-easy',
  Medium:  'text-difficulty-medium',
  Hard:    'text-difficulty-hard',
}

const ChipVariants = cva(
  'rounded-lg px-3 py-1.5 bg-neutral-200',
  {
    variants: {
      innerText: innerTextVariants,
    },
    defaultVariants: {
      innerText: "default"
    },
  }
)

export interface ChipProps {
  children?:  React.ReactNode
  className?: string
}

export const Chip = (props: ChipProps) => {
  return (
    <div
      className={cn(ChipVariants({
        innerText: (props.children && props.children.toString() in innerTextVariants)
          ? props.children.toString() as keyof typeof innerTextVariants
          : "default",
        className: props.className
      }))}
      {...props}>
      { props.children }
    </div>
  )
}