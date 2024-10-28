import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin!");
    } else {
      Alert.alert("Cảm ơn!", "Chúng tôi sẽ sớm liên hệ với bạn.");
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/originals/5a/9d/f1/5a9df1d261390348172ed12213c18fd4.png",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              <Text style={styles.title}>Liên hệ với chúng tôi</Text>
              <TextInput
                style={styles.input}
                placeholder="Họ tên"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Tin nhắn của bạn"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
              />
              <Button title="Gửi" onPress={handleSubmit} style={styles.button} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff", // Adjust color to ensure visibility on background
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  messageInput: {
    height: 100,
    textAlignVertical: "top",
  },
  background: {
    flex: 1,
    opacity: 0.8
  },
  button:{
    

  }
});
