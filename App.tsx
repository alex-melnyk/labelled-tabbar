import React from 'react';
import { View } from 'react-native';
import { MainNavigator } from './src/navigation';

const App: React.FC = () => {

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#EFEFEF'
    }}>
      <MainNavigator />
    </View>
  );
};

export default App;
