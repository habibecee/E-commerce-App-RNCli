import {TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderButtons = ({name, size, color, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default HeaderButtons;
