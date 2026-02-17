import { FC } from "react";
import Image from "next/image";

type LogoSize = "sm" | "md" | "lg" | "xl" | "2xl";

interface LogoIconProps {
    size?: LogoSize;
    className?: string;
}

const sizes: Record<LogoSize, number> = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
    "2xl": 128,
};

export const LogoIcon: FC<LogoIconProps> = ({
    size = "md",
    className = "",
}) => {
    const dimension = sizes[size];

    return (
        <Image
            src="/images/icons/logo-web.svg"
            alt="3uck.store Logo"
            width={dimension}
            height={dimension}
            className={`dark:invert ${className}`}
        />
    );
};
