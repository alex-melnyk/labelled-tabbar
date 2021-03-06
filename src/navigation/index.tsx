import React, { useEffect, useMemo } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native';
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
      style={[styles.container, {
        padding: padding,
        height: iconSize + 30 + padding * 2,
      }]}
    >
      {tabs}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  }
});
