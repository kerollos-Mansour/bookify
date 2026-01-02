import { PopularDestinations } from "../../components/popularDestinations/popularDestinations";
import { featuredData } from "../../constants/featuredStays";
import {
    HeroSection,
    HeroFloatingSearch,
} from "../../components/heroSearch/HeroSearch";
import { WhiteFridaySale } from "../../components/whiteFridaySales/whiteFridaySale";
import { WhereYouLeftOff } from "../../components/whereYouLeftOff/WhereYouLeftOff";
import PageTransition from "../../components/pageTransition/pageTransition";
import FeaturedStays from "../../components/featuredStays/FeaturedStays";

export default function Home() {
    return (
        <>
            <PageTransition>
                <HeroSection />
                <div className="relative z-0 -mt-24 bg-alternate dark:bg-[#0F172A]">
                    <div className="container mx-auto -translate-y-1/2 px-4 z-20 relative">
                        <HeroFloatingSearch />
                    </div>

                    <div className="-mt-12 sm:-mt-16 md:-mt-20">
                        {/* Where You Left Off - No Background */}
                        <div className="sm:py-12 ">
                            <WhereYouLeftOff />
                        </div>
                        <FeaturedStays />
                        <PopularDestinations />
                    </div>
                </div>
            </PageTransition>
        </>
    );
}
