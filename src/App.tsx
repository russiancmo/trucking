import React from "react";
import { Transportation } from "./components/Transportations/transportation";
import { Provider } from "react-redux";
import store from "./store/init";
import styles from "./App.module.scss";
import "antd/dist/antd.min.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className={styles.container}>
        <Transportation />
      </div>
    </Provider>
  );
}

export default App;
