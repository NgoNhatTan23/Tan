import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type Category = {
  id: string;
  title: string;
  imageUrl: string;
};

type Meal = {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
  comments: string[];
};

type RootStackParamList = {
  MealsScreen: { categoryId: string };
  MealDetail: { mealId: string };
};

const CATEGORIES: Category[] = [
  { id: '1', title: 'Italian', imageUrl: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Quick & Easy', imageUrl: 'https://via.placeholder.com/150' },
  { id: '3', title: 'Hamburgers', imageUrl: 'https://via.placeholder.com/150' },
  { id: '4', title: 'German', imageUrl: 'https://via.placeholder.com/150' },
  { id: '5', title: 'Light & Lovely', imageUrl: 'https://via.placeholder.com/150' },
  { id: '6', title: 'Exotic', imageUrl: 'https://via.placeholder.com/150' },
];

const MEALS: Record<string, Meal[]> = {
  '1': [
    { id: 'm1', title: 'Spaghetti Carbonara', imageUrl: 'https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-square640-v2.jpg', rating: 4.5, comments: ['Delicious!', 'Would make again.'] },
    { id: 'm2', title: 'Margherita Pizza', imageUrl: 'https://images.prismic.io/eataly-us/ed3fcec7-7994-426d-a5e4-a24be5a95afd_pizza-recipe-main.jpg?auto=compress,format', rating: 4.0, comments: ['Classic and tasty.', 'Great crust.'] },
    { id: 'm3', title: 'Lasagna', imageUrl: 'https://beptruong.edu.vn/wp-content/uploads/2017/12/lasagna-truyen-thong-600x400.jpg', rating: 4.8, comments: ['So cheesy!', 'A family favorite.'] },
    { id: 'm4', title: 'Fettuccine Alfredo', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgfJFj0J6yrAHoZrFbv-0uBPetW8iDomwOtg&s', rating: 4.6, comments: ['Creamy and rich.', 'Perfect pasta.'] },
  ],
  '2': [
    { id: 'm5', title: 'Quick Tacos', imageUrl: 'https://gimmedelicious.com/wp-content/uploads/2019/01/Quick-Chicken-Tacos-food-truck-style-9.jpg', rating: 4.2, comments: ['Easy and quick!', 'Very flavorful.'] },
    { id: 'm6', title: 'Fast Stir-fry', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPad2NEdqaPXRmlIrx4e1JX4XocWwWxKL0vg&s', rating: 4.3, comments: ['Great for a weeknight meal.', 'Healthy and tasty.'] },
    { id: 'm7', title: 'Grilled Cheese', imageUrl: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/01/grilled-cheese.jpg', rating: 4.7, comments: ['Classic comfort food.', 'Perfectly crispy.'] },
    { id: 'm8', title: 'Egg Salad Sandwich', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWywhp9sYt1DsrFUo5DibY5BKWHAW6J80GGw&s', rating: 4.1, comments: ['Quick and easy.', 'Perfect for lunch.'] },
  ],
  // Add more meal data as needed
};

const MealsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MealsScreen'>>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { categoryId } = route.params;

  const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMeals, setFilteredMeals] = useState(MEALS[categoryId] || []);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [newComment, setNewComment] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setFilteredMeals(MEALS[categoryId]?.filter(meal => meal.title.toLowerCase().includes(query.toLowerCase())) || []);
    } else {
      setFilteredMeals(MEALS[categoryId] || []);
    }
  };

  const handleAddComment = () => {
    if (selectedMeal && newComment.trim()) {
      const updatedMeals = MEALS[categoryId]?.map(meal =>
        meal.id === selectedMeal.id
          ? { ...meal, comments: [...meal.comments, newComment] }
          : meal
      ) || [];
      MEALS[categoryId] = updatedMeals;
      setFilteredMeals(updatedMeals);
      setNewComment('');
    }
  };

  const renderMealItem = ({ item }: { item: Meal }) => {
    return (
      <TouchableOpacity
        style={styles.mealItem}
        onPress={() => {
          setSelectedMeal(item);
          navigation.navigate('MealDetail', { mealId: item.id });
        }}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.mealInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>Rating: {item.rating}</Text>
          </View>
          <View style={styles.comments}>
            {item.comments.map((comment, index) => (
              <Text key={index} style={styles.comment}>{comment}</Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps='handled'
      >
        <Text style={styles.categoryTitle}>{selectedCategory?.title}</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search meals..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredMeals}
          keyExtractor={(item) => item.id}
          renderItem={renderMealItem}
        />
        {selectedMeal && (
          <View style={styles.commentSection}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <Button title="Submit" onPress={handleAddComment} />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollView: {
    padding: 20,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  mealItem: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
  },
  mealInfo: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  rating: {
    marginVertical: 5,
  },
  ratingText: {
    fontSize: 16,
    color: '#f39c12',
  },
  comments: {
    marginTop: 5,
  },
  comment: {
    fontSize: 14,
    color: '#666',
  },
  commentSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  commentInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});

export default MealsScreen;
