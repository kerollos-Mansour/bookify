import { Link } from "react-router-dom";
import HotelCard from "../../hotelCard/HotelCard.jsx";
import { SearchResultsListProps } from "../../../types/searchResultListProps";

export default function SearchResultsList({
  hotelCards,
  loading,
  error,
}: SearchResultsListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        Loading properties...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20 text-red-600">
        {error}
      </div>
    );
  }

  if (hotelCards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-semibold text-gray-800 mb-2">
          No properties match these filters
        </p>
        <p className="text-sm text-gray-500">
          Try adjusting your filters or search in a different location.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {hotelCards.map(({ hotel, card }) => (
        <Link key={hotel.id} to={`/property/${hotel.id}`}>
          <HotelCard cardData={card} />
        </Link>
      ))}
    </div>
  );
}
