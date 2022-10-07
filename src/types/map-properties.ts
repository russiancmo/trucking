export type TCoordinates = {
  lat: number;
  lng: number;
};

export type TMapProperties = {
  center: TCoordinates;
  zoom: number;
  scrollWheelZoom: boolean;
  tileLayer: string;
};
