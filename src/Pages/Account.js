import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {colors, fonts} from '../Utils/GeneralStyles';

export default function Account() {
  const user = {
    name: 'Jim',
    surname: 'Carrey',
    avatar: require('../../assets/user.png'),
  };

  const handleLogout = () => {};

  const handleSettings = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.surname}>{user.surname}</Text>
      </View>
      <TouchableOpacity style={styles.buttonLogOut} onPress={handleLogout}>
        <Text style={styles.textLog}> Log Out </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSettings} onPress={handleSettings}>
        <Text style={styles.textSettings}>Account Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.bold,
  },
  surname: {
    fontSize: 20,
    color: 'gray',
    fontFamily: fonts.regular,
  },
  buttonLogOut: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '70%',
    alignItems: 'center',
  },

  textLog: {
    color: colors.dark,
    fontSize: 20,
    fontFamily: fonts.bold,
  },

  buttonSettings: {
    backgroundColor: colors.tertiary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '70%',
    alignItems: 'center',
  },

  textSettings: {
    color: colors.dark,
    fontSize: 22,
    fontFamily: fonts.bold,
  },
});
