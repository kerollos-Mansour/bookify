import { PopularDestinations } from "../../components/popularDestinations/popularDestinations";
import FeaturedStays from "../../components/featuredStays/featuredStays";
import { featuredData } from "../../Data/featuredStays";
import { HeroSearch } from "../../components/heroSearch/heroSearch";
import { WhiteFridaySale } from "../../components/whiteFridaySales/whiteFridaySale";

export default function Home() {
  return (
    <>
      <HeroSearch />
      <WhiteFridaySale />
      <FeaturedStays destinations={featuredData} />
      <PopularDestinations />
    </>
  );
}
