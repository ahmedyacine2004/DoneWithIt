import { useEffect, useState } from "react";
import { BackHandler, View } from "react-native";
import Animated, {
  SlideInLeft,
  SlideInRight,
} from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ChatScreen from "./app/screens/chatScreen";
import ListingDetailsScreen from "./app/screens/listingDetailsScreen";
import MarketplaceScreen from "./app/screens/marketplaceScreen";
import MessagesScreen from "./app/screens/messagesScreen";
import ProfileScreen from "./app/screens/profileScreen";
import ViewImageScreen from "./app/screens/viewImageScreen";
import WelcomeScreen from "./app/screens/welcomeScreen";
import { conversations as initialConversations } from "./app/data/conversations";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [navigationDirection, setNavigationDirection] = useState("forward");
  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [conversations, setConversations] = useState(initialConversations);
  const [messagesByConversation, setMessagesByConversation] = useState(() =>
    Object.fromEntries(
      initialConversations.map(({ id, messages }) => [id, messages]),
    ),
  );
  const [favorites, setFavorites] = useState(() => new Set());
  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedConversationId,
  );

  const navigateToScreen = (screen, direction = "forward") => {
    setNavigationDirection(direction);
    setCurrentScreen(screen);
  };

  useEffect(() => {
    const previousScreen = {
      chat: "messages",
      messages: "marketplace",
      profile: "marketplace",
      "view-image": "listing-details",
      "listing-details": "marketplace",
      marketplace: "welcome",
    }[currentScreen];

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (!previousScreen) {
          return false;
        }

        setNavigationDirection("back");
        setCurrentScreen(previousScreen);
        return true;
      },
    );

    return () => subscription.remove();
  }, [currentScreen]);

  const toggleFavorite = (id) => {
    setFavorites((currentFavorites) => {
      const nextFavorites = new Set(currentFavorites);
      if (nextFavorites.has(id)) {
        nextFavorites.delete(id);
      } else {
        nextFavorites.add(id);
      }
      return nextFavorites;
    });
  };

  const openConversation = (conversation) => {
    setSelectedConversationId(conversation.id);
    setConversations((currentConversations) =>
      currentConversations.map((current) =>
        current.id === conversation.id ? { ...current, unread: false } : current,
      ),
    );
    navigateToScreen("chat");
  };

  const sendMessage = (text) => {
    const conversationId = selectedConversationId;
    if (!conversationId) {
      return;
    }

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const message = {
      id: `${conversationId}-${Date.now()}`,
      sender: "me",
      text,
      time,
    };

    setMessagesByConversation((currentMessages) => ({
      ...currentMessages,
      [conversationId]: [...currentMessages[conversationId], message],
    }));
    setConversations((currentConversations) =>
      currentConversations.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, preview: text, time: "Now", unread: false }
          : conversation,
      ),
    );
  };

  const deleteConversation = (conversationId) => {
    setConversations((currentConversations) =>
      currentConversations.filter(
        (conversation) => conversation.id !== conversationId,
      ),
    );
    setMessagesByConversation((currentMessages) => {
      const nextMessages = { ...currentMessages };
      delete nextMessages[conversationId];
      return nextMessages;
    });
  };

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: "#0B0910" }}>
        <Animated.View
          key={currentScreen}
          entering={
            navigationDirection === "back"
              ? SlideInLeft.duration(220)
              : SlideInRight.duration(220)
          }
          style={{ flex: 1 }}
        >
          {currentScreen === "chat" && selectedConversation ? (
            <ChatScreen
              conversation={selectedConversation}
              messages={messagesByConversation[selectedConversation.id]}
              onBack={() => navigateToScreen("messages", "back")}
              onSend={sendMessage}
            />
          ) : currentScreen === "messages" ? (
            <MessagesScreen
              conversations={conversations}
              onBack={() => navigateToScreen("marketplace", "back")}
              onOpenConversation={openConversation}
              onDeleteConversation={deleteConversation}
            />
          ) : currentScreen === "profile" ? (
            <ProfileScreen
              savedCount={favorites.size}
              conversationCount={conversations.length}
              onBack={() => navigateToScreen("marketplace", "back")}
              onLogout={() => {
                setSelectedConversationId(null);
                navigateToScreen("welcome", "back");
              }}
            />
          ) : currentScreen === "view-image" && selectedListing ? (
            <ViewImageScreen
              item={selectedListing}
              onBack={() => navigateToScreen("listing-details", "back")}
            />
          ) : currentScreen === "listing-details" && selectedListing ? (
            <ListingDetailsScreen
              item={selectedListing}
              isFavorite={favorites.has(selectedListing.id)}
              onBack={() => navigateToScreen("marketplace", "back")}
              onViewImage={() => navigateToScreen("view-image")}
              onToggleFavorite={toggleFavorite}
            />
          ) : currentScreen === "marketplace" ? (
            <MarketplaceScreen
              favorites={favorites}
              onBack={() => navigateToScreen("welcome", "back")}
              onOpenMessages={() => navigateToScreen("messages")}
              onOpenProfile={() => navigateToScreen("profile")}
              onSelectListing={(item) => {
                setSelectedListing(item);
                navigateToScreen("listing-details");
              }}
              onToggleFavorite={toggleFavorite}
            />
          ) : (
            <WelcomeScreen
              onLogin={() => navigateToScreen("marketplace")}
              onRegister={() => navigateToScreen("marketplace")}
            />
          )}
        </Animated.View>
      </View>
    </SafeAreaProvider>
  );
}
