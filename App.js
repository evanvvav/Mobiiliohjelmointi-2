import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, View, Button, FlatList, Image } from "react-native";

export default function getRavintolatData() {

const [ravintolat, setRavintolat] = useState([]);

useEffect(() => {

fetch("https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=60.183832598&longitude=24.942829562&limit=10&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "travel-advisor.p.rapidapi.com",
		"x-rapidapi-key": "25a22228abmshe90e31e943b8facp153abfjsn326786a3036f"
	}
})

.then(response => response.json())
.then(data => setRavintolat(data.data)) 
.catch(err => {
	console.error(err);
 });
      }, []);


return (
 <SafeAreaView>
   <FlatList 
      keyExtractor={(item, index) => index.toString()}
      data={ravintolat}
      renderItem={({ item }) => (
        <View>
          <Text>{item.name}</Text>

          <Text>{item.address}</Text>

          <Text>{item.address_obj &&
          item.address_obj.street1}</Text>

          <Text>{item.photo && 
          item.photo.id}</Text>

          <Text>{item.photo && 
          item.photo.images.original.url}</Text>

          <Image source={{uri: item.photo && 
          item.photo.images.original.url}}
          style={{width:200, height: 200}} />

          <Text>
            
          </Text>

        </View>
       )}
      />


 </SafeAreaView>
);

}