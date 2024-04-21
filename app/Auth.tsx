import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';
import { Button, Input } from 'react-native-elements';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';


export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [food, setFood] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [foodLoading, setFoodLoading] = useState(true);

  const { push } = useRouter();


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
        <View style={styles.container}>
          <Image source={require('../assets/images/logo2.png')} style={styles.logo} />
          {/* Your email, password, etc. components here */}
          <View style={[styles.verticallySpaced, styles.input]}>
            <Input
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="Email"
              autoCapitalize={'none'}
              style={styles.ep}
              placeholderTextColor='white'
              inputContainerStyle={{ borderBottomWidth: 0 }}
            />
          </View>
          <View style={[styles.verticallySpaced, styles.input]}>
            <Input
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder={"Password"}
              placeholderTextColor='white'
              autoCapitalize={'none'}
              inputStyle={{ color: 'white' }}
              style={styles.ep}
              inputContainerStyle={{ borderBottomWidth: 0 }}
            />
          </View>
          {/* <View style={[styles.signin]}>
            <Button title="Sign in" buttonStyle={{ backgroundColor: '#F76800'}} disabled={loading} onPress={() => signInWithEmail()} />
          </View> */}
          <TouchableOpacity
            disabled={loading}
            onPress={() => signInWithEmail()}
            style={styles.signin}
          >
            <View>
              <Text style={{ color: 'white', textAlign: 'center' }}>Sign in</Text>
            </View>
          </TouchableOpacity>
          {/* <View style={styles.verticallySpaced}>
            <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
          </View> */}
          {/* <View style={[styles.verticallySpaced]}>
            <Text>{content}</Text>
          </View> */}
          </View>
        </>
      ) : (
        <>
          <View style={[styles.verticallySpaced]}>
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
            <Button title="Save" disabled={loading} onPress={() => {saveUserSpecificData(); push('./(tabs)');}} />
          </View>
          <View style={styles.verticallySpaced}>
          {!foodLoading && <Text style={{ color: 'white' }}>Your favorite food is: {food}</Text>}
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
    backgroundColor: '#000000',
    flex: 1,
    alignItems: 'center',
  },
  verticallySpaced: {
    paddingTop: 2,
    paddingBottom: 2,
    alignSelf: 'stretch',
  },
  input: {
    marginTop: 18,
    display: 'flex',
    width: 326,
    padding: 12,
    alignItems: 'center',
    gap: 5,
    borderRadius: 14,
    backgroundColor: '#414040',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop: 20,
  },
  ep: {
    color: '#CFCFCF',
    paddingTop: 20
  },
  signin: {
    marginTop: 18,
    display: 'flex',
    width: 326,
    padding: 15,
    alignItems: 'center',
    gap: 5,
    borderRadius: 14,
    backgroundColor: '#F76800',
  },

});