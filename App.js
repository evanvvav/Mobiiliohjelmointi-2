import { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, TextInput, FlatList, View} from 'react-native';
import * as SQLite from'expo-sqlite';
import { Header, Icon, Input, Button, ListItem } from'react-native-elements';


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
    <SafeAreaView>

    <Header centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff' } }}/>
  
    <Input 
      placeholder='Product' label='PRODUCT'
      onChangeText={product => setProduct(product)}
      value={product}/>
    <Input
      placeholder='Amount' label='AMOUNT'
      onChangeText={amount => setAmount(amount)}
      value={amount}/>

    <Button raised icon={{name: 'save'}} onPress={saveItem} title='SAVE'/>

    <FlatList
      
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) =>
        <ListItem bottomDivider>
          <ListItem.Content>
            <View style={{flexDirection: 'row'}}>
            <View>
            <ListItem.Title>{item.product}</ListItem.Title>
            <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>      
            </View>
            <Icon type="material" color='#FF0000' name="delete" onPress={() => deleteItem(item.id)} />
            </View>
          </ListItem.Content>
        </ListItem>}
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