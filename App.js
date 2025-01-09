import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import InfoScreen from './src/screens/InfoScreen';
import ContactScreen from './src/screens/ContactScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000000',
    accent: '#ffffff',
    background: '#000000',
    text: '#ffffff',
  },
};

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Info') {
          iconName = focused ? 'information-circle' : 'information-circle-outline';
        } else if (route.name === 'Contact') {
          iconName = focused ? 'mail' : 'mail-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#ffffff',
      tabBarInactiveTintColor: '#666',
      tabBarStyle: {
        backgroundColor: '#000000',
        borderTopWidth: 0,
      },
      headerStyle: {
        backgroundColor: '#000000',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
    })}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        title: 'Home',
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{
        title: 'Profil',
      }}
    />
    <Tab.Screen 
      name="Info" 
      component={InfoScreen}
      options={{
        title: 'Info',
      }}
    />
    <Tab.Screen 
      name="Contact" 
      component={ContactScreen}
      options={{
        title: 'Kontakt',
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="TabNavigator" 
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
