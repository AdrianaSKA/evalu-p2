import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import HistorialScreen from "../screens/HistorialScreen";
import OperacionesScreen from "../screens/OperacionesScreen";




const Stack = createStackNavigator()

function MyStack() {

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Tab" component={MyTabs} />
        </Stack.Navigator>

    )
}

const Tab = createBottomTabNavigator()

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Operaciones" component={OperacionesScreen} />
            <Tab.Screen name="Historial" component={HistorialScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
        </Tab.Navigator>
    );
}

export default function NavegadorPrincipal() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}