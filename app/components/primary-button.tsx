import { Button } from "@/components/ui/button";

interface IButtonInfo {
    onClick: (e: React.FormEvent) => void;
    title: string;
}

export function PrimaryButton(props: IButtonInfo){
    return(
        <Button onClick={props.onClick}>{props.title}</Button>
    )
}
