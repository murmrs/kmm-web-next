export type LocationSearchResult = {
  action: "getAll";
  entityType: "LocationFullResponse";
  message: "Entities retrieved";
  page: number; // See page parameter above
  totalPages: number; // The total number of pages
  numberOfEntities: number; // The number of entities for this page
  totalEntities: number; // The total number of entities across all pages
  entities: LocationResult[];
};

export type Image = {
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

export type LocationResult = {
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
  cuisine: string[];
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
  hoursOfOperation: {
    day: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
    open: { hour: number; minute: number };
    closed: { hour: number; minute: number };
  }[];
  paymentOptions: string[];
  kitchenAttributes: string[];
  categories: string[];
  menus: {
    id: number;
    name: string;
    isPrimary: boolean;
  }[];
  image?: Image;
  distance: number;
};

export type SummaryResult = {
  action: "getSummary";
  entityType: "LocationSummaryResponse";
  message: "Entity retrieved";
  entity: LocationSummary;
};

export type LocationSummary = {
  menus: MenuSummary[];
  dishes: DishSummary[];
};

export type MenuSummary = {
  id: number;
  name: string;
  isPrimary: boolean;
  daps: DapSummary[];
};

export type DapSummary = {
  name: string;
  nonOptionalCount: number;
  optionalCount: number;
};

export type DishSummary = {};
