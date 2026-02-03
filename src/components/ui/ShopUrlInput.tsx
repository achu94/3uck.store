import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

type InputWithBadgeProps = {
    badge: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputWithBadge({
    badge,
    className,
    ...props
}: InputWithBadgeProps) {
    return (
        <div className="flex w-full items-center overflow-hidden rounded-md border">
            <div className="bg-muted px-3 py-2 text-sm text-muted-foreground">
                {badge}
            </div>

            <Input
                className={`border-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${className ?? ""}`}
                placeholder={`${badge.replace("/", "")} Name eingeben`}
                {...props}
            />
        </div>
    );
}
