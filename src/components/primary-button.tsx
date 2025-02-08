import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface PrimaryButtonProps {
  onClick?: (e: React.FormEvent) => void;
  children?: ReactNode;
}

export function PrimaryButton(props: PrimaryButtonProps) {
  return <Button onClick={props.onClick}>{props.children}</Button>;
}
