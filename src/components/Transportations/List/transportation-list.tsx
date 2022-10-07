import React, { useState } from "react";
import { TransportationItem } from "../Item/transportation-item";
import { ITransportationList } from "./transportation-list.types";
import styles from "./transportation-list.module.scss";

export const TransportationList = ({
  items,
  coordinatesList,
}: ITransportationList) => {
  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <div className={styles.container}>
      {items.map((data, index) => (
        <TransportationItem
          title={data.shipment.companyInfo.title}
          email={data.shipment.companyInfo.email}
          coordinates={coordinatesList}
          id={index}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          key={index}
        />
      ))}
    </div>
  );
};
