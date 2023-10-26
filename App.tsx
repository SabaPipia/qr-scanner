import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import {
  BarCodeScanner,
  BarCodeScannerResult,
  PermissionResponse,
} from "expo-barcode-scanner";

export default function App() {
  const [hasPermission, setHasPermission] = useState<
    PermissionResponse | null | boolean
  >(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<string>("");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = (result: BarCodeScannerResult) => {
    const { data } = result;
    setScanned(true);
    setScannedData(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.cameraContainer}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
      <View>
        {hasPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : null}
        <View style={styles.scannedData}>
          <Text style={{ fontSize: 30 }}>&darr; Scanned Data &darr; </Text>
          <Text style={{ fontSize: 30, color: "red" }}>{scannedData}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  cameraContainer: {
    flex: 0.5,
  },
  scannedData: {
    marginTop: 10,
    alignItems: "center",
  },
});
