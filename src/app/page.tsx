"use client";

import { WaitListSection } from "@/components/home/WaitListSection";
import { BannerSection } from "@/components/home/BannerSection";
import { NavbarSection } from "@/components/home/NavbarSection";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { RoadMapSection } from "@/components/home/RoadmapSection";
import { CtaSection } from "@/components/home/CtaSection";
import { FooterSection } from "@/components/home/FooterSection";

export default function Home() {
    return (
        <main className="min-h-screen max-w-6xl mx-auto">
            {/* Banner */}
            <BannerSection show={true} />

            {/* Navbar */}
            <NavbarSection />

            {/* Hero Section */}
            <HeroSection />

            {/* Features Preview */}
            <FeaturesSection />

            {/* Benefits */}
            <BenefitsSection />

            {/* Roadmap */}
            <RoadMapSection />

            {/* 3D-Designer & 3D-Drucker CTA */}
            <CtaSection />

            {/* Waitlist Form */}
            <WaitListSection />

            {/* Footer */}
            <FooterSection />
        </main>
    );
}
