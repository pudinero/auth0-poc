import React, {Fragment} from 'react';
import {
  StyleSheet,
  Text,
  ViewStyle,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {useTheme} from '@react-navigation/core';

type CardProps = {
  title: string;
  subtitle: string;
  onPress: () => void;
  icon: React.FC<SvgProps>;
  style?: ViewStyle;
};

export default function Card({
  title,
  subtitle,
  onPress,
  icon: CustomIcon,
}: CardProps): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <Fragment>
      <TouchableOpacity
        style={[
          styles.container,
          {backgroundColor: (colors as any).cardBackground},
        ]}
        onPress={onPress}>
        <View
          style={[
            styles.image,
            {backgroundColor: (colors as any).cardIconBackground},
          ]}>
          <CustomIcon
            width={'50%'}
            height={'150%'}
            color={(colors as any).cardIcon}
            style={styles.svg}
            preserveAspectRatio="true"
          />
        </View>
        <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
        <Text style={[styles.subtitle, {color: colors.text}]}>{subtitle}</Text>
      </TouchableOpacity>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  svg: {
    display: 'flex',
    transform: [{rotate: '-30deg'}],
    marginTop: -37.5,
    alignSelf: 'flex-end',
  },
  image: {
    overflow: 'hidden',
    backgroundColor: '#333',
    height: 150,
    maxHeight: 150,
    borderRadius: 5,
    marginBottom: 7.5,
  },
  container: {
    borderRadius: 8,
    padding: 15,
    gap: Platform.OS === 'ios' ? 5 : 1.75,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    fontWeight: 'regular',
    fontSize: 15,
    opacity: 0.75,
  },
});
