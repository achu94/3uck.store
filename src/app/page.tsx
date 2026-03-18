"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { WaitListSection } from "@/components/home/WaitListSection";
import { BannerSection } from "@/components/home/BannerSection";
import { NavbarSection } from "@/components/home/NavbarSection";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { RoadMapSection } from "@/components/home/RoadmapSection";
import { FooterSection } from "@/components/home/FooterSection";
import { FloatingFeedback } from "@/components/home/FloatingFeedback";

export default function Home() {
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/dashboard");
        }
    }, [status, router]);

    if (status === "loading") {
        return null; // oder Spinner
    }

    return (
        <main className="min-h-screen mx-auto">
            <FloatingFeedback />
            <BannerSection show={true} />
            <NavbarSection />
            <HeroSection />
            <FeaturesSection />
            <BenefitsSection />
            <RoadMapSection />
            <WaitListSection />
            <FooterSection />
        </main>
    );
}
