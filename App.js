import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.glow} />
        <View style={styles.orbit} />

        <View style={styles.header}>
          <View style={styles.logoMark}>
            <Text style={styles.logoText}>B</Text>
          </View>
          <View>
            <Text style={styles.clubName}>THE COURT</Text>
            <Text style={styles.clubCaption}>BASKETBALL CLUB</Text>
          </View>
          <View style={styles.seasonTag}>
            <Text style={styles.seasonText}>EST. 24</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.eyebrow}>
            <View style={styles.liveDot} />
            <Text style={styles.eyebrowText}>BUILT FOR THE GAME</Text>
          </View>

          <View style={styles.glassCard}>
            <View style={styles.cardShine} />
            <Text style={styles.kicker}>NO DOUBT. ALL HEART.</Text>
            <Text style={styles.headline}>
              FYM<Text style={styles.questionMark}>?</Text>
            </Text>
            <View style={styles.divider} />
            <Text style={styles.description}>
              Find your moment.
              {'\n'}
              Make it count.
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.footerLabel}>OWN YOUR GAME</Text>
              <Text style={styles.arrow}>↗</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>01</Text>
              <Text style={styles.statLabel}>ONE TEAM</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>ALL IN</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNumber}>∞</Text>
              <Text style={styles.statLabel}>NO LIMITS</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomNote}>
          <View style={styles.bottomLine} />
          <Text style={styles.bottomText}>PURPLE PRIDE  •  GOLD STANDARD</Text>
          <View style={styles.bottomLine} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#180B35',
  },
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#180B35',
    paddingHorizontal: 26,
    paddingTop: 18,
    paddingBottom: 18,
  },
  glow: {
    position: 'absolute',
    width: 310,
    height: 310,
    borderRadius: 155,
    top: 95,
    right: -145,
    backgroundColor: '#542A92',
    opacity: 0.55,
  },
  orbit: {
    position: 'absolute',
    width: 255,
    height: 255,
    borderRadius: 128,
    left: -165,
    bottom: 66,
    borderWidth: 1,
    borderColor: 'rgba(255, 211, 76, 0.18)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoMark: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD34C',
    marginRight: 12,
    transform: [{ rotate: '-7deg' }],
  },
  logoText: {
    color: '#241044',
    fontSize: 23,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  clubName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2.2,
  },
  clubCaption: {
    color: 'rgba(255,255,255,0.58)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.7,
    marginTop: 3,
  },
  seasonTag: {
    marginLeft: 'auto',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 7,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  seasonText: {
    color: '#F4D875',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingLeft: 4,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FFD34C',
    marginRight: 9,
  },
  eyebrowText: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2.3,
  },
  glassCard: {
    overflow: 'hidden',
    minHeight: 350,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
    backgroundColor: 'rgba(255,255,255,0.10)',
    paddingHorizontal: 25,
    paddingTop: 27,
    paddingBottom: 21,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.28,
    shadowRadius: 26,
    elevation: 12,
  },
  cardShine: {
    position: 'absolute',
    top: 0,
    left: 28,
    right: 28,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.48)',
  },
  kicker: {
    color: '#F4D875',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2.1,
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 94,
    lineHeight: 106,
    fontWeight: '900',
    letterSpacing: -7,
    marginTop: 9,
    marginLeft: -5,
    textShadowColor: 'rgba(20, 8, 43, 0.28)',
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 12,
  },
  questionMark: {
    color: '#FFD34C',
    fontSize: 100,
  },
  divider: {
    width: 42,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#FFD34C',
    marginTop: 8,
    marginBottom: 15,
  },
  description: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 17,
    lineHeight: 25,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 17,
  },
  footerLabel: {
    color: 'rgba(255,255,255,0.64)',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 2,
  },
  arrow: {
    color: '#241044',
    backgroundColor: '#FFD34C',
    width: 34,
    height: 34,
    borderRadius: 17,
    textAlign: 'center',
    textAlignVertical: 'center',
    overflow: 'hidden',
    fontSize: 19,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 24,
    paddingHorizontal: 4,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: '#FFD34C',
    fontSize: 19,
    fontWeight: '900',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.58)',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 25,
    backgroundColor: 'rgba(255,255,255,0.17)',
  },
  bottomNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  bottomLine: {
    width: 22,
    height: 1,
    backgroundColor: 'rgba(255,211,76,0.45)',
  },
  bottomText: {
    color: 'rgba(255,255,255,0.57)',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1.6,
  },
});
