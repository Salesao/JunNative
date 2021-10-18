import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { pages } from './listPage';

const Stack = createStackNavigator()

export const Navigation = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName={pages[0].name}>
                {pages.map(page => (
                    <Stack.Screen
                    key={page.name}
                    name={page.name}
                    component={page.component}
                    options={
                        {
                            title: page.title,
                            headerStyle:{backgroundColor:'#eb9f1d', height:90},
                            headerTitleStyle:{fontWeight:'500'}
                        }
                    }/>
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    )
}