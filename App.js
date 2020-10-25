import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import RNSoundLevel from 'react-native-sound-level';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontFamily: 'Lato',
    fontSize: 200,
    color: 'red',
  },
  button: {
    width: "80%",
    height: "5%",
    margin: 50,
  }
});

const THRESHOLD=25000;
const MIN_CUTOFF=10;

export default class App extends React.Component {
  state = {
    counter: 0,
    lastId: 0
  }
  componentDidMount() {
    RNSoundLevel.start()
    RNSoundLevel.onNewFrame = (data) => {
      const {rawValue, id} = data;
      const {counter, lastId} = this.state;
      if ((rawValue > THRESHOLD) && ((id - lastId >= MIN_CUTOFF) || lastId === 0) ){
          this.setState({counter:counter+1, lastId:id});
      }
    }
  }
  
  // don't forget to stop it
  componentWillUnmount() {
    RNSoundLevel.stop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.number}>{this.state.counter}</Text>
        <View style={styles.button}>
        <Button
          title="Reset"
          onPress={() => this.setState({counter:0, lastId:0})}
        />
        </View>
      </View>
    );
  }
}
