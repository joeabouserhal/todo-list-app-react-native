import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const About = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        margin: 40,
      }}
    >
      <AntDesign
        name="infocirlceo"
        size={50}
        color="black"
        style={{ textAlign: "center", marginBottom: 20 }}
      />
      <Text style={{ textAlign: "center", fontSize: 50 }}>About</Text>
      <Text style={{ textAlign: "center" }}>
        This basic todo list app that just stores data in state, neither
        locally, nor on a server. Actually, i added saving tasks locally,
        nevermind.
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontStyle: "italic",
          marginTop: 10,
          color: "gray",
        }}
      >
        ~Joe Abou Serhal~
      </Text>
    </View>
  );
};

export default About;
