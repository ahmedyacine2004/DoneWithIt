import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatScreen({
  conversation,
  messages,
  onBack,
  onSend,
}) {
  const [draft, setDraft] = useState("");
  const messagesList = useRef(null);

  useEffect(() => {
    messagesList.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) {
      return;
    }

    onSend(text);
    setDraft("");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to messages"
            onPress={onBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={21}
              color="#F6F0FC"
            />
          </Pressable>
          <View
            style={[
              styles.avatar,
              { backgroundColor: conversation.color },
            ]}
          >
            <Text style={styles.avatarText}>{conversation.initials}</Text>
            <Image
              source={conversation.avatar}
              style={styles.avatarImage}
              resizeMode="cover"
              accessibilityLabel={`${conversation.name}'s profile picture`}
            />
          </View>
          <View style={styles.headerCopy}>
            <Text style={styles.name}>{conversation.name}</Text>
            <Text style={styles.status}>DoneWithIt member</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`More options for ${conversation.name}`}
            style={({ pressed }) => [
              styles.moreButton,
              pressed && styles.pressed,
            ]}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={21}
              color="#D9D0E1"
            />
          </Pressable>
        </View>

        <View style={styles.listingContext}>
          <MaterialCommunityIcons
            name="tag-outline"
            size={17}
            color="#C287FF"
          />
          <Text style={styles.listingLabel}>About</Text>
          <Text style={styles.listingName} numberOfLines={1}>
            {conversation.listing}
          </Text>
        </View>

        <FlatList
          ref={messagesList}
          data={messages}
          keyExtractor={(message) => message.id}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isMine = item.sender === "me";
            return (
              <View
                style={[
                  styles.messageRow,
                  isMine && styles.messageRowMine,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    isMine ? styles.messageBubbleMine : styles.messageBubbleTheirs,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      isMine && styles.messageTextMine,
                    ]}
                  >
                    {item.text}
                  </Text>
                  <Text
                    style={[
                      styles.messageTime,
                      isMine && styles.messageTimeMine,
                    ]}
                  >
                    {item.time}
                  </Text>
                </View>
              </View>
            );
          }}
        />

        <View style={styles.composer}>
          <TextInput
            accessibilityLabel="Write a message"
            value={draft}
            onChangeText={setDraft}
            placeholder="Write a message..."
            placeholderTextColor="#8E8299"
            multiline
            maxLength={1000}
            style={styles.messageInput}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Send message"
            accessibilityState={{ disabled: draft.trim().length === 0 }}
            disabled={draft.trim().length === 0}
            onPress={sendMessage}
            style={({ pressed }) => [
              styles.sendButton,
              draft.trim().length === 0 && styles.sendButtonDisabled,
              pressed && styles.pressed,
            ]}
          >
            <MaterialCommunityIcons
              name="arrow-up"
              size={22}
              color={draft.trim().length === 0 ? "#8F829B" : "#FFFFFF"}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B0910",
  },
  screen: {
    flex: 1,
  },
  header: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#241E2B",
  },
  backButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    backgroundColor: "#1C1723",
  },
  pressed: {
    opacity: 0.75,
  },
  avatar: {
    position: "relative",
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    overflow: "hidden",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  avatarImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  headerCopy: {
    flex: 1,
  },
  name: {
    color: "#F8F3FF",
    fontSize: 14,
    fontWeight: "700",
  },
  status: {
    marginTop: 3,
    color: "#9E93A8",
    fontSize: 10,
  },
  moreButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
  },
  listingContext: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 20,
    backgroundColor: "#15111B",
    borderBottomWidth: 1,
    borderBottomColor: "#28212F",
  },
  listingLabel: {
    color: "#9D91A8",
    fontSize: 11,
  },
  listingName: {
    flex: 1,
    color: "#D9C5EC",
    fontSize: 11,
    fontWeight: "600",
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 17,
    paddingTop: 18,
    paddingBottom: 16,
    gap: 11,
  },
  messageRow: {
    width: "100%",
    alignItems: "flex-start",
  },
  messageRowMine: {
    alignItems: "flex-end",
  },
  messageBubble: {
    maxWidth: "82%",
    paddingHorizontal: 13,
    paddingTop: 10,
    paddingBottom: 7,
    borderRadius: 17,
  },
  messageBubbleTheirs: {
    backgroundColor: "#211B29",
    borderBottomLeftRadius: 5,
  },
  messageBubbleMine: {
    backgroundColor: "#64338D",
    borderBottomRightRadius: 5,
  },
  messageText: {
    color: "#F2ECF8",
    fontSize: 14,
    lineHeight: 20,
  },
  messageTextMine: {
    color: "#FFFFFF",
  },
  messageTime: {
    alignSelf: "flex-end",
    marginTop: 4,
    color: "#9E92A9",
    fontSize: 9,
  },
  messageTimeMine: {
    color: "#D9BFEA",
  },
  composer: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 9,
    paddingHorizontal: 14,
    paddingTop: 9,
    paddingBottom: 9,
    borderTopWidth: 1,
    borderTopColor: "#28212F",
    backgroundColor: "#111016",
  },
  messageInput: {
    flex: 1,
    maxHeight: 110,
    minHeight: 40,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 9,
    borderRadius: 20,
    backgroundColor: "#211B28",
    color: "#F5EFFA",
    fontSize: 14,
  },
  sendButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#A64DFA",
  },
  sendButtonDisabled: {
    backgroundColor: "#332A3A",
  },
});
