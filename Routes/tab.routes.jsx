import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from "../screen/Home";
import Test from "../screen/Test";
import Palmeiras from "../screen/Palmeiras";

const Tab = createBottomTabNavigator(); 

export default function TabsRoutes(){
    return(
        <Tab.Navigator screenOptions={{ headerShown: false}}>

            <Tab.Screen
            name="HOME"
            color="black"
            component={Home}
            options={{
                tabBarIcon: ({focused}) => (
                <Ionicons 
                name={focused ? "timer" : "timer-outline"} 
                size={22} 
                color={"black"} />),
                tabBarInactiveTintColor: 'gray',
                tabBarActiveTintColor: 'black'
           
            }}
            />

        <Tab.Screen
            name="COUNTER"
            color="blak"
            component={Test}
            options={{
                tabBarIcon: ({focused}) => (
                    <Ionicons 
                    name={focused ? "restaurant" : "restaurant-outline"} 
                    size={22} 
                    color={"black"} />),
                    tabBarLabelStyle: ({ focused }) => ({
                        fontWeight: focused ? 'bold' : 'normal',
                    }),
                    tabBarInactiveTintColor: 'gray',
                    tabBarActiveTintColor: 'black'
            }}
            />

        <Tab.Screen
            name="PALMEIRAS"
            color="black"
            component={Palmeiras}
            options={{
                tabBarIcon: ({focused}) => (
                    <Ionicons 
                    name={focused ? "bookmark" : "bookmark-outline"} 
                    size={22} 
                    color={"black"} />),
                    tabBarLabelStyle: ({ focused }) => ({
                        fontWeight: focused ? 'bold' : 'normal',
                    }),
                    tabBarInactiveTintColor: 'gray',
                    tabBarActiveTintColor: 'black'

            }}
            />

        </Tab.Navigator>
    )
}