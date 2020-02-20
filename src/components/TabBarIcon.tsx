import React, { useMemo } from 'react';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

type Props = {
  animated: Animated.Value;
  icon: string;
  label: string;
  size: number;
  maxWidth: number;
  color?: string;
  onPress: () => void;
};

export const TabBarIcon: React.FC<Props> = ({
  animated,
  icon,
  label,
  size,
  maxWidth,
  color = '#333333',
  onPress
}) => {
  const padding = 15;

  const minSize = useMemo(() => size + padding * 2, [size]);
  const fontSize = useMemo(() => size * 0.666666667, [size]);

  const secondaryColor = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [`#00000000`, `${color}1F`]
  });

  const primaryColor = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['#333333FF', color]
  });

  const width = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxWidth - 60]
  });

  const opacity = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const translate = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, 0]
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={{
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: minSize,
        minWidth: minSize,
        maxWidth: maxWidth,
        backgroundColor: secondaryColor,
        borderRadius: minSize / 2,
        padding: padding
      }}>
        <View style={{
          width: size,
          height: size,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <AnimatedIcon
            name={icon}
            size={size - 5}
            style={{
              color: primaryColor
            }}
          />
        </View>
        <Animated.Text
          numberOfLines={1}
          style={{
            fontSize,
            opacity,
            width,
            color: primaryColor,
            transform: [
              { translateX: translate }
            ]
          }}
          ellipsizeMode="clip"
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
