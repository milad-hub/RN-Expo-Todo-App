import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoListScreen from './src/screens/TodoListScreen';
import DBScreen from './src/screens/DBScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TodoList">
        <Stack.Screen name="TodoList" component={TodoListScreen} options={{ title: 'Todo List' }} />
        <Stack.Screen name="DBScreen" component={DBScreen} options={{ title: 'Import/Export DB' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;