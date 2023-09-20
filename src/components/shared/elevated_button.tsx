import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppColors} from '../../styles';
import AppTextstyles from '../../styles/textstyles';

interface ButtonProps {
  label: string;
  child?: React.ReactNode;
  enabled?: boolean;
  onPressed: () => void;
  size?: number;
  padding?: {
    vertical: number;
    horizontal: number;
  };
}
const ElevatedButton = (props: ButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.onPressed}>
      <View
        style={[
          styles.container,
          props.enabled == false && styles.disabledContainer,
          props.size !== null && {width: props.size},
          props.padding != null && {
            paddingHorizontal: props.padding.horizontal,
            paddingVertical: props.padding.vertical,
          },
        ]}>
        {props.child ?? (
          <Text
            style={[
              styles.buttonText,
              props.enabled == false && styles.disabledButtonText,
            ]}>
            {props.label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ElevatedButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primary,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  buttonText: {
    ...AppTextstyles.bodyLargeMedium,
    color: 'white',
  },
  disabledContainer: {
    backgroundColor: AppColors.grey300,
  },
  disabledButtonText: {
    color: AppColors.grey100,
  },
});
