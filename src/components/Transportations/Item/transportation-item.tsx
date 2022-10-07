import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { ITransportationItem } from "./transportation-item.types";
import store, { changeCoord, setIsLoading } from "../../../store/init";
import cn from "classnames";
import styles from "./transportation-item.module.scss";
import { ECoordinateType } from "../../../enum/coordinate-types";

export const TransportationItem = ({
  id,
  title,
  email,
  coordinates,
  selectedItem,
  setSelectedItem,
}: ITransportationItem) => {
  const { Option } = Select;
  const [selectedCoordinates, setSelectedCoordinates] = useState([
    { lat: "", lng: "" },
  ]);
  const [selectedCoordinatesUnloading, setSelectedCoordinatesUnloading] =
    useState([{ lat: "", lng: "" }]);
  const [addresses, setAddresses] = useState<
    { lat: number; lon: number; title: string }[]
  >([]);

  const handleChange = (value: string[]) => {
    if (id === selectedItem) {
      setSelectedCoordinates(
        value.map((item) => {
          return { lat: item.split("; ")[0], lng: item.split("; ")[1] };
        })
      );
    }
  };

  const handleChangeUnloading = (value: string[]) => {
    if (id === selectedItem) {
      setSelectedCoordinatesUnloading(
        value.map((item) => {
          return { lat: item.split("; ")[0], lng: item.split("; ")[1] };
        })
      );
    }
  };

  const isEmptySelectedCoordUnloading =
    selectedCoordinatesUnloading[0]?.lat === "" &&
    selectedCoordinatesUnloading[0]?.lng === "";

  const isEmptySelectedCoord =
    selectedCoordinates[0]?.lat === "" && selectedCoordinates[0]?.lng === "";

  const handleSelect = () => {
    if (isEmptySelectedCoordUnloading) {
      store.dispatch(
        changeCoord({
          type: ECoordinateType.SIMPLE,
          coord: selectedCoordinates,
        })
      );
    } else if (isEmptySelectedCoord) {
      store.dispatch(
        changeCoord({
          type: ECoordinateType.UNLOAD,
          coord: selectedCoordinatesUnloading,
        })
      );
    } else {
      store.dispatch(
        changeCoord([
          {
            type: ECoordinateType.UNLOAD,
            coord: [...selectedCoordinatesUnloading],
          },
          {
            type: ECoordinateType.SIMPLE,
            coord: [...selectedCoordinates],
          },
        ])
      );
    }
    setSelectedItem(id);
  };

  useEffect(() => {
    if (coordinates.length > 0) {
      store.dispatch(setIsLoading(true));
      new Promise((resolve) =>
        coordinates.forEach((item) => {
          fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${item.lat}&lon=${item.lng}&apiKey=a0b7947eac8a48b38ee06129f2cf757d`,
            {
              method: "GET",
            }
          )
            .then((response) => response.json())
            .then((result) => {
              setAddresses((prev) => {
                if (
                  prev.find(
                    (item) =>
                      item.lat === result.features[0].properties.lat &&
                      item.lon === result.features[0].properties.lon
                  )
                ) {
                  return [...prev];
                } else {
                  return [
                    ...prev,
                    {
                      lat: result.features[0].properties.lat,
                      lon: result.features[0].properties.lon,
                      title: result.features[0].properties.address_line2,
                    },
                  ];
                }
              });
              resolve("yes");
            })
            .catch((error) => console.log("error", error));
        })
      ).then(() => store.dispatch(setIsLoading(false)));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isEmptySelectedCoord || !isEmptySelectedCoordUnloading) {
      if (isEmptySelectedCoordUnloading) {
        store.dispatch(
          changeCoord({
            type: ECoordinateType.SIMPLE,
            coord: selectedCoordinates,
          })
        );
      } else if (isEmptySelectedCoord) {
        store.dispatch(
          changeCoord({
            type: ECoordinateType.UNLOAD,
            coord: selectedCoordinatesUnloading,
          })
        );
      } else {
        store.dispatch(
          changeCoord([
            {
              type: ECoordinateType.UNLOAD,
              coord: [...selectedCoordinatesUnloading],
            },
            {
              type: ECoordinateType.SIMPLE,
              coord: [...selectedCoordinates],
            },
          ])
        );
      }
    }
    // eslint-disable-next-line
  }, [selectedCoordinates, selectedCoordinatesUnloading]);

  return (
    <div
      className={cn(
        styles.container,
        selectedItem === id && styles["container_selected"]
      )}
      onClick={handleSelect}
    >
      <div className={styles["company-info"]}>
        <div className={styles["company-info__item"]}>
          <div className={styles["company-info__label"]}>Название компании</div>
          <div className={styles["company-info__title"]}>{title}</div>
        </div>
        <div className={styles["company-info__item"]}>
          <div className={styles["company-info__label"]}>Email компании</div>
          <div className={styles["company-info__title"]}>{email}</div>
        </div>
      </div>
      <div className={styles.select}>
        <div className={styles["select__item"]}>
          <span className={styles["select__label"]}>Точки погрузки</span>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Выберите координаты склада"
            onChange={(value) => handleChange(value)}
          >
            {addresses.map((item) => (
              <Option key={`${item.lat}; ${item.lon}`}>{item.title}</Option>
            ))}
          </Select>
        </div>
        <div className={styles["select__item"]}>
          <span className={styles["select__label"]}>Точки разгрузки</span>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Выберите координаты склада"
            onChange={(value) => handleChangeUnloading(value)}
          >
            {addresses.map((item) => (
              <Option key={`${item.lat}; ${item.lon}`}>{item.title}</Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};
