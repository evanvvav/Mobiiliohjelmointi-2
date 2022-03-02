import { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, Button, TextInput, FlatList, View} from 'react-native';
import * as SQLite from'expo-sqlite';

export default function App() {

const [amount, setAmount] = useState('');
const [product, setProduct] = useState('');
const [cart, setCart] = useState([]);

const db = SQLite.openDatabase('cartdb.db');

useEffect(() => {
  db.transaction(tx => {
    tx.executeSql('create table if not exists cart (id integer primary key not null, amount text, product text);');
    }, null, updateList);
    }, []);

const saveItem = () => {
  db.transaction(tx => {
     tx.executeSql('insert into cart (amount, product) values (?, ?);',
      [amount, product]);
    }, null, updateList);
    }

const updateList = () => {
  db.transaction(tx => {
    tx.executeSql('select * from cart;', [], (_, { rows }) => setCart(rows._array)); 
    }, null, null);
    }

const deleteItem = (id) => {
  db.transaction( tx => {
    tx.executeSql('delete from cart where id = ?;',[id]);
    }, null, updateList);
    }


  return (
    <SafeAreaView style={styles.main}>
      <Text>Shopping list</Text>
    <TextInput style={styles.input}
      placehoolder='Product'
      onChangeText={product => setProduct(product)}
      value={product}/>
    <TextInput style={styles.input}
      placehoolder='Amount'
      onChangeText={amount => setAmount(amount)}
      value={amount}/>
    <Button onPress={saveItem} title='Save'/>
    <FlatList
      style={{marginLeft: '5%'}}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) =>
        <View>
          <Text>{item.product},{item.amount}</Text>
          <Text style={{color: '#0000ff'}} onPress={() => deleteItem(item.id)}>bought</Text>
        </View>}
      data={cart}/>
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