import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Home() {
  const [tempo, setTempo] = useState(0); 
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    let intervalo = null;

    if (ativo) {
      intervalo = setInterval(() => {
        setTempo((tempo) => tempo + 1); // Incrementa a cada 10ms
      }, 1000); // Atualiza a cada 10ms
    } else if (!ativo && tempo !== 0) {
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [ativo, tempo]);

  const iniciar = () => {
    setAtivo(true);
  };

  const pausar = () => {
    setAtivo(false);
  };

  const resetar = () => {
    setAtivo(false);
    setTempo(0);
  };

  const formatarTempo = (tempo) => {
    const min = Math.floor((tempo % 60000) / 1000); // Converte o restante em segundos
    const segundos = tempo % 1000; // O restante são milissegundos
    return `${min}.${segundos}`;
  };
  
  return (
    <View style={styles.container}>

    <View style={styles.circle}>
      <Text style={styles.title}>{formatarTempo(tempo)}</Text>
     </View>
     

     <View style={styles.buttons}> 

      <Pressable style={styles.button} onPress={iniciar}>
      <Ionicons name="play-outline" size={45} color={"black"}/>
      </Pressable>

      <Pressable style={styles.button} onPress={pausar}> 
      <Ionicons name="pause-outline" size={45} color={"black"}/>
      </Pressable>

      <Pressable style={styles.button} onPress={resetar}> 
      <Ionicons name="sync-outline" size={45} color={"black"}/>
      </Pressable>

     </View>

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
    fontSize: 30, 
    fontWeight: 'bold',
  
  },
  circle: { 
    borderRadius: 200,
    borderColor: "black", 
    borderWidth: 5,
    height: 250,
    width: 250,
    alignItems: "center", 
    justifyContent: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 35,
    elevation: 3,
    backgroundColor: 'white',
    borderColor:"black",
  },
  buttons: {
    flexDirection: "row", 
    margin: 40,
    gap: 25,
    position: "absolute",
    bottom: 0,
  }
});
