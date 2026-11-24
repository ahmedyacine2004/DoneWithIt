import {
  Canvas,
  Rect,
  Shader,
  Skia,
  vec,
} from "@shopify/react-native-skia";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const meshGradientShader = Skia.RuntimeEffect.Make(`
uniform float2 resolution;

half4 main(float2 point) {
  float2 uv = point / resolution;

  float2 topLeft = (uv - float2(0.12, 0.28)) * float2(1.0, 1.15);
  float2 topRight = (uv - float2(0.92, 0.38)) * float2(1.05, 0.9);
  float2 lowerLeft = (uv - float2(0.12, 0.82)) * float2(0.9, 1.1);
  float2 lowerRight = (uv - float2(0.96, 0.88)) * float2(1.1, 0.9);

  float purple = exp(-dot(topLeft, topLeft) * 7.0);
  float magenta = exp(-dot(topRight, topRight) * 6.5);
  float indigo = exp(-dot(lowerLeft, lowerLeft) * 6.0);
  float violet = exp(-dot(lowerRight, lowerRight) * 7.0);

  half3 color = half3(0.025, 0.018, 0.04);
  color += half3(0.28, 0.055, 0.58) * purple;
  color += half3(0.38, 0.07, 0.46) * magenta;
  color += half3(0.11, 0.07, 0.38) * indigo;
  color += half3(0.20, 0.035, 0.34) * violet;

  return half4(color, 1.0);
}
`);

if (meshGradientShader === null) {
  throw new Error("Unable to compile the welcome screen mesh gradient shader.");
}

export default function WelcomeScreen({ onLogin, onRegister }) {
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const compact = height - insets.top - insets.bottom < 700;
  const headlineSize = Math.min(compact ? 57 : 68, Math.max(50, width * 0.17));
  const logoSize = compact ? 122 : 150;
  const canvasWidth = width - insets.left - insets.right;
  const canvasHeight = height - insets.top - insets.bottom;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "right", "bottom", "left"]}>
      <StatusBar style="light" />
      <View style={styles.screen}>
        <View pointerEvents="none" style={styles.gradientBackground}>
          <Canvas style={StyleSheet.absoluteFill}>
            <Rect x={0} y={0} width={canvasWidth} height={canvasHeight}>
              <Shader
                source={meshGradientShader}
                uniforms={{ resolution: vec(canvasWidth, canvasHeight) }}
              />
            </Rect>
          </Canvas>
          <LinearGradient
            colors={[
              "rgba(124, 38, 210, 0.62)",
              "rgba(103, 39, 170, 0.24)",
              "rgba(9, 7, 14, 0.04)",
            ]}
            locations={[0, 0.48, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <LinearGradient
            colors={[
              "rgba(217, 70, 239, 0.35)",
              "rgba(99, 57, 151, 0.04)",
              "rgba(55, 48, 163, 0.32)",
            ]}
            locations={[0, 0.52, 1]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </View>

        <View style={styles.layout}>
          <View style={styles.header}>
            <Text style={styles.brandName}>DoneWithIt</Text>
          </View>

          <View style={styles.hero}>
            <Image
              accessibilityLabel="DoneWithIt logo"
              source={require("../../assets/images/logo.png")}
              style={[styles.heroLogo, { width: logoSize, height: logoSize }]}
              resizeMode="contain"
            />
            <View style={styles.eyebrow}>
              <View style={styles.eyebrowDot} />
              <Text style={styles.eyebrowText}>SECONDHAND, FIRST CHOICE</Text>
            </View>
            <Text
              style={[
                styles.headline,
                {
                  fontSize: headlineSize,
                  lineHeight: headlineSize * 1.12,
                },
              ]}
            >
              Good finds{"\n"}
              <Text style={styles.headlineAccent}>live again.</Text>
            </Text>
            <Text style={[styles.description, compact && styles.descriptionCompact]}>
              Pre-loved things. A new place to call home.
            </Text>

          </View>

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Login"
              onPress={onLogin}
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <MaterialCommunityIcons
                name="login"
                size={19}
                color="#E6D6F5"
              />
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Register"
              onPress={onRegister}
              style={({ pressed }) => [
                styles.registerButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <MaterialCommunityIcons
                name="account-plus-outline"
                size={19}
                color="#FFFFFF"
              />
              <Text style={styles.registerButtonText}>Register</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const condensedFont = Platform.select({
  android: "sans-serif-condensed",
  default: undefined,
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#09070E",
  },
  screen: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#09070E",
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  layout: {
    flex: 1,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    paddingHorizontal: 26,
    paddingTop: 6,
    paddingBottom: 8,
  },
  header: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroLogo: {
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  brandName: {
    color: "#F8F3FF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  hero: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 8,
  },
  eyebrow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 13,
  },
  eyebrowDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#C38BFF",
  },
  eyebrowText: {
    color: "#D0A8F5",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.4,
  },
  headline: {
    color: "#FBF9FE",
    width: "100%",
    textAlign: "left",
    fontFamily: Platform.select({
      android: "sans-serif-condensed",
      ios: "AvenirNext-Heavy",
      default: condensedFont,
    }),
    fontWeight: "900",
    letterSpacing: -1.7,
  },
  headlineAccent: {
    color: "#C287FF",
  },
  description: {
    marginTop: 14,
    color: "#C1B8CB",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "left",
    letterSpacing: 0.1,
  },
  descriptionCompact: {
    marginTop: 10,
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    paddingBottom: 6,
  },
  loginButton: {
    flex: 1,
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "#5B486B",
  },
  registerButton: {
    flex: 1,
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 17,
    backgroundColor: "#A64DFA",
    shadowColor: "#9333EA",
    shadowOpacity: 0.34,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 7,
  },
  buttonPressed: {
    opacity: 0.84,
    transform: [{ scale: 0.985 }],
  },
  loginButtonText: {
    color: "#E6D6F5",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.1,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.1,
  },
});
