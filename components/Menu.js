import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeTabs from '../components/HomeTabs';

const Stack = createNativeStackNavigator()

export default function Menu(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Menu'>
        <Stack.Screen name='Menu' component={HomeTabs} /*options={{title:'Renta Autos'}}*//>
      </Stack.Navigator>
    </NavigationContainer>
  );
}