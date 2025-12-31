import { PopularDestinations } from "../../components/popularDestinations/popularDestinations";
import { featuredData } from "../../constants/featuredStays";
import { HeroSearch } from "../../components/heroSearch/HeroSearch";
import { WhiteFridaySale } from "../../components/whiteFridaySales/whiteFridaySale";
import { WhereYouLeftOff } from "../../components/whereYouLeftOff/WhereYouLeftOff";
import PageTransition from "../../components/pageTransition/pageTransition";
import FeaturedStays from "../../components/featuredStays/FeaturedStays";

export default function Home() {
  return (
    <>
      <PageTransition>
        <HeroSearch />
        <WhiteFridaySale />
        <WhereYouLeftOff />
        <FeaturedStays />
        <PopularDestinations />
      </PageTransition>
    </>
  );
}
