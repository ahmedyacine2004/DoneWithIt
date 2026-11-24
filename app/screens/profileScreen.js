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

function ActivityCard({ icon, label, value }) {
  return (
    <View style={styles.activityCard}>
      <View style={styles.activityIcon}>
        <MaterialCommunityIcons name={icon} size={19} color="#C287FF" />
      </View>
      <Text style={styles.activityValue}>{value}</Text>
      <Text style={styles.activityLabel}>{label}</Text>
    </View>
  );
}

function ContactRow({ icon, label, value }) {
  return (
    <View style={styles.contactRow}>
      <View style={styles.contactIcon}>
        <MaterialCommunityIcons name={icon} size={19} color="#C287FF" />
      </View>
      <View style={styles.contactCopy}>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={styles.contactValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function ProfileScreen({
  savedCount,
  conversationCount,
  onBack,
  onLogout,
}) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.content}
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
          <View>
            <Text style={styles.headerEyebrow}>YOUR ACCOUNT</Text>
            <Text style={styles.title}>Profile</Text>
          </View>
        </View>

        <LinearGradient
          colors={["#2B1A3A", "#17131D"]}
          style={styles.profileCard}
        >
          <View style={styles.avatarBorder}>
            <Image
              source={require("../../assets/images/myAvatar.png")}
              style={styles.avatar}
              resizeMode="cover"
              accessibilityLabel="Your profile photo"
            />
          </View>
          <Text style={styles.profileName}>Ahmed Yassine Abbane</Text>
          <View style={styles.memberBadge}>
            <MaterialCommunityIcons
              name="soccer"
              size={14}
              color="#FFFFFF"
            />
            <Text style={styles.memberBadgeText}>Certified Gooner</Text>
          </View>
          <Text style={styles.profileDescription}>
            Making room for what’s next.
          </Text>
        </LinearGradient>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Contact details</Text>
          <Text style={styles.sectionCaption}>
            Your account information
          </Text>
        </View>
        <View style={styles.contactCard}>
          <ContactRow
            icon="email-outline"
            label="Email address"
            value="ahmedyacineabbane@gmail.com"
          />
          <View style={styles.contactDivider} />
          <ContactRow
            icon="phone-outline"
            label="Phone number"
            value="+213794487102"
          />
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Your activity</Text>
          <Text style={styles.sectionCaption}>A little marketplace snapshot</Text>
        </View>
        <View style={styles.activityList}>
          <ActivityCard
            icon="heart-outline"
            label="Saved finds"
            value={savedCount}
          />
          <ActivityCard
            icon="message-text-outline"
            label="Conversations"
            value={conversationCount}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Log out"
          onPress={onLogout}
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.logoutIcon}>
            <MaterialCommunityIcons
              name="logout"
              size={18}
              color="#FF8593"
            />
          </View>
          <Text style={styles.logoutText}>Log out</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color="#A99FB2"
          />
        </Pressable>
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
    flexGrow: 1,
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
  profileCard: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 26,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#342841",
    overflow: "hidden",
  },
  avatarBorder: {
    width: 124,
    height: 124,
    padding: 4,
    borderRadius: 62,
    backgroundColor: "#6E3B91",
    borderWidth: 1,
    borderColor: "#B879FF",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 58,
  },
  profileName: {
    marginTop: 15,
    color: "#F8F3FF",
    fontSize: 21,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.4,
  },
  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 14,
    backgroundColor: "#6E3B91",
    borderWidth: 1,
    borderColor: "#C287FF",
  },
  memberBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  profileDescription: {
    marginTop: 12,
    color: "#A99FB2",
    fontSize: 12,
    textAlign: "center",
  },
  sectionHeading: {
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#F3EDF9",
    fontSize: 16,
    fontWeight: "700",
  },
  sectionCaption: {
    marginTop: 4,
    color: "#90859A",
    fontSize: 11,
  },
  contactCard: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 17,
    backgroundColor: "#17131D",
    borderWidth: 1,
    borderColor: "#2B2334",
  },
  contactRow: {
    minHeight: 69,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  contactIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#281B34",
  },
  contactCopy: {
    flex: 1,
  },
  contactLabel: {
    color: "#90859A",
    fontSize: 10,
    fontWeight: "600",
  },
  contactValue: {
    marginTop: 4,
    color: "#F3EDF9",
    fontSize: 12,
    fontWeight: "600",
  },
  contactDivider: {
    height: 1,
    marginLeft: 48,
    backgroundColor: "#2B2334",
  },
  activityList: {
    flexDirection: "row",
    gap: 12,
  },
  activityCard: {
    flex: 1,
    minHeight: 126,
    padding: 15,
    borderRadius: 17,
    backgroundColor: "#17131D",
    borderWidth: 1,
    borderColor: "#2B2334",
  },
  activityIcon: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#281B34",
  },
  activityValue: {
    marginTop: 12,
    color: "#F8F3FF",
    fontSize: 20,
    fontWeight: "800",
  },
  activityLabel: {
    marginTop: 2,
    color: "#A99FB2",
    fontSize: 11,
  },
  logoutButton: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 24,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "#21151B",
    borderWidth: 1,
    borderColor: "#43242D",
  },
  logoutIcon: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
    backgroundColor: "#382029",
  },
  logoutText: {
    flex: 1,
    color: "#FF8593",
    fontSize: 13,
    fontWeight: "700",
  },
});
