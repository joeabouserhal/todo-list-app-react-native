import React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import uuid from "react-native-uuid";
import useTasksStore from "../stores/tasks";
import Task from "../components/Task";

const Homescreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const tasksStore = useTasksStore();

  const addToDo = () => {
    if (text != "") {
      tasksStore.addTask({
        id: uuid.v1().toString(),
        done: false,
        description: text,
        dateCreated: new Date(),
      });
      setText("");
    }
  };
  return (
    <View>
      <View
        style={{
          width: "100%",
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <TextInput
            style={styles.input}
            value={text}
            placeholder="Enter your task here"
            onChangeText={(value) => {
              setText(value);
            }}
          />
          <Pressable style={styles.button} onPress={addToDo}>
            <Text style={{ color: "white" }}>Add Task</Text>
          </Pressable>
        </View>
      </View>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {tasksStore.undoneTasks.map((data) => (
          <Task data={data} key={data.id} />
        ))}
        {tasksStore.doneTasks.length > 0 && (
          <View>
            <Text
              style={{
                textAlign: "center",
                marginVertical: 10,
              }}
            >
              Tasks Done
            </Text>
            {tasksStore.doneTasks.map((data) => (
              <Task data={data} key={data.id} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    padding: 10,
    width: "70%",
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#30ABCB",
  },
});

export default Homescreen;
