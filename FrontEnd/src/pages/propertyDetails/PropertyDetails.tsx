import { useParams } from "react-router-dom";
import { SearchBar } from "../../components/searchBar/searchBar";
import RoomsSection from "../../components/propertyDetails/chooseRoom/chooseRoom";
import Gallery from "../../components/propertyDetails/gallery/gallery";
import NavigationBar from "../../components/propertyDetails/navigationBar/navigationBar";
import PropertyInfo from "../../components/propertyDetails/propertyInfo/propertyInfo";
import PageTransition from "../../components/pageTransition/pageTransition";
import { useGetHotelByIdQuery } from "../../store/api/hotels.api";
import { useGetRoomsByHotelIdQuery } from "../../store/api/room.api";

export default function PropertyDetailsPage() {
  const { id } = useParams();

  const {
    data: hotel,
    isLoading: hotelLoading,
    error: hotelError,
  } = useGetHotelByIdQuery(id || "", {
    skip: !id,
  });

  const {
    data: rooms = [],
    isLoading: roomsLoading,
    error: roomsError,
  } = useGetRoomsByHotelIdQuery(id || "", {
    skip: !id,
  });

  const isLoading = hotelLoading || roomsLoading;
  const error = hotelError || roomsError;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-600">
        <p>Failed to load property</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="flex justify-center items-center h-screen">
        Property not found
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="propertyDetailsWrapper px-4 sm:px-6 md:px-8 lg:px-12 xl:px-60">
        <SearchBar hideOnMobile={true} />
        <Gallery images={hotel.images ?? []} />
        <NavigationBar />
        <PropertyInfo hotel={hotel} />
        <RoomsSection rooms={rooms} hotel={hotel} />
      </div>
    </PageTransition>
  );
}
