import { ReactNode, useMemo, useState } from "react";
import {
  Bell,
  Calendar,
  CreditCard,
  DollarSign,
  HelpCircle,
  Shield,
  Star,
  Tag,
  User,
} from "lucide-react";
import AccountIntro from "../../components/account/accountIntro/accountIntro";
import AccountSidebar from "../../components/account/accountSidebar/accountSidebar";
import ProfileTab from "../../components/account/profileTab/profileTab";
import TabEmptyState from "../../components/account/tabEmptyState/tabEmptyState";
import SettingTap from "../../components/account/settingTap/settingTap";
import PageTransition from "../../components/pageTransition/pageTransition";
import PaymentTap from "../../components/paymentTap/PaymentTap";
import CommunicationsTab from "../../components/account/communicationsTab/communicationsTab";
import CouponsTab from "../../components/account/couponsTab/couponsTab";
import ReviewsTab from "../../components/account/reviewsTab/reviewsTab";
import HelpTab from "../../components/account/helpTab/helpTab";
import BookingsTab from "../../components/account/bookingsTab/bookingsTab";
import { useGetUserByIdQuery } from "../../store/api/user.api";
import { storage } from "../../utils/storage";

type TabId =
  | "profile"
  | "bookings"
  | "communications"
  | "payments"
  | "coupons"
  | "credits"
  | "reviews"
  | "security"
  | "help";

const tabs: Array<{
  id: TabId;
  label: string;
  description: string;
  icon: ReactNode;
}> = [
  // profile tab
  {
    id: "profile",
    label: "Profile",
    description: "Provide your personal details and travel documents",
    icon: <User className="w-5 h-5" />,
  },
  // bookings tab
  {
    id: "bookings",
    label: "My Bookings",
    description: "View and manage your hotel reservations",
    icon: <Calendar className="w-5 h-5" />,
  },
  // communication tab
  {
    id: "communications",
    label: "Communications",
    description: "Control which notifications you get",
    icon: <Bell className="w-5 h-5" />,
  },
  // payments tab
  {
    id: "payments",
    label: "Payment methods",
    description: "View saved payment methods",
    icon: <CreditCard className="w-5 h-5" />,
  },
  // coupons tab
  {
    id: "coupons",
    label: "Coupons",
    description: "View your available coupons",
    icon: <Tag className="w-5 h-5" />,
  },
  // reviews tab
  {
    id: "reviews",
    label: "Reviews",
    description: "Read reviews you've shared",
    icon: <Star className="w-5 h-5" />,
  },
  // security tab
  {
    id: "security",
    label: "Security and settings",
    description: "Update your email or password",
    icon: <Shield className="w-5 h-5" />,
  },
  // help tab
  {
    id: "help",
    label: "Help and feedback",
    description: "Get customer support",
    icon: <HelpCircle className="w-5 h-5" />,
  },
];

const emptyCopy: Record<TabId, { title: string; message: string }> = {
  profile: {
    title: "",
    message: "",
  },
  bookings: {
    title: "No bookings yet",
    message:
      "Your hotel reservations will appear here once you make a booking.",
  },
  communications: {
    title: "No communications preferences yet",
    message:
      "Select how you would like to hear from us once this feature is enabled.",
  },
  payments: {
    title: "No payment methods saved",
    message: "Add your cards here to speed up checkout on future bookings.",
  },
  coupons: {
    title: "Coupons will appear here",
    message: "Keep an eye on this tab for the latest deals.",
  },
  credits: {
    title: "Credits overview",
    message: "Track travel credits and vouchers as soon as you earn them.",
  },
  reviews: {
    title: "Your reviews",
    message:
      "Review history will show up in this tab after you submit feedback.",
  },
  security: {
    title: "Security controls",
    message: "Manage security alerts, multi-factor auth, and passwords here.",
  },
  help: {
    title: "Support center",
    message: "Reach out for help or send feedback when the tools are live.",
  },
};

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Account() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const userId = storage.getUser()?.id;
  const { data: profile } = useGetUserByIdQuery(userId!, { skip: !userId });

  const activeTabCopy = useMemo(() => emptyCopy[activeTab], [activeTab]);

  const userName = profile?.name || profile?.username || "User";

  return (
    <PageTransition>
      <div className="bg-background min-h-screen py-10 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Account intro , to say hi and etc. */}
          <AccountIntro
            greeting={`Hi, ${userName}`}
            headline="My Account"
            subtext="Manage your personal details, preferences, and saved travelers."
          />
          {/* Account sidebar , that sshows the tabs , we're passing tabs and activeTab and onTabChange set Active */}
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <AccountSidebar
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab as TabId)}
            />
            {/* Tab Content */}
            <section>
              {activeTab === "profile" && <ProfileTab />}
              {activeTab === "bookings" && <BookingsTab />}
              {activeTab === "communications" && <CommunicationsTab />}
              {activeTab === "payments" && <PaymentTap />}
              {activeTab === "coupons" && <CouponsTab />}
              {activeTab === "reviews" && <ReviewsTab />}
              {activeTab === "security" && <SettingTap />}
              {activeTab === "help" && <HelpTab />}
              {activeTab === "credits" && (
                <TabEmptyState
                  title={activeTabCopy.title}
                  message={activeTabCopy.message}
                />
              )}
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
