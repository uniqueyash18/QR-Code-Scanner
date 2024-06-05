import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AuthStack from './AuthStack';
import TabRoutes from './TabRoutes';

export default function Routes() {
  const Stack = createNativeStackNavigator();
  const userData = useSelector((state: RootState) => state?.auth?.userData);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!!userData?.authToken ? (
          <Stack.Screen component={TabRoutes} name="TabRoutes" />
        ) : (
          AuthStack()
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
