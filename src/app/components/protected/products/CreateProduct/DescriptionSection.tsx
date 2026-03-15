import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";

interface DescriptionSectionProps {
    value: string;
    onChange: (val: string) => void;
}

export function DescriptionSection({
    value,
    onChange,
}: DescriptionSectionProps) {
    return (
        <div className="space-y-1.5 border-t pt-8 border-dashed">
            <Label
                htmlFor="description"
                className="text-sm font-semibold flex items-center gap-2"
            >
                <FileText className="h-4 w-4 text-primary" /> Beschreibung
            </Label>
            <Textarea
                id="description"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Produktdetails, Druckqualität, Lieferumfang..."
                className="bg-muted/20 min-h-[120px] focus-visible:ring-primary leading-relaxed"
            />
        </div>
    );
}
