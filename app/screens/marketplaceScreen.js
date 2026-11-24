import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/productCard";
import { categories, listings } from "../data/listings";

export default function MarketplaceScreen({
  favorites,
  onBack,
  onOpenMessages,
  onOpenProfile,
  onSelectListing,
  onToggleFavorite,
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredListings = listings.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const searchText = `${item.title} ${item.category}`.toLowerCase();
    return matchesCategory && searchText.includes(search.trim().toLowerCase());
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <FlatList
        data={filteredListings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.topBar}>
              <View style={styles.brandBlock}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Back to welcome screen"
                  onPress={onBack}
                  style={({ pressed }) => [
                    styles.iconButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="arrow-left"
                    size={20}
                    color="#F1E8FA"
                  />
                </Pressable>
                <View>
                  <Text style={styles.brand}>DoneWithIt</Text>
                  <Text style={styles.location}>GOOD FINDS NEAR YOU</Text>
                </View>
              </View>
              <View style={styles.topBarActions}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Open messages"
                  onPress={onOpenMessages}
                  style={({ pressed }) => [
                    styles.iconButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="message-outline"
                    size={21}
                    color="#F1E8FA"
                  />
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Open profile"
                  onPress={onOpenProfile}
                  style={({ pressed }) => [
                    styles.profileButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Image
                    source={require("../../assets/images/myAvatar.png")}
                    style={styles.profileAvatar}
                    resizeMode="cover"
                    accessibilityLabel="Your profile photo"
                  />
                </Pressable>
              </View>
            </View>

            <Text style={styles.heading}>Find something{"\n"}worth keeping.</Text>

            <View style={styles.searchBar}>
              <MaterialCommunityIcons
                name="magnify"
                size={20}
                color="#A99DB6"
              />
              <TextInput
                accessibilityLabel="Search marketplace"
                value={search}
                onChangeText={setSearch}
                placeholder="Search finds, brands, categories"
                placeholderTextColor="#82788E"
                returnKeyType="search"
                style={styles.searchInput}
              />
              <MaterialCommunityIcons
                name="tune-variant"
                size={19}
                color="#C69AFF"
              />
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Browse</Text>
              <Text style={styles.resultCount}>
                {filteredListings.length} finds
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
            >
              {categories.map((category) => {
                const isSelected = category === selectedCategory;
                return (
                  <Pressable
                    key={category}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => setSelectedCategory(category)}
                    style={({ pressed }) => [
                      styles.categoryButton,
                      isSelected && styles.categoryButtonSelected,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        isSelected && styles.categoryTextSelected,
                      ]}
                    >
                      {category}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            isFavorite={favorites.has(item.id)}
            onOpen={onSelectListing}
            onToggleFavorite={onToggleFavorite}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="magnify-close"
              size={28}
              color="#A879D8"
            />
            <Text style={styles.emptyTitle}>No finds yet</Text>
            <Text style={styles.emptyMessage}>
              Try a different search or category.
            </Text>
          </View>
        }
        ListFooterComponent={<View style={styles.listFooter} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B0910",
  },
  listContent: {
    paddingHorizontal: 20,
  },
  topBar: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topBarActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  brandBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#1C1723",
    borderWidth: 1,
    borderColor: "#342841",
  },
  profileButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#1C1723",
    borderWidth: 1,
    borderColor: "#8F5DB4",
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  pressed: {
    opacity: 0.78,
  },
  brand: {
    color: "#F8F3FF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  location: {
    marginTop: 4,
    color: "#B879FF",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  heading: {
    marginTop: 20,
    color: "#F8F3FF",
    fontSize: 32,
    lineHeight: 37,
    fontWeight: "900",
    letterSpacing: -1.2,
  },
  searchBar: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 22,
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
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#F6F0FC",
    fontSize: 18,
    fontWeight: "800",
  },
  resultCount: {
    color: "#968BA0",
    fontSize: 11,
  },
  categoryList: {
    gap: 8,
    paddingBottom: 18,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 18,
    backgroundColor: "#17131D",
    borderWidth: 1,
    borderColor: "#2B2334",
  },
  categoryButtonSelected: {
    backgroundColor: "#5B2B7E",
    borderColor: "#9952C8",
  },
  categoryText: {
    color: "#B3A9BE",
    fontSize: 12,
    fontWeight: "600",
  },
  categoryTextSelected: {
    color: "#FFFFFF",
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 42,
  },
  emptyTitle: {
    marginTop: 10,
    color: "#F3EDF9",
    fontSize: 16,
    fontWeight: "700",
  },
  emptyMessage: {
    marginTop: 5,
    color: "#988DA2",
    fontSize: 12,
  },
  listFooter: {
    height: 28,
  },
});
