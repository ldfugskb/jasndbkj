import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ShieldCheck,
  User,
  BatteryMedium,
  TriangleAlert,
  Target,
  Bell,
  SlidersHorizontal,
  Compass,
  CheckCheck,
  FlaskConical,
  BadgeCheck,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react-native';

const COLORS = {
  bg: '#F8FAFC',
  card: '#FFFFFF',
  border: '#E7EBF0',
  slate900: '#0F172A',
  slate700: '#334155',
  slate500: '#64748B',
  slate400: '#94A3B8',
  blue600: '#2563EB',
  blue50: '#EFF4FF',
  blue100: '#DBE7FE',
  blue700: '#1D4ED8',
  red600: '#DC2626',
  red50: '#FEF2F2',
  red100: '#FEE2E2',
  red200: '#FECACA',
  red700: '#B91C1C',
  amber500: '#F59E0B',
  green500: '#22C55E',
  green50: '#F0FDF4',
  green600: '#16A34A',
};

type TabKey = 'dispatches' | 'map' | 'queue' | 'profile';

export default function InspectorDashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>('dispatches');

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <Header />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TelemetryCard />
        <SurpriseMissionCard />
        <AssignedTodaySection />
        <FooterTelemetryTag />
      </ScrollView>
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </SafeAreaView>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.headerIconWrap}>
          <ShieldCheck size={22} color={COLORS.blue600} strokeWidth={2.25} />
        </View>
        <View>
          <View style={styles.headerTitleRow}>
            <Text style={styles.headerTitle}>Drishti-AI</Text>
            <View style={styles.govBadge}>
              <Text style={styles.govBadgeText}>PMU GOV</Text>
            </View>
          </View>
          <View style={styles.headerSubRow}>
            <Text style={styles.headerSubtitle}>Dispatches</Text>
            <View style={styles.secureDotPill}>
              <View style={styles.greenDot} />
              <Text style={styles.secureDotText}>SECURE GEO</Text>
            </View>
          </View>
        </View>
      </View>
      <Pressable style={styles.avatarBtn} hitSlop={8}>
        <User size={18} color={COLORS.slate500} />
      </Pressable>
    </View>
  );
}

function TelemetryCard() {
  return (
    <View style={styles.card}>
      <View style={styles.telemetryTop}>
        <View style={styles.inspectorAvatar}>
          <User size={20} color={COLORS.blue600} />
        </View>
        <View style={styles.telemetryInfo}>
          <Text style={styles.inspectorName}>Inspector Rajesh Kumar</Text>
          <Text style={styles.inspectorSub}>
            PMU-DL-2025-8831 • New Delhi Central
          </Text>
        </View>
      </View>
      <View style={styles.telemetryDivider} />
      <View style={styles.telemetryBottom}>
        <View style={styles.rowCenter}>
          <View style={styles.greenDot} />
          <Text style={styles.telemetryText}>
            Cache Active • ±2.8m Accuracy
          </Text>
        </View>
        <View style={styles.batteryBadge}>
          <BatteryMedium size={14} color={COLORS.green600} />
          <Text style={styles.batteryText}>82%</Text>
        </View>
      </View>
    </View>
  );
}

function SurpriseMissionCard() {
  return (
    <View style={styles.heroCard}>
      <View style={styles.heroTopRow}>
        <View style={styles.rowCenter}>
          <View style={styles.redDot} />
          <Text style={styles.heroTag}>SURPRISE MISSION</Text>
        </View>
        <Text style={styles.heroDistance}>1.8 km</Text>
      </View>

      <View style={styles.heroTitleRow}>
        <Text style={styles.heroTitle}>Jan Seva Rehabilitation Center</Text>
        <View style={styles.riskPillRed}>
          <Text style={styles.riskPillRedText}>High Risk (84)</Text>
        </View>
      </View>
      <Text style={styles.heroSubLabel}>
        De-addiction Facility • Geofence Enforced
      </Text>

      <View style={styles.anomalyBox}>
        <TriangleAlert size={16} color={COLORS.red600} strokeWidth={2.25} />
        <Text style={styles.anomalyText}>
          Anomaly: Staffing Discrepancy (42% variance)
        </Text>
      </View>

      <View style={styles.heroActionRow}>
        <Pressable style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Start Check-in & Route</Text>
          <ChevronRight size={18} color="#FFFFFF" />
        </Pressable>
        <Pressable style={styles.squareIconBtn}>
          <Target size={18} color={COLORS.slate700} />
        </Pressable>
        <Pressable style={styles.squareIconBtn}>
          <Bell size={18} color={COLORS.slate700} />
        </Pressable>
      </View>
    </View>
  );
}

function AssignedTodaySection() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeader}>Assigned Today (2 Left)</Text>
        <Pressable style={styles.filterBtn}>
          <SlidersHorizontal size={16} color={COLORS.slate700} />
          <Text style={styles.filterBtnText}>Filter</Text>
        </Pressable>
      </View>

      <TaskCardPending
        title="Prerna Senior Care"
        riskLabel="Risk 52"
        subtitle="Geriatric Welfare • 4.2 km away"
      />
      <TaskCardSynced
        title="Uday Children Center"
        subtitle="Child Care & Shelter Home • 8.5 km"
        subInfo="10:45 AM • Hash #8F2A9C"
      />
    </View>
  );
}

function TaskCardPending({
  title,
  riskLabel,
  subtitle,
}: {
  title: string;
  riskLabel: string;
  subtitle: string;
}) {
  return (
    <View style={styles.taskCard}>
      <View style={styles.taskTopRow}>
        <Text style={styles.taskTitle}>{title}</Text>
        <View style={styles.riskPillBlue}>
          <Text style={styles.riskPillBlueText}>{riskLabel}</Text>
        </View>
      </View>
      <Text style={styles.taskSubtitle}>{subtitle}</Text>
      <Pressable style={styles.navigateBtn}>
        <Compass size={16} color={COLORS.blue600} />
        <Text style={styles.navigateBtnText}>Navigate & Start Audit</Text>
      </Pressable>
    </View>
  );
}

function TaskCardSynced({
  title,
  subtitle,
  subInfo,
}: {
  title: string;
  subtitle: string;
  subInfo: string;
}) {
  return (
    <View style={styles.taskCard}>
      <View style={styles.taskTopRow}>
        <Text style={styles.taskTitle}>{title}</Text>
        <View style={styles.syncedPill}>
          <CheckCircle2 size={13} color={COLORS.green600} />
          <Text style={styles.syncedPillText}>Synced</Text>
        </View>
      </View>
      <Text style={styles.taskSubtitle}>{subtitle}</Text>
      <View style={styles.syncedBottomRow}>
        <Text style={styles.subInfoText}>{subInfo}</Text>
        <Pressable hitSlop={6}>
          <Text style={styles.viewSummaryLink}>View Summary</Text>
        </Pressable>
      </View>
    </View>
  );
}

function FooterTelemetryTag() {
  return (
    <View style={styles.footerTag}>
      <ShieldCheck size={13} color={COLORS.slate400} />
      <Text style={styles.footerTagText}>
        DOSJE SOVEREIGN TELEMETRY ACTIVE • V4.2.1-PROD
      </Text>
    </View>
  );
}

function BottomNav({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (t: TabKey) => void;
}) {
  const items: { key: TabKey; label: string }[] = [
    { key: 'dispatches', label: 'Dispatches' },
    { key: 'map', label: 'Map View' },
    { key: 'queue', label: 'Queue' },
    { key: 'profile', label: 'Profile' },
  ];

  return (
    <View style={styles.bottomNav}>
      {items.map((item) => {
        const isActive = active === item.key;
        const color = isActive ? COLORS.blue600 : COLORS.slate400;
        return (
          <Pressable
            key={item.key}
            style={styles.navItem}
            onPress={() => onChange(item.key)}
          >
            <View style={styles.navIconWrap}>
              {item.key === 'dispatches' && (
                <CheckCheck size={22} color={color} />
              )}
              {item.key === 'map' && <Compass size={22} color={color} />}
              {item.key === 'queue' && (
                <>
                  <FlaskConical size={22} color={color} />
                  <View style={styles.navBadge}>
                    <Text style={styles.navBadgeText}>1</Text>
                  </View>
                </>
              )}
              {item.key === 'profile' && (
                <BadgeCheck size={22} color={color} />
              )}
            </View>
            <Text
              style={[
                styles.navLabel,
                { color, fontWeight: isActive ? '700' : '500' },
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.select({ ios: 6, default: 14 }),
    paddingBottom: 14,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 1,
  },
  headerIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.blue50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.slate900,
    letterSpacing: -0.2,
  },
  govBadge: {
    backgroundColor: COLORS.blue600,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
  },
  govBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  headerSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  headerSubtitle: {
    fontSize: 12.5,
    color: COLORS.slate500,
    fontWeight: '500',
  },
  secureDotPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.green50,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 20,
  },
  secureDotText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: COLORS.green600,
    letterSpacing: 0.3,
  },
  avatarBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // shared
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.green500,
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.red600,
  },

  // Card base
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  telemetryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inspectorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.blue50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  telemetryInfo: {
    flexShrink: 1,
  },
  inspectorName: {
    fontSize: 15.5,
    fontWeight: '700',
    color: COLORS.slate900,
  },
  inspectorSub: {
    fontSize: 12.5,
    color: COLORS.slate500,
    marginTop: 2,
    fontWeight: '500',
  },
  telemetryDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  telemetryBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  telemetryText: {
    fontSize: 12.5,
    color: COLORS.slate700,
    fontWeight: '600',
  },
  batteryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.green50,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  batteryText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.green600,
  },

  // Hero card
  heroCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.red200,
    padding: 18,
    marginBottom: 20,
    shadowColor: COLORS.red600,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  heroTag: {
    fontSize: 11.5,
    fontWeight: '800',
    color: COLORS.red600,
    letterSpacing: 0.5,
  },
  heroDistance: {
    fontSize: 12.5,
    fontWeight: '700',
    color: COLORS.slate500,
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  heroTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.slate900,
    flexShrink: 1,
    letterSpacing: -0.3,
  },
  riskPillRed: {
    backgroundColor: COLORS.red100,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  riskPillRedText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: COLORS.red700,
  },
  heroSubLabel: {
    fontSize: 13,
    color: COLORS.slate500,
    fontWeight: '500',
    marginTop: 4,
  },
  anomalyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.red50,
    borderWidth: 1,
    borderColor: COLORS.red200,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 14,
  },
  anomalyText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: COLORS.red700,
    flexShrink: 1,
  },
  heroActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
  },
  primaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.blue600,
    borderRadius: 12,
    paddingVertical: 14,
    shadowColor: COLORS.blue600,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '700',
  },
  squareIconBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
  },

  // Section
  section: {
    marginBottom: 8,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.slate900,
    letterSpacing: -0.2,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: COLORS.card,
  },
  filterBtnText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: COLORS.slate700,
  },

  // Task cards
  taskCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  taskTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  taskTitle: {
    fontSize: 15.5,
    fontWeight: '700',
    color: COLORS.slate900,
    flexShrink: 1,
  },
  taskSubtitle: {
    fontSize: 12.5,
    color: COLORS.slate500,
    fontWeight: '500',
    marginTop: 4,
  },
  riskPillBlue: {
    backgroundColor: COLORS.blue100,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  riskPillBlueText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: COLORS.blue700,
  },
  syncedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.green50,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  syncedPillText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: COLORS.green600,
  },
  navigateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderWidth: 1.5,
    borderColor: COLORS.blue100,
    backgroundColor: COLORS.blue50,
    borderRadius: 11,
    paddingVertical: 12,
    marginTop: 14,
  },
  navigateBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: COLORS.blue600,
  },
  syncedBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  subInfoText: {
    fontSize: 12,
    color: COLORS.slate400,
    fontWeight: '600',
  },
  viewSummaryLink: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.blue600,
  },

  // Footer tag
  footerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
  },
  footerTagText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: COLORS.slate400,
    letterSpacing: 0.3,
  },

  // Bottom nav
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
    paddingBottom: Platform.select({ ios: 22, default: 12 }),
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navIconWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
  },
  navBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.red600,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  navBadgeText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
  },
  navLabel: {
    fontSize: 11,
  },
});
