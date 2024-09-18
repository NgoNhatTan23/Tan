import React, { useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CATEGORIES = [
  { id: '1', title: 'Italian', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDDq1iLXfXoLfgkVm6CJRNCgfHp--MyLbEg&s' },
  { id: '2', title: 'Quick & Easy', imageUrl: 'https://www.thelazydish.com/wp-content/uploads/2022/03/quick-and-easy-dinner-ideas-fast-to-make-last-minute.jpg' },
  { id: '3', title: 'Hamburgers', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTENYnRh013tE7LrJCY-j0pTDFoJzJZtAx8qw&s' },
  { id: '4', title: 'German', imageUrl: 'https://admin.expatica.com/de/wp-content/uploads/sites/6/2023/11/bratwurst-sauerkraut.jpg' },
  { id: '5', title: 'Light & Lovely', imageUrl: 'https://images.cookforyourlife.org/wp-content/uploads/2018/08/Pumpkin-Soup_5216.jpg' },
  { id: '6', title: 'Exotic', imageUrl: 'https://www.vietnamonline.com/media/uploads/froala_editor/images/Scallop.jpg' },
];

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(CATEGORIES);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text) {
      const filteredData = CATEGORIES.filter((category) =>
        category.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCategories(filteredData);
    } else {
      setFilteredCategories(CATEGORIES);
    }
  };

  const renderCategoryItem = (itemData: { item: { id: string; title: string; imageUrl: string } }) => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => navigation.navigate('Meals', { categoryId: itemData.item.id })}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: itemData.item.imageUrl }} style={styles.image} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{itemData.item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search categories..."
        placeholderTextColor="#888"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredCategories}
        renderItem={renderCategoryItem}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E3F2FD', // Background xanh tươi sáng
  },
  searchInput: {
    height: 40,
    borderColor: '#90CAF9', // Màu xanh nhạt
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF', // Màu nền trắng
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFEB3B', // Màu vàng tươi
    shadowColor: '#000', // Đổ bóng
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Cho Android
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  titleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Nền màu tối để làm nổi bật văn bản
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: '#000', // Đổ bóng văn bản
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});

export default CategoriesScreen;
