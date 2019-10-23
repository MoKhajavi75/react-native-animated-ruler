import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Ruler from './src/Ruler';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#000000' barStyle='light-content' />

      <View style={styles.sections}>
        <Text style={styles.title}>React Native Animated Ruler!</Text>
      </View>

      <View style={styles.sections}>
        <Ruler
          style={{ borderRadius: 10, elevation: 3 }}
          width={350}
          height={170}
          onChangeValue={value => alert(value)}
          minimum={10}
          maximum={80}
          segmentWidth={2}
          segmentSpacing={20}
          indicatorColor='red'
          indicatorWidth={100}
          indicatorHeight={80}
          indicatorBottom={20}
          step={10}
          stepColor='#333333'
          stepHeight={40}
          normalColor='#999999'
          normalHeight={20}
          backgroundColor='#ffffff'
          numberFontFamily='System'
          numberSize={40}
          numberColor='#000000'
          unit='cm'
          unitBottom={20}
          unitFontFamily='System'
          unitColor='#888888'
          unitSize={16}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF'
  },

  sections: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontSize: 25,
    color: 'black'
  }
});

export default App;
