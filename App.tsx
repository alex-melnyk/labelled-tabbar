import React, { useCallback, useMemo, useState } from 'react';
import { Animated } from 'react-native';
import { MainNavigator } from './src/navigation';

const items = [
  { icon: 'home', label: 'Home', color: '#553DB0' },
  { icon: 'heart', label: 'Likes', color: '#BA4699' },
  { icon: 'search', label: 'Search', color: '#DDAA40' },
  { icon: 'user', label: 'Profile', color: '#4392A5' },
];

const App: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const animated = useMemo(() => new Animated.Value(selected), []);

  const handleTabSelected = useCallback((tabIndex: number) => {
    setSelected(tabIndex);

    Animated.timing(animated, {
      toValue: tabIndex,
      duration: 200
    }).start();
  }, []);

  const backgroundColor = animated.interpolate({
    inputRange: Object.keys(items).map((k) => +k),
    outputRange: Object.values(items).map((item) => item.color)
  });

  return (
    <Animated.View style={{
      flex: 1,
      backgroundColor
    }}>
      <MainNavigator
        items={items}
        selected={selected}
        onSelected={handleTabSelected}
      />
    </Animated.View>
  );
};

export default App;
