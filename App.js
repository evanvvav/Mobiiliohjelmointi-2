import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, Button, TextInput, Image, Picker} from "react-native";


export default function App() {

  const [input, setInput] = useState('');
  const [exchangeRates, setExchangeRates] = useState([]);
  const [result, setResult] = useState('');
  const [currency, setCurrency] = useState("AED");
  const [pickerItem, setPickerItem] = useState([]);

  

    useEffect(() => {
    fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=ffb35a4692fdba9c4190856954c31082&format=1`)
    .then(response => response.json())
    .then((data) => {
      setExchangeRates(data.rates);
      setPickerItem(Object.keys(data.rates));
    });
      }, []);

  const getConverted  = () => {
    setResult(input / exchangeRates[currency].toFixed(2) + "€");
  };


   return (
    <SafeAreaView style={styles.main}>
    <Image source={{uri: 'https://thumb.mp-farm.com/49913001/preview.jpg'}}
             style={{width:200, height: 200}} />

      <Text style={styles.text}>Answer: {result} </Text>

      <TextInput style={styles.input} keyboardType="numeric" placeholder="value" onChangeText={ text => setInput(text) } 
      />
        <Picker
          selectedValue={currency}
          
          onValueChange={(itemValue) => setCurrency(itemValue)}
        >
          {pickerItem.map((item) => (
            <Picker.Item label={item} value={item} />
          ))}
        </Picker>
      
      <Button style={styles.button} title="Convert" onPress = {getConverted}/>

      
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
  input: {
    borderWidth: 1,
    width: 160,
    height: 30,
    margin: 1,
    backgroundColor: 'white',
    padding: 5,
    
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