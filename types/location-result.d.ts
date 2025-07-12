type LocationSearchResult = {
  action: "getAll";
  entityType: "LocationFullResponse";
  message: "Entities retrieved";
  page: number; // See page parameter above
  totalPages: number; // The total number of pages
  numberOfEntities: number; // The number of entities for this page
  totalEntities: number; // The total number of entities across all pages
  entities: LocationResult[];
};

type Image = {
  id: number;
  uuid: string;
  status: string;
  createdAt: number;
  updatedAt: number;
  url: string;
  variants: {
    thumbnail: string;
    public: string;
  };
  fileName: string;
  displayName: string;
  description: string;
};

type LocationResult = {
  id: number;
  uuid: string;
  status: "active";
  createdAt: number;
  updatedAt: number;
  type: "restaurant";
  name: string;
  description: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  timezone: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  website: string;
  gratuity: string[];
  corkageFee: boolean;
  corkageFeeAmmount: number;
  dogsOk: boolean;
  rating: number;
  priceRangeResponse: {
    min: number;
    max: number;
  };
  needToKnow: string;
  reservations: string;
  displayEvents: boolean;
  displaySafetyMeasures: boolean;
  displayKitchenAttributes: boolean;
  displayPaymentOptions: boolean;
  displayAccessibility: boolean;
  color: string;
  parking: string[];
  accessibility: string[];
  dressCode: string[];
  brand: {
    id: number;
    name: string;
    description: string;
  };
  organization: {
    id: number;
    name: string;
  };
  safetyMeasures: string[];
  events: string[];
  services: string[];
  hoursOfOperation: [
    {
      day: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
      hour: number;
      mintute: number;
    }
  ];
  paymentOptions: string[];
  kitchenAttributes: string[];
  categories: string[];
  menus: [
    {
      id: number;
      name: string;
      isPrimary: boolean;
    }
  ];
  image?: Image;
  distance: number;
};
