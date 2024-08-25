import React from "react";
import { Text, Button, View, StyleSheet, SafeAreaView } from "react-native";
import {TodoList} from "./pages/TodoList"

import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";

import outputs from "./amplify_outputs.json";

Amplify.configure(outputs);

const SignOutButton = () => {
  const { signOut } = useAuthenticator();

  return (
    <View style={styles.signOutButton}>
      <Button title="Sign Out" onPress={signOut} />

    </View>
  );
};

const App = () => {
  return (
//     <Authenticator.Provider>
//       <Authenticator>
//         <SafeAreaView>
//           <SignOutButton />
//           <View>
//                            <TodoList /> </View>
//         </SafeAreaView>
//       </Authenticator>
//     </Authenticator.Provider>
        <View>
            <Text> Home page </Text>
        </View>
  );
};

const styles = StyleSheet.create({
  signOutButton: {
    alignSelf: "flex-end",
  },
});

export default App;