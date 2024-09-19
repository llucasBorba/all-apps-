
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ConsumirApi from '../service/ConsumirApi';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Palmeiras() {

const [quote, setQuote] = useState("");
const [author, setAuthor] = useState("");

const fetchQuote = async () => {
  try {
    const response = await ConsumirApi("https://stoic.tekloon.net/stoic-quote");
    setQuote(response.data.quote); 
    setAuthor(response.data.author); 

  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchQuote();
}, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{quote}</Text>
      <Text style={styles.title}>{author}</Text>

      <Pressable style={styles.button} onPress={fetchQuote}>
       <Ionicons name="sync" size={44} color={"black"}/>
        </Pressable>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'red',
    fontSize: 22, 
    fontWeight: 'bold'
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: 'red',
    position: "absolute",
    bottom: 0,
    margin: 80
  },
});
