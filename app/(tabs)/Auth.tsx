import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Button, Input } from 'react-native-elements';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [food, setFood] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [foodLoading, setFoodLoading] = useState(true);


  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('AccountInfo')
        .select('content')
        .eq('id', 1)
        .single();

      if (error) {
        console.error('Error fetching content:', error);
      } else {
        setContent(data.content);
      }
    };

    fetchContent();
  }, []);

  async function signInWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      setLoggedIn(true);
      fetchUserSpecificData(data.user.id);
    }

    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { data: { session }, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else if (!session) {
      Alert.alert('Please check your inbox for email verification!');
    }

    setLoading(false);
  }

  async function fetchUserSpecificData(userId: string) {
    setFoodLoading(true);
    const { data, error } = await supabase
      .from('UserSpecific')
      .select('food')
      .eq('userid', userId)
      .order('created_at', { ascending: false })
      .limit(1);
  
    if (error) {
      console.error('Error fetching user-specific data:', error);
    } else if (data && data.length > 0) {
      setFood(String(data[0].food));
    } else {
      // No data found for the user, set a default value or handle it accordingly
      setFood('');
    }
    setFoodLoading(false);
  }

  async function saveUserSpecificData() {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from('UserSpecific')
        .upsert({ userid: user.id, food: food })
        .select();

      if (error) {
        console.error('Error saving user-specific data:', error);
      } else {
        console.log('User-specific data saved successfully:', data);
      }
    } else {
      console.error('No authenticated user found');
      // Handle the case when no user is authenticated, e.g., show an error message
    }
  }

  return (
    <View style={styles.container}>
      {!loggedIn ? (
        <>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Input
              label="Email"
              leftIcon={{ type: 'font-awesome', name: 'envelope' }}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={'none'}
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Input
              label="Password"
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder={"password"}
              autoCapitalize={'none'}
            />
          </View>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
          </View>
          <View style={styles.verticallySpaced}>
            <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
          </View>
          <View style={styles.verticallySpaced}>
            <Text>{content}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Input
              label="Food"
              leftIcon={{ type: 'font-awesome', name: 'cutlery' }}
              onChangeText={(text) => setFood(text)}
              value={food}
              placeholder="Enter your favorite food!"
              autoCapitalize={'none'}
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Button title="Save" disabled={loading} onPress={() => saveUserSpecificData()} />
          </View>
          <View style={styles.verticallySpaced}>
          {!foodLoading && <Text>Your favorite food is: {food}</Text>}
        </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});