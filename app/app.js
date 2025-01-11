import React from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './index'; // Home is in index.js
import Learning from './Learning'; // Learning.js file
import QuizGame from './QuizGame'; // QuizGame.js file

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Learning" component={Learning} />
                <Stack.Screen name="QuizGame" component={QuizGame} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
