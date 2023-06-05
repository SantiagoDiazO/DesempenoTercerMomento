import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from '@expo/vector-icons'
import Customer from "./Customer";
import ListCustomers from "./ListCustomers";

const Tab = createBottomTabNavigator()

export default function HomeTabs(){

    return(
        <Tab.Navigator screenOptions={{
            headerShown: false
            }}>

            <Tab.Screen name="Customer" component={Customer} options={{
                title:"Clientes", 
                tabBarIcon: () => (<MaterialIcons name="person" color="red" size={25}/>)
            }}/>
            <Tab.Screen name="ListCustomer" component={ListCustomers} options={{
                title: "Listado de clientes",
                tabBarIcon: () => (<MaterialIcons name="view-list" color="blue" size={25}/>)
            }}/>
        </Tab.Navigator>
    )
}