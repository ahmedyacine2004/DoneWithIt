import { useMemo, useRef, useState } from "react";
import {
  Animated,
  Image,
  PanResponder,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const DELETE_ACTION_WIDTH = 96;

function ConversationRow({ conversation, onPress, onDelete }) {
  const translateX = useRef(new Animated.Value(0)).current;
  const isOpen = useRef(false);
  const startOffset = useRef(0);
  const onDeleteRef = useRef(onDelete);
  onDeleteRef.current = onDelete;

  const animateTo = (open) => {
    isOpen.current = open;
    Animated.spring(translateX, {
      toValue: open ? -DELETE_ACTION_WIDTH : 0,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dx, dy }) =>
        Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy),
      onPanResponderGrant: () => {
        startOffset.current = isOpen.current ? -DELETE_ACTION_WIDTH : 0;
        translateX.stopAnimation();
      },
      onPanResponderMove: (_, { dx }) => {
        translateX.setValue(
          Math.max(
            -DELETE_ACTION_WIDTH,
            Math.min(0, startOffset.current + dx),
          ),
        );
      },
      onPanResponderRelease: (_, { dx }) => {
        animateTo(startOffset.current + dx < -DELETE_ACTION_WIDTH / 2);
      },
      onPanResponderTerminate: () => animateTo(isOpen.current),
    }),
  ).current;
  return (
    <View
      style={[
        styles.swipeableRow,
        conversation.unread && styles.swipeableRowUnread,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Delete conversation with ${conversation.name}`}
        onPress={() => onDeleteRef.current(conversation.id)}
        style={styles.deleteAction}
      >
        <MaterialCommunityIcons
          name="delete-outline"
          size={23}
          color="#FFFFFF"
        />
      </Pressable>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.conversation,
          conversation.unread && styles.conversationUnread,
          { transform: [{ translateX }] },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Open conversation with ${conversation.name}`}
          onPress={onPress}
          style={({ pressed }) => [
            styles.conversationContent,
            pressed && styles.conversationPressed,
          ]}
        >
          <View
            style={[styles.avatar, { backgroundColor: conversation.color }]}
          >
            <Text style={styles.avatarText}>{conversation.initials}</Text>
            <Image
              source={conversation.avatar}
              style={styles.avatarImage}
              resizeMode="cover"
              accessibilityLabel={`${conversation.name}'s profile picture`}
            />
          </View>
          <View style={styles.conversationBody}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{conversation.name}</Text>
              <Text style={styles.time}>{conversation.time}</Text>
            </View>
            <Text style={styles.listing} numberOfLines={1}>
              {conversation.listing}
            </Text>
            <Text style={styles.preview} numberOfLines={1}>
              {conversation.preview}
            </Text>
          </View>
          {conversation.unread && <View style={styles.messageUnreadDot} />}
        </Pressable>
      </Animated.View>
    </View>
  );
}

export default function MessagesScreen({
  conversations,
  onBack,
  onOpenConversation,
  onDeleteConversation,
}) {
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const visibleConversations = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return conversations;
    }

    return conversations.filter((conversation) =>
      `${conversation.name} ${conversation.listing} ${conversation.preview}`
        .toLowerCase()
        .includes(query),
    );
  }, [conversations, search]);

  const unreadCount = conversations.filter(
    (conversation) => conversation.unread,
  ).length;

  const refreshConversations = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.content}
        alwaysBounceVertical
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshConversations}
            tintColor="#C287FF"
            colors={["#C287FF"]}
            progressBackgroundColor="#17131D"
          />
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to marketplace"
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
          <View style={styles.headerCopy}>
            <Text style={styles.headerEyebrow}>YOUR INBOX</Text>
            <Text style={styles.title}>Messages</Text>
          </View>
          <View style={styles.unreadBadge}>
            <View style={styles.unreadDot} />
            <Text style={styles.unreadText}>{unreadCount} new</Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <MaterialCommunityIcons
            name="magnify"
            size={20}
            color="#A99DB6"
          />
          <TextInput
            accessibilityLabel="Search messages"
            value={search}
            onChangeText={setSearch}
            placeholder="Search conversations"
            placeholderTextColor="#82788E"
            returnKeyType="search"
            style={styles.searchInput}
          />
          {search.length > 0 && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Clear message search"
              onPress={() => setSearch("")}
            >
              <MaterialCommunityIcons
                name="close-circle"
                size={18}
                color="#9B8DA8"
              />
            </Pressable>
          )}
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Recent</Text>
          <Text style={styles.conversationCount}>
            {visibleConversations.length} conversations
          </Text>
        </View>

        {visibleConversations.length > 0 ? (
          <View style={styles.conversationList}>
            {visibleConversations.map((conversation) => (
              <ConversationRow
                key={conversation.id}
                conversation={conversation}
                onPress={() => onOpenConversation(conversation)}
                onDelete={onDeleteConversation}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="message-text-outline"
              size={30}
              color="#A879D8"
            />
            <Text style={styles.emptyTitle}>No conversations found</Text>
            <Text style={styles.emptyDescription}>
              Try a different name or listing.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B0910",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  header: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#1C1723",
    borderWidth: 1,
    borderColor: "#342841",
  },
  pressed: {
    opacity: 0.75,
  },
  headerCopy: {
    flex: 1,
  },
  headerEyebrow: {
    color: "#B879FF",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.7,
  },
  title: {
    marginTop: 2,
    color: "#F8F3FF",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  unreadBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 14,
    backgroundColor: "#21152B",
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#CA8AFF",
  },
  unreadText: {
    color: "#DCC4F2",
    fontSize: 10,
    fontWeight: "600",
  },
  searchBar: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 17,
    paddingHorizontal: 14,
    borderRadius: 15,
    backgroundColor: "#17131D",
    borderWidth: 1,
    borderColor: "#2B2334",
  },
  searchInput: {
    flex: 1,
    color: "#F7F2FC",
    fontSize: 13,
    paddingVertical: 0,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 28,
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#F3EDF9",
    fontSize: 16,
    fontWeight: "700",
  },
  conversationCount: {
    color: "#90859A",
    fontSize: 11,
  },
  conversationList: {
    gap: 9,
  },
  swipeableRow: {
    minHeight: 86,
    borderRadius: 17,
    overflow: "hidden",
    backgroundColor: "#15121A",
  },
  swipeableRowUnread: {
    backgroundColor: "#1C1523",
  },
  deleteAction: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: DELETE_ACTION_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 17,
    borderBottomRightRadius: 17,
    backgroundColor: "#B83D51",
  },
  conversation: {
    minHeight: 86,
    width: "100%",
    padding: 0,
    borderRadius: 17,
    backgroundColor: "#15121A",
    borderWidth: 1,
    borderColor: "#28212F",
  },
  conversationContent: {
    minHeight: 84,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 13,
    paddingVertical: 12,
  },
  conversationUnread: {
    backgroundColor: "#1C1523",
    borderColor: "#3D2B4B",
  },
  conversationPressed: {
    opacity: 0.78,
  },
  avatar: {
    position: "relative",
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 23,
    overflow: "hidden",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  avatarImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  conversationBody: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  name: {
    color: "#F4EEF9",
    fontSize: 13,
    fontWeight: "700",
  },
  time: {
    color: "#8C8295",
    fontSize: 10,
  },
  listing: {
    marginTop: 3,
    color: "#C39BE7",
    fontSize: 10,
    fontWeight: "600",
  },
  preview: {
    marginTop: 5,
    color: "#A99FB2",
    fontSize: 11,
  },
  messageUnreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#C287FF",
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 54,
  },
  emptyTitle: {
    marginTop: 12,
    color: "#F3EDF9",
    fontSize: 15,
    fontWeight: "700",
  },
  emptyDescription: {
    marginTop: 5,
    color: "#988DA2",
    fontSize: 12,
  },
});
