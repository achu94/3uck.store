"use clinet";

import { useState } from "react";

import {
    Mail,
    Rocket,
    ArrowRight,
    CheckCircle,
    AlertCircle,
    Circle,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

import { createWaitlist } from "@/actions/waitlist/register-waitlist";

export function WaitListSection() {
    const [waitlistForm, setWaitlistForm] = useState({
        name: "",
        email: "",
        interest: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const response = await createWaitlist(waitlistForm);

            if (response?.error) {
                throw new Error("Fehler beim Anmelden");
            }

            setSuccess(true);
            setWaitlistForm({
                name: "",
                email: "",
                interest: "",
                message: "",
            });
        } catch (err) {
            setError("Fehler beim Anmelden. Bitte versuche es später erneut.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="waitlist" className="container mx-auto py-16">
            <div>
                <Card className="border-2 border-primary/20">
                    <CardHeader className="text-center pb-6">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Mail className="w-8 h-8 text-primary" />
                            <CardTitle className="text-2xl md:text-3xl">
                                Interesse anmelden
                            </CardTitle>
                        </div>
                        <CardDescription className="text-base">
                            Melde dich an, sobald wir live gehen benachrichtigen
                            wir dich! Kein Spam, nur Updates.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {success ? (
                            <div className="flex flex-col items-center justify-center gap-3 py-8 text-green-600">
                                <CheckCircle className="w-12 h-12" />
                                <h3 className="text-xl font-semibold">
                                    Erfolgreich angemeldet!
                                </h3>
                                <p className="text-muted-foreground">
                                    Wir benachrichtigen dich, sobald 3uck.store
                                    live geht.
                                </p>
                                <Button
                                    onClick={() => setSuccess(false)}
                                    variant="outline"
                                    className="mt-4"
                                >
                                    Weitere Anmeldung
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    {error && (
                                        <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Dein Name"
                                            value={waitlistForm.name}
                                            onChange={(e) =>
                                                setWaitlistForm({
                                                    ...waitlistForm,
                                                    name: e.target.value,
                                                })
                                            }
                                            required
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">E-Mail</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="deine@email.com"
                                            value={waitlistForm.email}
                                            onChange={(e) =>
                                                setWaitlistForm({
                                                    ...waitlistForm,
                                                    email: e.target.value,
                                                })
                                            }
                                            required
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="interest">
                                            Interesse als
                                        </Label>
                                        <select
                                            id="interest"
                                            value={waitlistForm.interest}
                                            onChange={(e) =>
                                                setWaitlistForm({
                                                    ...waitlistForm,
                                                    interest: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border rounded-md bg-background"
                                            required
                                        >
                                            <option value="">
                                                Bitte auswählen...
                                            </option>
                                            <option value="designer">
                                                3D-Designer
                                            </option>
                                            <option value="printer">
                                                3D-Drucker
                                            </option>
                                            <option value="customer">
                                                Kunde
                                            </option>
                                            <option value="investor">
                                                Investor
                                            </option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">
                                            Nachricht (optional)
                                        </Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Erzähl uns, was du suchst..."
                                            value={waitlistForm.message}
                                            onChange={(e) =>
                                                setWaitlistForm({
                                                    ...waitlistForm,
                                                    message: e.target.value,
                                                })
                                            }
                                            className="w-full resize-none"
                                            rows={3}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Circle className="w-4 h-4 mr-2 animate-spin" />
                                                Anmelden...
                                            </>
                                        ) : (
                                            <>
                                                Anmelden
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
