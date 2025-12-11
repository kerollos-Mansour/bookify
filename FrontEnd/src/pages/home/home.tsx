import { PopularDestinations } from "../../components/popularDestinations/popularDestinations";
import FeaturedStays from "../../components/featuredStays/featuredStays";
import { featuredData } from "../../constants/featuredStays";
import { HeroSearch } from "../../components/heroSearch/HeroSearch";
import { WhiteFridaySale } from "../../components/whiteFridaySales/whiteFridaySale";
import { WhereYouLeftOff } from "../../components/whereYouLeftOff/WhereYouLeftOff";
import PageTransition from "../../components/pageTransition/pageTransition";

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
