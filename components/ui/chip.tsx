import { cn } from "@/lib/utils"

export interface ChipProps {
  children?:  React.ReactNode
  className?: string
}

export const Chip = (props: ChipProps) => {
  return (
    <div className={cn('rounded-lg px-3 py-1.5 bg-neutral-200', props.className)}>
      { props.children }
    </div>
  )
}
