"use client";

import { Button } from "react-native-paper";
import styles from "../styles/index.module.css";

export default function Web() {
  return (
    <div className={styles.container}>
      <h1>Web</h1>
      <Button mode="contained" onPress={() => alert("Hello")}>
        Press me
      </Button>
    </div>
  );
}
