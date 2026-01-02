import { HotelCardData } from "./hotelCard.type";

export type SearchResultsListProps = {
  hotelCards: Array<{
    hotel: { id: string };
    card: HotelCardData;
  }>;
  loading: boolean;
  error: string | null;
};
