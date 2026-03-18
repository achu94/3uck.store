import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "3uck.store";

    return new ImageResponse(
        <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#000", // Schwarz für den coolen Tech-Look
                backgroundImage:
                    "radial-gradient(circle at 25px 25px, #333 2%, transparent 0%)",
                backgroundSize: "50px 50px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    color: "#fff",
                    fontSize: 60,
                    fontWeight: "bold",
                }}
            >
                3uck.store
            </div>
            <div
                style={{
                    marginTop: 40,
                    padding: "20px 40px",
                    backgroundColor: "#FFD700", // Gelb/Gold Akzent
                    borderRadius: 20,
                    fontSize: 80,
                    fontWeight: "bold",
                    color: "#000",
                }}
            >
                {title}
            </div>
            <div style={{ marginTop: 20, color: "#aaa", fontSize: 30 }}>
                Dein 3D-Druck Business startet hier.
            </div>
        </div>,
        {
            width: 1200,
            height: 630,
        },
    );
}
