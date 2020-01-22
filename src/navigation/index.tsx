import React, { useEffect, useMemo, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import { TabBarIcon } from '../components';

type TabItem = {
  icon: string;
  label: string;
  color?: string;
};

type Props = {
  items: TabItem[];
  selected: number;
  onSelected: (tabIndex: number) => void;
};

export const MainNavigator: React.FC<Props> = ({ items, selected, onSelected }) => {
  const tabsAnimations = useMemo(() => items.map(() => new Animated.Value(0)), []);

  useEffect(() => {
    const animations = tabsAnimations.map((anim, animIdx) => Animated.timing(anim, {
      toValue: animIdx === selected ? 1 : 0,
      duration: 200,
      easing: Easing.linear
    }));

    Animated.parallel(animations).start();
  }, [tabsAnimations, selected]);

  const tabs = useMemo(() => items.map((icon, idx) => {
    const handlePress = () => {
      onSelected(idx);
    };

    return (
      <TabBarIcon
        key={`tabBarIcon_${idx}`}
        animated={tabsAnimations[idx]}
        icon={icon.icon}
        label={icon.label}
        color={icon.color}
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
