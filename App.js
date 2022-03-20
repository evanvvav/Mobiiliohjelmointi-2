import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, View, Button,} from "react-native";
import { FlatList, TextInput } from "react-native-web";


export default function App() {

    const [text, setText] = useState('');
    const [data, setData] = useState([]);


    const handlePressed = () => {
      setData([...data, {key: text}]);
      setText('');
      console.log(data);
    }

    const hanldeDelete = () => {
      setData([]);
    }
  

   return (
    <SafeAreaView style={styles.main}>  
      <TextInput style={styles.input} placeholder="shopping list..."
      value={text} onChangeText={(text) => setText(text)}/>

        <View style={styles.buttons}>
     <View style={styles.button}>
        <Button title="ADD" onPress={() => handlePressed()}/>
      </View>
      <View style={styles.button}>
        <Button title="CLEAR" onPress={() => hanldeDelete()}/>
      </View>
    </View>

    <FlatList 
      data={data}
      renderItem={({item}) => <Text >{item.key}</Text>}

      keyExtractor={(item, index) => index.toString()}
    />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 70,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
  },
  input: {
    borderBottomWidth: 1,
    width: 200,
    height: 30,
    margin: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '40%',
    margin: 4,
    paddingTop: 10,
  },
  button: {
    width: 65,
  },
});