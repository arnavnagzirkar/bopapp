import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import TinderCards from '@/components/TinderCards';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
      <Text style={{color: "#97E16B"}}>Journey</Text>
      Match
    </Text>
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TinderCards />
    <TouchableOpacity style={styles.stickyButton}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  separator: {
    alignSelf: 'center',
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  stickyButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#97E16B',
    padding: 10,
    borderRadius: "50%",
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    verticalAlign: 'middle',
  },
  buttonText: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
    verticalAlign: 'middle',
    marginBottom:"25%",
  },
  link: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
