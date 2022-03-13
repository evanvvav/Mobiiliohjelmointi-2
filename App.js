import { useState } from "react";
import { StyleSheet, SafeAreaView, TextInput, View, Button } from "react-native";
import * as Speech from 'expo-speech';

export default function App() {

  const [thingToSay, setThingToSay] = useState('');
  
  const speak = () => {
    Speech.speak(thingToSay);
  };

return (
  <SafeAreaView style={styles.main}>
    <TextInput style={styles.input}
      placehoolder='Press to hear some words'
      onChangeText={thingToSay => setThingToSay(thingToSay)}
      value={thingToSay}/>
    <Button title="PRESS TO HEAR TEXT" onPress={speak}/>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    width: 160,
    height: 30,
    margin: 1,
    backgroundColor: 'white',
  },
});