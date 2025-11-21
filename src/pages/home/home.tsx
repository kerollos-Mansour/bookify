import { PopularDestinations } from "../../components/popularDestinations/popularDestinations";
import FeaturedStays, {
  featuredData,
} from "../../components/featuredStays/featuredStays";
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
