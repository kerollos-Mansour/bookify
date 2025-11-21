
interface DestinationCardType {
  image: string;
  title: string;
  address: string;
  rating: number;
  price: number;
  bestSeller?: boolean;
}

export const featuredData: DestinationCardType[] = [
  {
    image:
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjM1NDI1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Urbanza Suites",
    address: "Main Road 123 Street , 23 Colony",
    rating: 4.5,
    price: 399,
    bestSeller: true,
  },
  {
    image:
      "https://images.trvl-media.com/lodging/75000000/74900000/74892600/74892548/99e837db.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    title: "Urbanza Suites",
    address: "Main Road 123 Street , 23 Colony",
    rating: 4.5,
    price: 299,
  },
  {
    image:
      "https://images.trvl-media.com/lodging/121000000/120090000/120081500/120081412/e057a1cd.jpg?impolicy=fcrop&w=1200&h=800&quality=medium",
    title: "Urbanza Suites",
    address: "Main Road 123 Street , 23 Colony",
    rating: 4.5,
    price: 249,
    bestSeller: true,
  },
  {
    image:
      "https://images.trvl-media.com/lodging/121000000/120090000/120081500/120081412/f149f6ed.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    title: "Urbanza Suites",
    address: "Main Road 123 Street , 23 Colony",
    rating: 4.5,
    price: 199,
  },
];
export default function PropertyCard({ item }: { item: DestinationCardType }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        {item.bestSeller && (
          <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-sm font-medium shadow">
            Best Seller
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#f97316"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568L24 9.748l-6 5.848L19.335 24 12 19.771 4.665 24 6 15.596l-6-5.848 8.332-1.593z" />
            </svg>
            <span className="text-sm font-medium text-gray-500">
              {item.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7-7.5 11-7.5 11S4.5 17.5 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          {item.address}
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-semibold">
            ${item.price} <span className="text-sm text-gray-400">/night</span>
          </p>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}