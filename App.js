import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, View, Button, TextInput, FlatList, Alert, Image } from "react-native";
import * as Contacts from 'expo-contacts';

export default function App() {

const [contacts, setContacts] = useState([]);
const [currentContact, setCurrentContact] = useState({});

const getContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync(
      { fields: [Contacts.Fields.PhoneNumbers] }
      );

      setContacts(data);
      if (data.length > 0) {
        setCurrentContact(data[0]);
        console.log(data[0]);
        
      }
    }
  }

return (
  <SafeAreaView style={styles.main}>
    <FlatList 
            data={contacts}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
                <Text>{item.phoneNumbers &&
                        item.phoneNumbers[0] &&
                        item.phoneNumbers[0].number}</Text>

              </View>
              )}
              keyExtractor={(item) => item.id}/>

    
    <Button title="Get Contact" onPress = { getContacts } />

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
    width: 300,
    height: 30,
    margin: 1,
    backgroundColor: 'white',
  },
});