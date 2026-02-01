"use client";

import { useAtomValue } from "jotai";
import { storeTypeAtom } from "@/atoms/store";

import { Card3DModelStore } from "./Card3DModelStore";
import { Card3DPrintStore } from "./Card3DPrintStore";
import { StoreForm } from "./StoreForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export function NewStore() {
    const storeTyp = useAtomValue(storeTypeAtom);

    if (storeTyp === null) {
        return (
            <div className="hero min-h-screen bg-base-200 flex flex-col items-center justify-start">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">
                            Willkommen im Store Manger!
                        </h1>
                        <div className="flex flex-wrap gap-4 mt-8 justify-center">
                            <Card3DPrintStore />
                            <Card3DModelStore />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // return <StoreForm storeTyp={storeTyp} />;

    return (
        <div className="">
            <h1>AHCUACHUACHUAHCUHC</h1>
            <div className="flex justity-right">
                <Avatar className="h-12 w-12">
                    <AvatarImage src="" alt="Profilbild" />
                    <AvatarFallback className="bg-muted text-muted-foreground">
                        <User className="h-5 w-5" />
                    </AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
}
