import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ViewImageScreen({ item, onBack }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
      <StatusBar style="light" />
      <View style={styles.screen}>
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to listing details"
            onPress={onBack}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.pressed,
            ]}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={21}
              color="#FFFFFF"
            />
          </Pressable>
          <View style={styles.imageCounter}>
            <View style={styles.counterDot} />
            <Text style={styles.counterText}>PRODUCT PHOTO</Text>
          </View>
          <View style={styles.iconButtonSpacer} />
        </View>

        <View style={styles.photoStage}>
          <ImageBackground
            source={{ uri: item.image }}
            style={StyleSheet.absoluteFill}
            imageStyle={styles.backdropPhoto}
            blurRadius={24}
          >
            <View pointerEvents="none" style={styles.photoScrim} />
            <Image
              source={{ uri: item.image }}
              style={styles.photo}
              resizeMode="contain"
              accessibilityLabel={`${item.title}, full-screen photo`}
            />
          </ImageBackground>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerTop}>
            <View style={styles.listingInfo}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
            </View>
            <Text style={styles.price}>{item.price}</Text>
          </View>
          <View style={styles.footerBottom}>
            <MaterialCommunityIcons
              name="magnify-plus-outline"
              size={16}
              color="#AB93C0"
            />
            <Text style={styles.hint}>Full-size product photo</Text>
            <Text style={styles.photoCount}>1 / 1</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#09070E",
  },
  screen: {
    flex: 1,
    backgroundColor: "#09070E",
  },
  topBar: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#1C1723",
    borderWidth: 1,
    borderColor: "#382B46",
  },
  iconButtonSpacer: {
    width: 40,
    height: 40,
  },
  pressed: {
    opacity: 0.75,
  },
  imageCounter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  counterDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#C287FF",
  },
  counterText: {
    color: "#C5B7D2",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.6,
  },
  photoStage: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#09070E",
  },
  backdropPhoto: {
    width: "100%",
    height: "100%",
  },
  photoScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(9, 7, 14, 0.48)",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  footer: {
    overflow: "hidden",
    paddingHorizontal: 22,
    paddingTop: 19,
    paddingBottom: 18,
    backgroundColor: "#17111F",
    borderTopWidth: 1,
    borderTopColor: "#2B2234",
  },
  footerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  listingInfo: {
    flex: 1,
  },
  category: {
    color: "#C287FF",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    marginTop: 5,
    color: "#FBF8FE",
    fontSize: 18,
    fontWeight: "700",
  },
  price: {
    color: "#D6A9FF",
    fontSize: 22,
    fontWeight: "800",
  },
  footerBottom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 14,
  },
  hint: {
    flex: 1,
    color: "#9E91AA",
    fontSize: 11,
  },
  photoCount: {
    color: "#AB93C0",
    fontSize: 10,
    fontWeight: "600",
  },
});
