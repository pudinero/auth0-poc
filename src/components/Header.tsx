import {useNavigation, useTheme} from '@react-navigation/core';
import React, {Fragment} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowLeftIcon from '../icons/ArrowLeft.svg';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
};

export default function Header({
  title,
  showBackButton = false,
}: HeaderProps): React.JSX.Element {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <Fragment>
      <StatusBar backgroundColor={(colors as any).header} />
      <SafeAreaView
        style={[
          styles.headerSafeAreaView,
          {
            backgroundColor: (colors as any).header,
          },
        ]}
      />
      <SafeAreaView
        style={[
          styles.header,
          {
            backgroundColor: (colors as any).header,
          },
        ]}>
        <View
          style={[
            styles.header,
            {
              backgroundColor: (colors as any).header,
            },
          ]}>
          {showBackButton && (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <ArrowLeftIcon
                width={30}
                height={30}
                color={(colors as any).white}
                preserveAspectRatio="true"
              />
            </TouchableOpacity>
          )}
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  headerSafeAreaView: {
    flex: 0,
  },
  header: {
    flex: 1,
    maxHeight: 55,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000000',
    gap: 10,
    paddingHorizontal: Platform.OS === 'ios' ? 15 : 5,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5.62,
    elevation: 2,
    zIndex: 1,
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: '#fafafa',
  },
});
