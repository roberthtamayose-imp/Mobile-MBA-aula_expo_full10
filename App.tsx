import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginPage from './src/pages/Login'
import HomePage from './src/pages/Home'
import UserPage from './src/pages/User'
import RolesPage from './src/pages/Roles'
import RolePage from './src/pages/Role'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='login' component={LoginPage} options={{ title: 'Acesso' }} />
                <Stack.Screen name='home' component={HomePage} />
                <Stack.Screen name='user' component={UserPage} />
                <Stack.Screen name='roles' component={RolesPage} options={{ title: 'Roles' }} />
                <Stack.Screen name='role' component={RolePage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}