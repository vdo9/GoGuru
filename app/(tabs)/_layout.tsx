import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

import { Image } from 'react-native';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarInactiveTintColor: 'white',
        tabBarStyle: { backgroundColor: '#F76800' },
        tabBarShowLabel:false
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          headerTitleStyle: { display: 'none' },
          headerStyle: { backgroundColor: '#000000' },
          headerTintColor: 'white',
          tabBarIcon: ({ focused }) => (
            <Image source={require('../../assets/images/home.png')} style={{ opacity: focused ? 0.5 : 1 }} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1, paddingTop: 15, width: 30, height: 30 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="planner"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Image source={require('../../assets/images/plan.png')} style={{ opacity: focused ? 0.5 : 1, paddingTop: 15, width: 30, height: 30 }} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Image source={require('../../assets/images/user.png')} style={{ opacity: focused ? 0.5 : 1, paddingTop: 15, width: 30, height: 30 }} />
          ),       
        }}
      />
    </Tabs>
  );
}
