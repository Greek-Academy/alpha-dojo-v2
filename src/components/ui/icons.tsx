import '@/fonts/MaterialSymbols.css';
import { cn } from '@/lib/utils';

interface MaterialSymbolProps {
  className?: string;
  size?: number;
}

export const MaterialSymbol = ({
  className,
  size,
  children,
}: {
  children: React.ReactNode;
} & MaterialSymbolProps) => {
  return (
    <span
      className={cn('material-symbols-outlined notranslate', className)}
      style={{ fontSize: size }}
    >
      {children}
    </span>
  );
};

export const AddIcon = (props: MaterialSymbolProps) => {
  return <MaterialSymbol {...props}>add</MaterialSymbol>;
};

export const CheckIcon = (props: MaterialSymbolProps) => {
  return <MaterialSymbol {...props}>check</MaterialSymbol>;
};

export const RestartAltIcon = (props: MaterialSymbolProps) => {
  return <MaterialSymbol {...props}>restart_alt</MaterialSymbol>;
};

export const KeyboardArrowDownIcon = (props: MaterialSymbolProps) => {
  return <MaterialSymbol {...props}>keyboard_arrow_down</MaterialSymbol>;
};

export const Lightbulb2 = (props: MaterialSymbolProps) => {
  return <MaterialSymbol {...props}>lightbulb_2</MaterialSymbol>;
};

export const TaskAltIcon = (props: MaterialSymbolProps) => {
  return <MaterialSymbol {...props}>task_alt</MaterialSymbol>;
};

export const ArrowUpwardIcon = (props: MaterialSymbolProps) => {
  return <MaterialSymbol {...props}>arrow_upward_alt</MaterialSymbol>;
};

export const ArrowDownwardIcon = (props: MaterialSymbolProps) => {
  return <MaterialSymbol {...props}>arrow_downward_alt</MaterialSymbol>;
};

export const AccountCircleIcon = (props: MaterialSymbolProps) => {
  return <MaterialSymbol {...props}>account_circle</MaterialSymbol>;
};

export const SortIcon = (props: MaterialSymbolProps) => {
  return <MaterialSymbol {...props}>sort</MaterialSymbol>;
};

export const ManufacturingIcon = (props: MaterialSymbolProps) => {
  return <MaterialSymbol {...props}>manufacturing</MaterialSymbol>;
};
