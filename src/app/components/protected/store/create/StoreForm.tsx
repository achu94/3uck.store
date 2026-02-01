"use client";

import { notFound } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { StoreDataBase } from "@/types/store";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// -----------------------------
// Schema
// -----------------------------
const storeFormSchema = z.object({
    name: z.string().min(4, "Mindestens 4 Zeichen"),
    slug: z.string().min(4, "Mindestens 4 Zeichen"),
    description: z.string().min(1, "Pflichtfeld"),
    logo_url: z.string().optional(),
    contact_email: z.string().email("Ungültige E-Mail"),

    printer_count: z.enum(["<5", ">10"], {
        required_error: "Bitte wähle eine Option",
    }),

    is_aktiv: z.boolean().optional(),

    agbAccepted: z.literal(true, {
        errorMap: () => ({
            message: "Du musst die AGB akzeptieren",
        }),
    }),
});

type StoreFormValues = z.infer<typeof storeFormSchema>;

// -----------------------------
// Props
// -----------------------------
type StoreFormProps = {
    storeTyp: "print" | "model";
    initialData?: StoreDataBase;
};

// -----------------------------
// Component
// -----------------------------
export function StoreForm({ storeTyp, initialData }: StoreFormProps) {
    if (!storeTyp) notFound();

    const isEditMode = Boolean(initialData);

    const form = useForm<StoreFormValues>({
        resolver: zodResolver(storeFormSchema),
        defaultValues: {
            name: initialData?.name ?? "",
            slug: initialData?.slug ?? "",
            description: initialData?.description ?? "",
            logo_url: initialData?.logo_url ?? "",
            contact_email: initialData?.contact_email ?? "",
            printer_count: "<5",
            is_aktiv: initialData?.is_aktiv ?? true,
            agbAccepted: false,
        },
    });

    function onSubmit(values: StoreFormValues) {
        const payload = isEditMode
            ? {
                  id: initialData!.id,
                  description: values.description,
                  logo_url: values.logo_url,
                  contact_email: values.contact_email,
                  is_aktiv: values.is_aktiv,
              }
            : {
                  name: values.name,
                  slug: values.slug,
                  description: values.description,
                  logo_url: values.logo_url,
                  contact_email: values.contact_email,
                  printer_count: values.printer_count,
                  type: storeTyp,
              };

        console.log(isEditMode ? "UPDATE STORE" : "CREATE STORE", payload);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 max-w-2xl"
            >
                {/* HEADER */}
                <div>
                    <h1 className="text-2xl font-semibold">
                        {isEditMode
                            ? "Store bearbeiten"
                            : "Neuen Store erstellen"}
                    </h1>
                    <p className="text-muted-foreground">
                        Basisinformationen zu deinem {storeTyp}-Store
                    </p>
                </div>

                {/* BASE INFO */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basisinformationen</CardTitle>
                        <CardDescription>
                            Name und Slug können später nicht mehr geändert
                            werden
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isEditMode}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isEditMode}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* PRINTER COUNT */}
                        <FormField
                            control={form.control}
                            name="printer_count"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Anzahl Printer</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className="flex gap-6"
                                        >
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl>
                                                    <RadioGroupItem value="<5" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Weniger als 5
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl>
                                                    <RadioGroupItem value=">10" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Mehr als 10
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* LOGO */}
                <Card>
                    <CardHeader>
                        <CardTitle>Store Logo</CardTitle>
                        <CardDescription>
                            Wird öffentlich angezeigt
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input type="file" accept="image/*" />
                    </CardContent>
                </Card>

                {/* DETAILS */}
                <Card>
                    <CardHeader>
                        <CardTitle>Details & Kontakt</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Beschreibung</FormLabel>
                                    <FormControl>
                                        <Textarea rows={4} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="contact_email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kontakt E-Mail</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* STATUS */}
                {isEditMode && (
                    <Card>
                        <CardContent className="flex items-center justify-between py-6">
                            <div>
                                <p className="font-medium">Store aktiv</p>
                                <p className="text-sm text-muted-foreground">
                                    Deaktivierte Stores sind nicht sichtbar
                                </p>
                            </div>
                            <FormField
                                control={form.control}
                                name="is_aktiv"
                                render={({ field }) => (
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                )}
                            />
                        </CardContent>
                    </Card>
                )}

                {/* AGB */}
                {!isEditMode && (
                    <FormField
                        control={form.control}
                        name="agbAccepted"
                        render={({ field }) => (
                            <FormItem className="flex items-start gap-3">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="text-sm leading-snug">
                                    Ich akzeptiere die AGB und bestätige, dass
                                    ich berechtigt bin, diesen Store zu
                                    erstellen.
                                </FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <Separator />

                <Button size="lg" type="submit">
                    {isEditMode ? "Änderungen speichern" : "Store erstellen"}
                </Button>
            </form>
        </Form>
    );
}
