import { TCoordinates } from "../../../types/map-properties";

export interface ITransportationItem {
  id: number;
  title: string;
  email: string;
  coordinates: TCoordinates[];
  selectedItem: number;
  setSelectedItem: (num: number) => void;
}
