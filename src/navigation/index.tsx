import React, { useEffect, useMemo } from 'react';
import { Animated, Dimensions, Easing, View } from 'react-native';
import { TabBarIcon } from '../components';

const {
  width: screenWidth
} = Dimensions.get('screen');

type TabItem = {
  icon: string;
  label: string;
  color?: string;
};

type Props = {
  items: TabItem[];
  selected: number;
  iconSize?: number;
  onSelected: (tabIndex: number) => void;
};

export const MainNavigator: React.FC<Props> = ({
  items,
  selected,
  iconSize = 30,
  onSelected
}) => {
  const padding = 15;
  const tabsAnimations = useMemo(() => items.map(() => new Animated.Value(0)), [items]);
  const maxItemWidth = useMemo(() => {
    return screenWidth - (iconSize + 30) * (items.length - 1) - (padding * 2);
  }, [items, screenWidth, iconSize, padding]);

  useEffect(() => {
    const animation = Animated.parallel(tabsAnimations.map((anim, animIdx) => Animated.timing(anim, {
      toValue: animIdx === selected ? 1 : 0,
      duration: 200,
      easing: Easing.linear
    })));

    animation.start();

    return () => {
      animation.stop();
    };
  }, [tabsAnimations, selected]);

  const tabs = useMemo(() => items.map((icon, idx) => {
    const handlePress = () => onSelected(idx);

    return (
      <TabBarIcon
        key={`tabBarIcon_${idx}`}
        animated={tabsAnimations[idx]}
        icon={icon.icon}
        label={icon.label}
        size={iconSize}
        maxWidth={maxItemWidth}
        color={icon.color}
        onPress={handlePress}
      />
    );
  }), [items, selected]);

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: padding,
        height: iconSize + 30 + padding * 2,
      }}
    >
      {tabs}
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
