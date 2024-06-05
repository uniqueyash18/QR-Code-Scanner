import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { textScale, width } from '../styles/responsiveSize';
import fontFamily from '../styles/fontFamily';
import { moderateVerticalScale } from 'react-native-size-matters';
import colors from '../styles/colors';

interface Props {
  options: any;
  onSelect: (value: any) => void;
  placeholder?: string;
  value: any;
  title?:string
}

const Dropdown: React.FC<Props> = ({ options, onSelect, placeholder = 'Select', value,title="" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };
  return (
    <View style={styles.container}>
     {!!title && <Text style={styles.title}>{title}</Text>}
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownToggle}>
        <Text style={styles.placeholder}>{ !!value?.value ? value?.value : placeholder}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)} style={styles.option}>
                <Text style={{color:colors.black}}>{item.label}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.value}
            style={styles.optionsList}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dropdownToggle: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    minWidth: 150,
    alignItems: 'center',
  },
  placeholder: {
    color: '#333',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    zIndex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    minWidth: 150,
  },
  option: {
    padding: 10,
    width: width,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    
  },
  optionsList: {
    maxHeight: 150,
  },
  title:{
fontFamily:fontFamily.ProximaNovaMedium,
fontSize:textScale(16),
marginVertical:moderateVerticalScale(6),
textTransform:'capitalize',
color:colors.black
  }
});

export default Dropdown;
