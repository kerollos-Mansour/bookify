// export type Destination = {
//   id: string;
//   name: string;
//   location: string;
//   price: number;
//   image: string;
// };

// export type CategoryId = "beach" | "culture" | "ski" | "family" | "wellness";

// export type Category = {
//   id: CategoryId;
//   label: string;
// };

// export const CATEGORIES: Category[] = [
//   { id: "beach", label: "Beach" },
//   { id: "culture", label: "Culture" },
//   { id: "ski", label: "Ski" },
//   { id: "family", label: "Family" },
//   { id: "wellness", label: "Wellness and Relaxation" },
// ];
import { DestinationType } from "./DestinationType";


export const CATEGORIES = [
  "beach",
  "culture",
  "ski",
  "family",
  "wellness",
] as const;

export type CategoryId = (typeof CATEGORIES)[number];


export const DESTINATIONS: Record<CategoryId, DestinationType[]> = {
  beach: [
    {
      id: "1",
      name: "Rio de Janeiro",
      location: "Rio de Janeiro State, Brazil",
      price: 2585,
      image:
        "https://images.unsplash.com/photo-1679957631642-94f406206544?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSaW8lMjBkZSUyMEphbmVpcm8lMjBiZWFjaHxlbnwxfHx8fDE3NjM3MDc5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "2",
      name: "San Juan",
      location: "Puerto Rico",
      price: 5696,
      image:
        "https://images.unsplash.com/photo-1564238750394-08cb8e37b7e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW4lMjBKdWFuJTIwUHVlcnRvJTIwUmljbyUyMGZvcnR8ZW58MXx8fHwxNzYzNzA3OTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "3",
      name: "Miami Beach",
      location: "Florida, United States of America",
      price: 5589,
      image:
        "https://images.unsplash.com/photo-1581271414285-8f702bc49eea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNaWFtaSUyMEJlYWNoJTIwaG90ZWxzfGVufDF8fHx8MTc2MzcwNzk2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "4",
      name: "Oranjestad",
      location: "Aruba",
      price: 4823,
      image:
        "https://images.unsplash.com/photo-1719710384057-1f6944ab531e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxPcmFuamVzdGFkJTIwQXJ1YmElMjBoYXJib3J8ZW58MXx8fHwxNzYzNzA3OTY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "5",
      name: "Montego Bay",
      location: "Saint James, Jamaica",
      price: 3912,
      image:
        "https://images.unsplash.com/photo-1558031715-5c8d48b508bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb250ZWdvJTIwQmF5JTIwSmFtYWljYXxlbnwxfHx8fDE3NjM3MDc5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ],
  culture: [
    {
      id: "6",
      name: "Cairo",
      location: "Egypt",
      price: 1850,
      image:
        "https://images.unsplash.com/photo-1723465308831-29da05e011f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzUzODAyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "7",
      name: "Rome",
      location: "Italy",
      price: 3200,
      image:
        "https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjM1NDI1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ],
  ski: [
    {
      id: "8",
      name: "Aspen",
      location: "Colorado, USA",
      price: 6800,
      image:
        "https://images.unsplash.com/photo-1482192505345-5655af888cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhYmlufGVufDF8fHx8MTc2MzU1NjQxNXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ],
  family: [
    {
      id: "9",
      name: "Orlando",
      location: "Florida, USA",
      price: 2950,
      image:
        "https://images.unsplash.com/photo-1662944726441-a4ca20f6f3fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY290dGFnZXxlbnwxfHx8fDE3NjM1NjcwNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ],
  wellness: [
    {
      id: "10",
      name: "Bali",
      location: "Indonesia",
      price: 1500,
      image:
        "https://images.unsplash.com/photo-1537225228614-b4fad34a82ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHZpbGxhfGVufDF8fHx8MTc2MzU1NzAxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ],
};
