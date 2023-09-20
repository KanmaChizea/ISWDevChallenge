import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {AppColors} from '../../styles';
import AppTextstyles from '../../styles/textstyles';

interface ListTileProps {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  title: string;
  onPress?: () => void;
  titleStyle?: StyleProp<TextStyle>;
}
const ListTile = ({
  leading,
  trailing,
  title,
  onPress,
  titleStyle,
}: ListTileProps) => {
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={onPress}
      underlayColor="#DDDDDD"
      activeOpacity={onPress !== undefined ? 0.7 : 1}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.leadingWidth}>{leading}</View>
          <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
        </View>
        {trailing}
      </View>
    </TouchableHighlight>
  );
};

export default ListTile;

const styles = StyleSheet.create({
  leadingWidth: {
    paddingRight: 8,
  },
  titleStyle: {
    ...AppTextstyles.bodyLarge,
  },
  container: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.grey200,
  },
});
