import { useEffect, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, SafeAreaView, Dimensions, Text, TextInput, Button, } from 'react-native';
import * as Location from 'expo-location';


export default function App() {

  const [keyword, setKeyword] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitudee] = useState('');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);



  const getRepositories = () => {
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=hEBVB55W9DZZTFs8MHGY1clRvs6TJAcS&location=${keyword.replace(/ /g, '')}`)
      .then(response => response.json())
      .then((data) => {
        setLatitude(data.results[0].locations[0].latLng.lat);
        setLongitudee(data.results[0].locations[0].latLng.lng);

      });
  }


  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.text}>Find Adress </Text>

      <TextInput style={styles.input} onChangeText={text => setKeyword(text)} />
      <Button title="Find" onPress={getRepositories} />
      <MapView
        style={styles.map} >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude
          }}
          title='Haaga-Helia' />

      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  main: {
    paddingTop: 100,
    flex: 1,

    alignItems: 'center',
    backgroundColor: 'white',
  },

  text: {
    fontSize: 18,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  input: {
    borderBottomWidth: 1,
    width: 300,
    height: 30,
    margin: 1,
    backgroundColor: 'white',
  },
  button: {
    width: 57,
  },
});
