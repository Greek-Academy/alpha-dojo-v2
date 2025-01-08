import '@/app/fonts/MaterialSymbols.css';
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

export const TaskAltIcon = (props: MaterialSymbolProps) => {
  return <MaterialSymbol {...props}>task_alt</MaterialSymbol>;
};

