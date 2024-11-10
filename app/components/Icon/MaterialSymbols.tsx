import "@/app/fonts/MaterialSymbols.css"

export const MaterialSymbols = ({
    className = '',
    size = 24,
    children,
}: {
    className?: string;
    size?: number;
    children: React.ReactNode;
}) => {
    return (
        <span
            className={`material-symbols-outlined notranslate ${className}`}
            style={{ fontSize: `${size}px`, height:  `${size}px`}}
        >
            {children}
        </span>
    );
};
