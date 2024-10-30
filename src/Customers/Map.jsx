import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";

const Map = () => {
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Location permission is needed to run this app."
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setSelectedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      try {
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        const place = reverseGeocode[0];
        const placeName = place.formattedAddress;

        setSelectedLocationName(placeName);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    try {
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const place = reverseGeocode[0];
      const placeName = place.formattedAddress;

      setSelectedLocationName(placeName);
      Alert.alert("Selected Location", `Place: ${placeName}`);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch location name.");
    }
  };

  if (!location) return null;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={location}
        onPress={handleMapPress}
        showsUserLocation
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title={selectedLocationName || "Selected Location"}
          />
        )}
      </MapView>
      <View>
        <Button
          buttonStyle={styles.placeOrderButton}
          containerStyle={styles.buttonContainer}
          title="Confirm Location"
          onPress={() => {
            if (selectedLocationName) {
              navigation.navigate("Checkout", {
                selectedLocationName,
              });
            } else {
              Alert.alert(
                "Select Location",
                "Please select a location on the map."
              );
            }
          }}
        />
      </View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  placeOrderButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
});
