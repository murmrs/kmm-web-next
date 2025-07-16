import Link from "next/link";
import Image from "next/image";
import { Restaurant } from "@/config/typesense";

export const RestaurantCard: React.FC<{ location: Restaurant }> = ({
  location,
}) => {
  if (!location) {
    return null;
  }

  return (
    <>
      <Link
        href={`/restaurants/${location.id}`}
        className="font-semibold md:text-md  max-w-[800px]"
      >
        <div className="mb-3 block aspect-square md:mb-4 rounded-md overflow-hidden">
          <Image
            src={location.image_url}
            // alt={image.alt}
            width={500}
            height={500}
            alt=""
            className="size-full object-cover"
          />
        </div>
        <div className="mb-2">
          <h3>{location.name}</h3>

          <div className="text-sm font-normal">{location.description}</div>
        </div>
        <div className="text-sm font-normal ">
          {location.city}, {location.state}
        </div>
        {/* <div className="text-md md:text-lg">{location.price_range}</div> */}
      </Link>
    </>
  );
};
