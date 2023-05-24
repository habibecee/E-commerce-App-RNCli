import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useContext} from 'react';
import {MainContext} from '../Context/Context';
import {Picker} from '@react-native-picker/picker';
import {colors, fonts} from '../Utils/GeneralStyles';

export default function ProductChanges({
  onChange,
  defaultValue,
  productButton,
  productUpdateFunc,
}) {
  const {
    categories,
    setSelectedValue,
    onChangeUpdate,
    onChangeText,
    productCreate,
    selectedValue,
  } = useContext(MainContext);

  console.log('defaultValue', JSON.stringify(defaultValue, null, 4));

  return (
    <View style={styles.container}>
      <FlatList
        data={[defaultValue]}
        style={styles.scrollView}
        renderItem={({item, index}) => {
          return (
            <>
              {String(onChange) === 'ProductUpdate' ? (
                <>
                  {Object.entries(item).map(([key, value]) => (
                    <TextInput
                      key={key}
                      style={styles.inputContainer}
                      placeholder={key}
                      onChangeText={text => {
                        if (String(onChange) === 'ProductUpdate') {
                          onChangeUpdate(key, text);
                        } else {
                          onChangeText(key, text);
                        }
                      }}
                      defaultValue={String(value)}
                    />
                  ))}
                  <View style={styles.pickerContainer}>
                    <Text style={styles.pickerSubText}>Choose Category</Text>
                    <Picker
                      style={styles.picker}
                      itemStyle={styles.pickerText}
                      selectedValue={selectedValue}
                      onValueChange={itemValue => setSelectedValue(itemValue)}>
                      {categories.map((picker, index) => {
                        return (
                          <Picker.Item
                            label={picker.name}
                            value={picker.id}
                            key={index}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                </>
              ) : (
                <>
                  {Object.entries(item).map(([key, value]) => (
                    <TextInput
                      key={key}
                      placeholder={key}
                      style={styles.inputContainer}
                      onChangeText={text => onChangeText(String(item), text)}
                    />
                  ))}
                  <View style={styles.pickerContainer}>
                    <Text style={styles.pickerSubText}>Choose Category</Text>
                    <Picker
                      style={styles.picker}
                      itemStyle={styles.pickerText}
                      selectedValue={selectedValue}
                      onValueChange={itemValue => setSelectedValue(itemValue)}>
                      {categories.map((picker, index) => {
                        return (
                          <Picker.Item
                            label={picker.name}
                            value={picker.id}
                            key={index}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                </>
              )}
            </>
          );
        }}
      />
      {String(onChange) === 'ProductUpdate' ? (
        <TouchableOpacity onPress={() => productUpdateFunc()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}> {productButton} </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => productCreate()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}> {productButton} </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.tertiary,
    padding: 10,
    shadowColor: colors.dark,
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderRadius: 10,
  },

  scrollView: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingVertical: 35,
    paddingHorizontal: 10,
    backgroundColor: colors.tertiary,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },

  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary,
  },

  pickerContainer: {
    flex: 1,
    paddingBottom: 30,
  },

  pickerSubText: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    color: colors.dark,
    alignSelf: 'flex-start',
    marginBottom: 30,
  },

  picker: {
    width: '70%',
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },

  pickerText: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    color: colors.textDark,
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: colors.dark,
    shadowOpacity: 0.7,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  buttonText: {
    fontFamily: fonts.semiBold,
    fontSize: 22,
    color: colors.textDark,
  },
});
