export type CityType = {
  name: string;
  latitude: number;
  longitude: number;
};

export type DestinationType = Partial<CityType> & { id: string };
