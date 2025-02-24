import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

type ButtonProps = {
  text: string;
  onPress: () => void;
};

export default function Button({
  text,
  onPress,
}: ButtonProps): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {backgroundColor: (colors as any).backgroundInverted},
      ]}>
      <Text style={[styles.text, {color: colors.background}]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'inherit',
  },
  text: {
    fontStyle: 'normal',
  },
});
