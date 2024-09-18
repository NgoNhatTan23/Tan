import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';

const FAVORITE_MEALS = [
  { id: '1', title: 'Spaghetti Carbonara' },
  { id: '2', title: 'Chicken Parmesan' },
  { id: '3', title: 'Beef Wellington' },
  { id: '4', title: 'Sushi' },
  { id: '5', title: 'Pad Thai' },
  { id: '6', title: 'Margherita Pizza' },
  { id: '7', title: 'Fish Tacos' },
  { id: '8', title: 'Ramen' },
  { id: '9', title: 'Chocolate Cake' },
  { id: '10', title: 'French Toast' },
  { id: '11', title: 'Grilled Cheese Sandwich' },
  { id: '12', title: 'Lobster Bisque' },
];

const FavoritesScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMeals, setFilteredMeals] = useState(FAVORITE_MEALS);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text) {
      const filteredData = FAVORITE_MEALS.filter((meal) =>
        meal.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredMeals(filteredData);
    } else {
      setFilteredMeals(FAVORITE_MEALS);
    }
  };

  const renderFavoriteItem = (itemData: { item: { id: string; title: string } }) => {
    return (
      <View style={styles.favoriteItem}>
        <Text style={styles.favoriteItemText}>{itemData.item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Your Favorite Meals</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search meals..."
        placeholderTextColor="#888"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderFavoriteItem}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1565C0', // Màu xanh đậm
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
  favoriteItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#FFEB3B', // Màu vàng tươi
    borderRadius: 10,
    shadowColor: '#000', // Đổ bóng
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Cho Android
  },
  favoriteItemText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1E88E5', // Màu xanh tươi
  },
});

export default FavoritesScreen;
