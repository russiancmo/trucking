import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { MapProperties } from "../../constants/transportations";
import RoutingMachine from "../../services/routing-machine";
import { TCoordinates } from "../../types/map-properties";
import { TTransportationList } from "../../types/transportation-list";
import { Loading } from "../Loading/loading";
import { TransportationList } from "./List/transportation-list";
import cn from "classnames";
import styles from "./transportation.module.scss";

export const coordinatesList: TCoordinates[] = [
  { lat: 54.751244, lng: 36.618423 },
  { lat: 57.751244, lng: 38.618423 },
  { lat: 58.751244, lng: 39.618423 },
  { lat: 62.751244, lng: 31.618423 },
  { lat: 61.751244, lng: 32.618423 },
  { lat: 60.751244, lng: 36.618423 },
  { lat: 50.751244, lng: 42.618423 },
  { lat: 53.751244, lng: 44.618423 },
  { lat: 51.151244, lng: 42.118423 },
  { lat: 52.551244, lng: 41.618423 },
];

//в задании нужен список координат, но по логике точке погрузки должны соответствовать точки разгрузки.
const transportationList: TTransportationList[] = [
  {
    shipment: {
      companyInfo: {
        title: "CDEK",
        email: "example@mail.ru",
      },
      coordinates: { lat: 55.751244, lng: 37.618423 },
    },
    // unloading: {
    //   coordinates: [
    //     { lat: 54.751244, lng: 36.618423 },
    //     { lat: 57.751244, lng: 38.618423 },
    //     { lat: 58.751244, lng: 39.618423 },
    //   ],
    // },
  },
  {
    shipment: {
      companyInfo: {
        title: "Yandex",
        email: "example1@mail.ru",
      },
      coordinates: { lat: 62.751244, lng: 31.618423 },
    },
    // unloading: {
    //   coordinates: [
    //     { lat: 62.751244, lng: 31.618423 },
    //     { lat: 61.751244, lng: 32.618423 },
    //     { lat: 60.751244, lng: 36.618423 },
    //   ],
    // },
  },
  {
    shipment: {
      companyInfo: {
        title: "Sber",
        email: "example2@mail.ru",
      },
      coordinates: { lat: 51.751244, lng: 41.618423 },
    },
    // unloading: {
    //   coordinates: [
    //     { lat: 50.751244, lng: 42.618423 },
    //     { lat: 53.751244, lng: 44.618423 },
    //     { lat: 51.151244, lng: 42.118423 },
    //     { lat: 52.551244, lng: 41.618423 },
    //   ],
    // },
  },
];

export const Transportation = () => {
  const rMachine = useRef();
  const ResizableRef = useRef<HTMLDivElement>(null);

  const [initialPos, setInitialPos] = React.useState<number>(0);
  const [initialSize, setInitialSize] = React.useState<number>(0);

  const initial = (e: any) => {
    const resizable = ResizableRef.current;

    setInitialPos(e.clientX);
    setInitialSize((resizable as HTMLDivElement).offsetWidth);
  };

  const resize = (e: any) => {
    const resizable = ResizableRef.current;

    (resizable as HTMLDivElement).style.width = `${
      initialSize + e.clientX - initialPos
    }px`;
  };

  const wayPoints = useSelector((state: any) => {
    return state.coordinates;
  });

  const isLoading = useSelector((state: any) => {
    return state.isLoading;
  });

  useEffect(() => {
    if (rMachine.current) {
      (rMachine as any).current.setWaypoints(
        Array.isArray(wayPoints)
          ? [...(wayPoints[0]?.coord ?? []), ...(wayPoints[1]?.coord ?? [])]
          : [...(wayPoints?.coord ?? [])]
      );
    }
  }, [wayPoints, rMachine]);

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Модуль грузоперевозок 1.0.0</h1>
      <div
        className={cn(
          styles.container,
          isLoading && styles["container_loading"]
        )}
      >
        <div className={styles.info} ref={ResizableRef}>
          <TransportationList
            items={transportationList}
            coordinatesList={coordinatesList}
          />
        </div>
        <div
          className={styles.resizable}
          draggable="true"
          onDragStart={initial}
          onDrag={resize}
        />
        <MapContainer
          center={{
            lat: MapProperties.center.lat,
            lng: MapProperties.center.lng,
          }}
          zoom={MapProperties.zoom}
          scrollWheelZoom={MapProperties.scrollWheelZoom}
          className={styles.map}
        >
          <TileLayer url={MapProperties.tileLayer} />
          <RoutingMachine
            ref={rMachine}
            waypoints={wayPoints}
            key={JSON.stringify(wayPoints)}
          />
        </MapContainer>
      </div>
      <div className={styles.copyright}>
        <span>Made by Loboda Igor - For free using</span>
      </div>
      {isLoading && <Loading absolute />}
    </section>
  );
};
