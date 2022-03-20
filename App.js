import { StyleSheet } from "react-native";
import { NavigationContainer } from'@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import HomeScreen from "./components/HomeScreen";
import HistoryScreen from "./components/HistoryScreen";

export default function App() {

  const Stack = createNativeStackNavigator();

   return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}