import React, {useState,useEffect} from 'react';
import { Image, FlatList, StatusBar, Text, TextInput, View} from 'react-native';

// Create a new variable called originalData
let originalData = [];

const App = () => {
    const[myData, setMyData] = useState([]);

// Exercise 1B - useEffect()
    useEffect(() => {
        // Exercise 1A - Add fetch()
        const myURL = "https://onlinecardappwebservice-wvmj.onrender.com/allcards"
        fetch(myURL)
            .then((response) => {
                return response.json();
            })
            .then((myJSON) => {
                setMyData(myJSON);
                originalData = myJSON;
            })
    }, []);

    const FilterData = (text) => {
        if(text!='') {
            text = text.toLowerCase()
            let myFilteredData = originalData.filter((item)=>
                item.card_name.toLowerCase().includes(text))
            setMyData(myFilteredData);
        }
        else {
            setMyData(originalData)
        }
    }
  const renderItem = ({item, index}) => {




    return (
    <View style={{borderWidth:1,margin:5,padding:5,flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',alignContent:'center'}}>
    <Text style={{flex:1,textAlign:'left'}}>{item.card_name}</Text>
    <Image source={{uri:item.card_pic}} style={{flex:1,height:200,resizeMode:'contain'}} />
    </View>
    );
  };

  return (
    <View>
      <StatusBar/>
      <Text>Search:</Text>
      <TextInput style={{borderWidth:1}} onChangeText={(text)=>{FilterData(text)}}/>
      <FlatList data={myData} renderItem={renderItem} />
    </View>
  );
}

export default App;
