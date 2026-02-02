import { Input } from "@/components/ui/input";

export function InputWithBadge({ badget }: { badget: string }) {
    return (
        <div className="flex w-full items-center overflow-hidden rounded-md border">
            {/* Prefix */}
            <div className="bg-muted px-3 py-2 text-sm text-muted-foreground">
                {badget}
            </div>

            {/* Input */}
            <Input
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder={`${badget.replace("/", "")} Name eingeben`}
            />
        </div>
    );
}
