import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import useTasksStore from "../stores/tasks";
import { BlurView } from "expo-blur";

const Task = ({ data }) => {
  const taskStore = useTasksStore();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginVertical: 2,
        backgroundColor: "#dedede",
        borderRadius: 10,
      }}
      key={data.id}
    >
      <View>
        <Modal
          animationType="fade"
          statusBarTranslucent={false}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Do you want to delete this task?
              </Text>
              <Text style={{ color: "gray", marginVertical: 10 }}>
                {data.description}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    taskStore.deleteTask(data);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Delete</Text>
                </Pressable>
                <Pressable
                  style={[styles.button]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Text
          style={{
            fontSize: 20,
            textDecorationLine: data.done ? "line-through" : "none",
            color: data.done ? "gray" : "black",
          }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          {data.description}
        </Text>
        <Text style={{ fontSize: 10 }}>
          {data.dateCreated.toLocaleString()}
        </Text>
      </View>
      <Checkbox
        disabled={false}
        value={data.done}
        style={{
          width: 40,
          height: 40,
          aspectRatio: "1/1",
          borderRadius: 10,
        }}
        onValueChange={(newValue) => {
          if (newValue) {
            taskStore.setTaskAsDone(data);
          } else {
            taskStore.setTaskAsNotDone(data);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 15,
  },
  buttonClose: {
    backgroundColor: "#ff5f5f",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default Task;
