import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import firebase from "firebase";
import { View, Text } from "react-native";
const Stack = createNativeStackNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyAJbwRVdmKYZpCr3veF4s4ZSfe-XHCsQtE",
  authDomain: "instagram-clone-6d3f3.firebaseapp.com",
  projectId: "instagram-clone-6d3f3",
  storageBucket: "instagram-clone-6d3f3.appspot.com",
  messagingSenderId: "186229297430",
  appId: "1:186229297430:web:c0a0972e694c19d8bb0037",
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({ loggedIn: false, loaded: true });
      } else {
        this.setState({ loggedIn: true, loaded: true });
      }
    });
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>user is logged in</Text>
      </View>
    );
  }
}

export default App;
