import React, { useEffect, useMemo } from 'react';
import { Animated, Dimensions, Easing, TouchableWithoutFeedback, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const {
  width: screenWidth
} = Dimensions.get('screen');

type Props = {
  animated: Animated.Value;
  icon: string;
  label: string;
  active?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  onPress: () => void;
};

export const TabBarIcon: React.FC<Props> = ({
  animated,
  icon,
  label,
  active,
  primaryColor = '#333333',
  secondaryColor = '#EEEEEE',
  onPress
}) => {
  const maxWidth = useMemo(() => screenWidth - 60 * 3 - 40, []);

  const bg = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [`${secondaryColor}00`, secondaryColor]
  });

  const width = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxWidth - 60]
  });

  const opacity = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={{
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        minWidth: 60,
        maxWidth: maxWidth,
        overflow: 'hidden',
        backgroundColor: bg,
        borderRadius: 30,
        padding: 15
      }}>
        <View style={{
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FontAwesome
            name={icon}
            size={25}
            color={active ? primaryColor : '#333333'}
          />
        </View>
        <Animated.Text
          style={{
            opacity,
            width,
            color: primaryColor,
            fontSize: 20
          }}
          ellipsizeMode="clip"
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
