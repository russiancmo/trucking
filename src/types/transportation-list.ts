import { TCoordinates } from "./map-properties";

export type TCompanyInfo = {
  title: string;
  email: string;
};

export type TTransportationList = {
  shipment: {
    companyInfo: TCompanyInfo;
    coordinates: TCoordinates;
  };
//   unloading: {
//     coordinates: TCoordinates[];
//   };
};
