import React, {useState} from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {AppColors} from '../../styles';
import AppTextstyles from '../../styles/textstyles';

interface InputFieldProps {
  label: string;
  value?: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  errorMessage?: string;
  defaultValue?: string;
  keyboardType?: KeyboardTypeOptions;
}

export const InputField = (props: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View>
      <Text style={[styles.label, isFocused && styles.labelFocused]}>
        {props.label}
      </Text>
      <TextInput
        style={[
          styles.inputField,
          props.errorMessage != null &&
            props.errorMessage.length !== 0 &&
            styles.inputFieldError,
          isFocused && styles.inputFieldFocused,
        ]}
        defaultValue={props.defaultValue}
        onChangeText={props.onChangeText}
        value={props.value}
        cursorColor={AppColors.secondary}
        selectionColor={AppColors.secondary}
        secureTextEntry={props.secureTextEntry}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType={props.keyboardType}
      />
      {props.errorMessage != null && props.errorMessage.length !== 0 ? (
        <Text style={{...AppTextstyles.caption, color: AppColors.error}}>
          {props.errorMessage}
        </Text>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    height: 44,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderColor: AppColors.grey100,
    backgroundColor: AppColors.grey200,
    borderRadius: 5,
    fontSize: 16,
    color: '#0A0A0A',
  },
  inputFieldFocused: {
    height: 44,
    borderWidth: 1.5,
    borderColor: AppColors.primary,
    backgroundColor: AppColors.grey200,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  inputFieldError: {
    height: 44,
    borderWidth: 1.5,
    borderColor: AppColors.error,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 4,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: AppColors.grey200,
  },
  label: {
    ...AppTextstyles.bodySmall,
    paddingBottom: 8,
  },
  labelFocused: {
    ...AppTextstyles.bodySmallBold,
    paddingBottom: 8,
    color: AppColors.primary,
  },
});
