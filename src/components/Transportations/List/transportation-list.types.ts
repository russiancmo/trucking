import { TCoordinates } from "../../../types/map-properties";
import { TTransportationList } from "../../../types/transportation-list";

export interface ITransportationList {
  items: TTransportationList[];
  coordinatesList: TCoordinates[];
}
