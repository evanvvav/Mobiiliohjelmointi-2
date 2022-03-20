import { StyleSheet, SafeAreaView, Text, View, Button, FlatList, TextInput} from "react-native";
import { createNativeStackNavigator } from'@react-navigation/native-stack';

export default function HistoryScreen({ route }) {

  const Stack = createNativeStackNavigator();

  const { history } = route.params;

   return (
    <SafeAreaView style={styles.main}>
        <Text style={styles.text}>History</Text>
        <View>
            <FlatList 
            data={history}
            renderItem={({item}) => (<Text style={styles.text}>{item.text}</Text>
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