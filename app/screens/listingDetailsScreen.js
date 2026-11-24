import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListingDetailsScreen({
  item,
  isFavorite,
  onBack,
  onViewImage,
  onToggleFavorite,
}) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to marketplace"
            onPress={onBack}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.pressed,
            ]}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={21}
              color="#F6F0FC"
            />
          </Pressable>
          <Text style={styles.topBarTitle}>Listing details</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            accessibilityState={{ selected: isFavorite }}
            onPress={() => onToggleFavorite(item.id)}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.pressed,
            ]}
          >
            <MaterialCommunityIcons
              name={isFavorite ? "heart" : "heart-outline"}
              size={21}
              color={isFavorite ? "#E9A0FF" : "#F6F0FC"}
            />
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`View full-screen image of ${item.title}`}
          onPress={onViewImage}
          style={styles.photoFrame}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.photo}
            resizeMode="cover"
            accessibilityLabel={item.title}
          />
          <LinearGradient
            colors={["rgba(8, 6, 12, 0.3)", "transparent", "rgba(8, 6, 12, 0.28)"]}
            locations={[0, 0.52, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <View style={styles.expandHint}>
            <MaterialCommunityIcons
              name="fullscreen"
              size={17}
              color="#FFFFFF"
            />
            <Text style={styles.expandHintText}>View photo</Text>
          </View>
        </Pressable>

        <View style={styles.details}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
          <View style={styles.conditionRow}>
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={16}
              color="#C287FF"
            />
            <Text style={styles.condition}>{item.condition} condition</Text>
            <View style={styles.conditionDivider} />
            <Text style={styles.distance}>{item.distance}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>About this find</Text>
          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.sellerCard}>
            <View style={styles.sellerAvatar}>
              <Image
                source={item.sellerAvatar}
                style={styles.sellerAvatarImage}
                resizeMode="cover"
                accessibilityLabel={`${item.sellerName}'s profile picture`}
              />
            </View>
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerLabel}>Listed by</Text>
              <Text style={styles.sellerName}>{item.sellerName}</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={21}
              color="#93879E"
            />
          </View>
        </View>
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
    paddingBottom: 28,
  },
  topBar: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  topBarTitle: {
    color: "#F5EFFA",
    fontSize: 15,
    fontWeight: "700",
  },
  iconButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    backgroundColor: "#1C1723",
    borderWidth: 1,
    borderColor: "#342841",
  },
  pressed: {
    opacity: 0.75,
  },
  photoFrame: {
    height: 340,
    overflow: "hidden",
    backgroundColor: "#21172F",
  },
  photo: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  categoryBadge: {
    position: "absolute",
    left: 20,
    bottom: 18,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 15,
    backgroundColor: "rgba(12, 9, 17, 0.72)",
  },
  categoryText: {
    color: "#F3E9FD",
    fontSize: 11,
    fontWeight: "700",
  },
  expandHint: {
    position: "absolute",
    right: 20,
    bottom: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 15,
    backgroundColor: "rgba(12, 9, 17, 0.72)",
  },
  expandHintText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  details: {
    paddingHorizontal: 22,
    paddingTop: 21,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    flex: 1,
    color: "#F8F3FF",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  price: {
    color: "#D6A9FF",
    fontSize: 23,
    lineHeight: 30,
    fontWeight: "800",
  },
  conditionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 11,
  },
  condition: {
    color: "#C9BDd4",
    fontSize: 12,
  },
  conditionDivider: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#81768C",
  },
  distance: {
    color: "#9B90A5",
    fontSize: 11,
  },
  divider: {
    height: 1,
    marginVertical: 22,
    backgroundColor: "#2B2334",
  },
  sectionTitle: {
    color: "#F4EDF9",
    fontSize: 15,
    fontWeight: "700",
  },
  description: {
    marginTop: 8,
    color: "#B5AABD",
    fontSize: 14,
    lineHeight: 21,
  },
  sellerCard: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    paddingHorizontal: 13,
    borderRadius: 16,
    backgroundColor: "#17131D",
    borderWidth: 1,
    borderColor: "#2B2334",
  },
  sellerAvatar: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    backgroundColor: "#39254A",
    overflow: "hidden",
  },
  sellerAvatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 21,
  },
  sellerInfo: {
    flex: 1,
    marginLeft: 11,
  },
  sellerLabel: {
    color: "#9B90A5",
    fontSize: 10,
  },
  sellerName: {
    marginTop: 2,
    color: "#F1EAF7",
    fontSize: 13,
    fontWeight: "700",
  },
});
