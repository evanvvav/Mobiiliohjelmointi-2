import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, View, Button, FlatList, TextInput} from "react-native";

export default function App() {

  const [result, setResult] = useState(null);
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');

  const [history, setHistory] = useState([])

  const handlePlus = () => {
    setResult(parseInt(number1) + parseInt(number2));
    setHistory((list) => {
      return [
        {text: number1 + ' + ' + number2 + ' = ' + (parseInt(number1) + parseInt(number2)) },
        ...list
      ]
       
    });
  }

  const handleMinus = () => {
    setResult(parseInt(number1) - parseInt(number2));
    setHistory((list) => {
      return [
        {text: number1 + ' - ' + number2 + ' = ' + (parseInt(number1) - parseInt(number2)) },
        ...list
      ]
       
    });
  }

   return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.text}>Result: {result}</Text>
      <TextInput style={styles.input} keyboardType="numeric" 
      value={number1} onChangeText={(value) => setNumber1(value)}/>
      <TextInput style={styles.input} keyboardType="numeric" 
      value={number2} onChangeText={(value) => setNumber2(value)}/>
    <View style={styles.buttons}>
      <View style={styles.button}>
        <Button title="+" onPress={() => handlePlus()}/>
      </View>
      <View style={styles.button}>
        <Button title="-" onPress={() => handleMinus()}/>
      </View>
    </View>
    <Text style={styles.text}>History</Text>
    <View>
      <FlatList data={history} renderItem={({ item }) => (
        <Text style={styles.text}>{item.text}</Text>
      )}/>
    </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'silver',
  },
  text: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    width: 160,
    height: 30,
    margin: 1,
    backgroundColor: 'white',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '40%',
    margin: 4,
  },
  button: {
    width: 57,
  },
});