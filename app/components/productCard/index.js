import { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInDown,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ProductCard({
  item,
  isFavorite,
  onOpen,
  onToggleFavorite,
}) {
  const favoriteScale = useSharedValue(1);
  const favoriteAnimation = useAnimatedStyle(() => ({
    transform: [{ scale: favoriteScale.value }],
  }));

  useEffect(() => {
    favoriteScale.value = isFavorite
      ? withSequence(
          withSpring(1.3, { damping: 8, stiffness: 220 }),
          withSpring(1, { damping: 12, stiffness: 180 }),
        )
      : withSpring(1, { damping: 12, stiffness: 180 });
  }, [favoriteScale, isFavorite]);

  return (
    <Animated.View
      entering={FadeInDown.duration(260)}
      layout={LinearTransition.springify().damping(18).stiffness(170)}
      style={styles.card}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`View details for ${item.title}`}
        onPress={() => onOpen(item)}
      >
        <View style={styles.imageArea}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
            accessibilityLabel={item.title}
          />
          <LinearGradient
            colors={[
              "rgba(8, 6, 12, 0.48)",
              "transparent",
              "rgba(8, 6, 12, 0.38)",
            ]}
            locations={[0, 0.48, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.categoryMark}>
            <Text style={styles.categoryMarkText}>{item.category}</Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
          <View style={styles.footerRow}>
            <Text style={styles.condition}>{item.condition} condition</Text>
            <Text style={styles.seller}>
              {item.sellerName} · {item.distance}
            </Text>
          </View>
        </View>
      </Pressable>

      <Animated.View style={[styles.favoriteButton, favoriteAnimation]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            isFavorite
              ? `Remove ${item.title} from favorites`
              : `Add ${item.title} to favorites`
          }
          accessibilityState={{ selected: isFavorite }}
          onPress={() => onToggleFavorite(item.id)}
          style={({ pressed }) => [
            styles.favoriteButtonPressable,
            pressed && styles.favoritePressed,
          ]}
        >
          <MaterialCommunityIcons
            name={isFavorite ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite ? "#E9A0FF" : "#FFFFFF"}
          />
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    overflow: "hidden",
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: "#17131D",
    borderWidth: 1,
    borderColor: "#2B2334",
  },
  imageArea: {
    height: 224,
    overflow: "hidden",
    backgroundColor: "#30213D",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  categoryMark: {
    position: "absolute",
    left: 13,
    bottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 13,
    backgroundColor: "rgba(12, 9, 17, 0.72)",
  },
  categoryMarkText: {
    color: "#F1E8FA",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    backgroundColor: "rgba(12, 9, 17, 0.68)",
  },
  favoriteButtonPressable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
  },
  favoritePressed: {
    opacity: 0.75,
  },
  details: {
    paddingHorizontal: 15,
    paddingTop: 13,
    paddingBottom: 14,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    flex: 1,
    color: "#F7F2FC",
    fontSize: 16,
    fontWeight: "700",
  },
  price: {
    color: "#D6A9FF",
    fontSize: 17,
    fontWeight: "800",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 7,
  },
  condition: {
    color: "#A99DB6",
    fontSize: 11,
  },
  seller: {
    color: "#877D91",
    fontSize: 10,
  },
});
