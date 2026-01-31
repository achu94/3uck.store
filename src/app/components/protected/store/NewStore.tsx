import { Card3DModelStore } from "./Card3DModelStore";
import { Card3DPrintStore } from "./Card3DPrintStore";

export function NewStore() {
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

                    <div className="mt-8 opacity-75">
                        <p>
                            👉 Später: Analytics, Listings, Druck‑Jobs,
                            Einnahmen
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
