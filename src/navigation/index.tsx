import React, { useMemo, useState } from 'react';
import { Animated, View } from 'react-native';
import { TabBarIcon } from '../components';

const icons = [
  { icon: 'home', label: 'Home', color: '#FF9B00' },
  { icon: 'heart', label: 'Likes', color: '#00FF9B' },
  { icon: 'search', label: 'Search', color: '#9B00FF' },
  { icon: 'user', label: 'Profile', color: '#9BFF00' },
];

export const MainNavigator: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const tabsAnimations = useMemo(() => icons.map(() => new Animated.Value(0)), []);

  const tabs = useMemo(() => icons.map((icon, idx) => {
    const handlePress = () => {
      setSelected(idx);

      const animations = tabsAnimations.map((anim, animIdx) => Animated.timing(anim, {
        toValue: animIdx === idx ? 1 : 0,
        duration: 1000
      }));

      Animated.parallel(animations).start();
    };

    return (
      <TabBarIcon
        key={`tabBarIcon_${idx}`}
        animated={tabsAnimations[idx]}
        icon={icon.icon}
        label={icon.label}
        active={idx === selected}
        onPress={handlePress}
      />
    );
  }), [selected]);

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        padding: 20,
        width: '100%',
        height: 100,
        flexDirection: 'row',
        backgroundColor: 'white'
      }}
    >
      <View style={{
        flex: 1,
        flexDirection: 'row'
      }}>
        {tabs}
      </View>
    </View>
  );
};

const styles = {
  itemContainer: {
    // flex: 1,
    flexGrow: 1,
    minWidth: '5%',
    maxWidth: '85%'
  },
  item1: {
    backgroundColor: "#009BFF"
  },
  item2: {
    backgroundColor: "#FF009B"
  },
  item3: {
    backgroundColor: "#9BFF00"
  },
  item4: {
    backgroundColor: "#FF9B00"
  },
};
