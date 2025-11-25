import { BiMessageDetail } from "react-icons/bi";

type Experience = {
  title: string;
  description: string;
  heroImage: string;
  gallery: string[];
  guestQuote: string;
};

interface TreatmentsProps {
  experience?: Experience;
}

export default function Treatments({ experience }: TreatmentsProps) {
  if (!experience) {
    return null; // or return nothing
  }



  const secondaryOne = experience.gallery[0];
  const secondaryTwo = experience.gallery[1];
  const hasSecondaryImages = secondaryOne && secondaryTwo;

  return (
    <>
      <div className="mb-12 mt-12">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
          Treatments
        </h2>

        {/* Mobile & Tablet: Stack layout */}
        <div className="block xl:hidden space-y-6">
          {/* Spa image */}
          <div className="h-64 md:h-96">
            <img
              src={experience?.heroImage}
              alt={experience.title}
              className="w-full h-full object-cover rounded-lg"
              onError={(event) => {
                event.currentTarget.src = "/spa-main.png";
              }}
            />
          </div>

          {/* Title and Description */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">{experience.title}</h3>
            <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
              {experience.description}
            </p>
          </div>

          {/* Two smaller images */}
          {hasSecondaryImages && (
            <div className="grid grid-cols-2 gap-4">
            {[secondaryOne, secondaryTwo].map((img, index) => (
              <img
              key={`${img}-${index}`}
              src={img}
              alt={`${experience.title} ${index + 1}`}
              className="w-full h-40 md:h-48 object-cover rounded-lg"
              onError={(event) => {
                event.currentTarget.src = "/spa-main2.png";
              }}
              />
            ))}
          </div>
          )}

          {/* Guest Review Card */}
          <div className="bg-blue-50 p-4 md:p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-200 p-2 md:p-3 rounded-full">
                <BiMessageDetail className="text-xl md:text-2xl text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm md:text-base">
                What guests liked about the beach
              </h3>
            </div>
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">
              {experience.guestQuote}
            </p>
          </div>

          {/* Link */}
          <button className="text-blue-600 hover:underline flex items-center gap-1 text-sm md:text-base">
            See all beach amenities
            <span>›</span>
          </button>
        </div>

        {/* Desktop: Three-column layout */}
        <div className="hidden xl:grid xl:grid-cols-[400px_1fr_350px] gap-6">
          {/* Large spa image - Left side */}
          <div className="h-[450px]">
            <img
              src={experience.heroImage}
              alt={experience.title}
              className="w-full h-full object-cover rounded-lg"
             
            />
          </div>

          {/* Middle section */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-4">{experience.title}</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">{experience.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[secondaryOne, secondaryTwo].map((img, index) => (
                <img
                  key={`${img}-${index}`}
                  src={img}
                  alt={`${experience.title} ${index + 1}`}
                  className="w-full h-[180px] object-cover rounded-lg"
                />
              ))}
            </div>
            <button className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
              See all beach amenities
              <span>›</span>
            </button>
          </div>

          {/* Right side - Guest Review Card */}
          <div className="bg-blue-50 p-6 rounded-lg h-fit">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-200 p-3 rounded-full">
                <BiMessageDetail className="text-2xl text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm">
                What guests liked about the beach
              </h3>
            </div>
            <p className="text-gray-800 leading-relaxed text-sm">
              {experience.guestQuote}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
