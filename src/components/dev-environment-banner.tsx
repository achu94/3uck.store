"use client";

import * as React from "react";

interface DevEnvironmentBannerProps {
    onAccept: () => void;
}

export function DevEnvironmentBanner({ onAccept }: DevEnvironmentBannerProps) {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleAccept = () => {
        setIsVisible(false);
        onAccept();
    };

    const handleReject = () => {
        window.location.href = 'https://3uck.store';
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border rounded-lg p-6 max-w-md w-full mx-auto">
                <div className="text-center space-y-4">
                    <div className="text-2xl font-bold text-yellow-600">
                        🚧 Entwicklungs-Umgebung
                    </div>
                    
                    <p className="text-muted-foreground">
                        Dies ist eine Test-Umgebung für 3uck.store. 
                        Hier getätigte Aktionen sind nur für Testzwecke.
                    </p>

                    <div className="bg-yellow-100 border border-yellow-300 rounded-md p-3 text-sm text-yellow-800">
                        <strong>Wichtig:</strong> Keine echten Bestellungen aufgeben oder 
                        sensible Daten eingeben. Diese Umgebung wird regelmäßig zurückgesetzt.
                    </div>

                    <div className="flex gap-3 justify-center pt-4">
                        <button
                            onClick={handleReject}
                            className="px-4 py-2 text-sm border rounded-md hover:bg-muted"
                        >
                            Zur Live-Seite
                        </button>
                        
                        <button
                            onClick={handleAccept}
                            className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                        >
                            Verstanden & Fortfahren
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}