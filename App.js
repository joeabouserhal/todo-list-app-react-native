import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homescreen from "./pages/Homescreen";
import About from "./pages/About";
import { AntDesign } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  NavigationBar.setBackgroundColorAsync("#f2f2f2");

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Homescreen}
          options={({ navigation }) => ({
            title: "ToDo List",
            headerRight: () => (
              <AntDesign
                name="infocirlceo"
                size={24}
                color="black"
                onPress={() => navigation.navigate("About")}
              />
            ),
          })}
        />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
