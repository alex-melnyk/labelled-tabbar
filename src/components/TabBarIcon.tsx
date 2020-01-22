import React, { useMemo } from 'react';
import { Animated, Dimensions, TouchableWithoutFeedback, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

const {
  width: screenWidth
} = Dimensions.get('screen');

type Props = {
  animated: Animated.Value;
  icon: string;
  label: string;
  color?: string;
  onPress: () => void;
};

export const TabBarIcon: React.FC<Props> = ({
  animated,
  icon,
  label,
  color = '#333333',
  onPress
}) => {
  const maxWidth = useMemo(() => screenWidth - 60 * 3 - 40, []);

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
        backgroundColor: secondaryColor,
        borderRadius: 30,
        padding: 15
      }}>
        <View style={{
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <AnimatedIcon
            name={icon}
            size={25}
            style={{
              color: primaryColor
            }}
          />
        </View>
        <Animated.Text
          style={{
            fontSize: 20,
            opacity,
            width,
            color: primaryColor
          }}
          ellipsizeMode="clip"
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
