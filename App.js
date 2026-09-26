import Ionicons from "@expo/vector-icons/Ionicons";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
import WordsNavigation from "./components/WordsNavigation";
import LearningNavigation from "./components/LearningNavigation";
import Settings from "./screens/Settings";
import { COLORS } from "./constants";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={COLORS.appBackground}
        barStyle="light-content"
      />

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.primary900,
          tabBarInactiveTintColor: COLORS.fontMain,

          tabBarActiveBackgroundColor: COLORS.appBackground,
          tabBarInactiveBackgroundColor: COLORS.appBackground,

          headerStyle: {
            backgroundColor: COLORS.appBackground,
          },
          headerTintColor: COLORS.primary900,
          headerTitleAlign: "center",
        }}
      >
        <Tab.Screen
          name="Words"
          component={WordsNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list-outline" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Learning"
          component={LearningNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book-outline" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
