import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import React from "react"

const innerTextVariants = {
  default: '',
  Easy:    'text-green-800',
  Medium:  'text-yellow-800',
  Hard:    'text-red-700',
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