import { ReactNode, useMemo, useState } from "react";
import {
    Bell,
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
import PaymentTap from "../../components/PaymentTap/PaymentTap";

type TabId =
    | "profile"
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
    // credits tab
    {
        id: "credits",
        label: "Credits",
        description: "View your active airline credits",
        icon: <DollarSign className="w-5 h-5" />,
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
        message:
            "Manage security alerts, multi-factor auth, and passwords here.",
    },
    help: {
        title: "Support center",
        message: "Reach out for help or send feedback when the tools are live.",
    },
};

export default function Account() {
    const [activeTab, setActiveTab] = useState<TabId>("profile");

    const activeTabCopy = useMemo(() => emptyCopy[activeTab], [activeTab]);

    return (
        <PageTransition>
            <div className="bg-[#f7f7f9] min-h-screen py-10 px-4">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Account intro , to say hi and etc. */}
                    <AccountIntro
                        greeting="Hi, Anas"
                        headline="My Account"
                        subtext="Manage your personal details, preferences, and saved travelers."
                    />
                    {/* Account sidebar , that sshows the tabs , we're passing tabs and activeTab and onTabChange set Active */}
                    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
                        <AccountSidebar
                            tabs={tabs}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />
                        {/* here we add more tabs  */}
                        <section>
                            {activeTab === "profile" ? (
                                <ProfileTab />
                            ) : (
                                <TabEmptyState
                                    title={activeTabCopy.title}
                                    message={activeTabCopy.message}
                                />
                            )}
                            {/* this is a new tab */}

                            {/* {activeTab === "communications" ? (
              <CommTab />
            ) : (
              <TabEmptyState
                title={activeTabCopy.title}
                message={activeTabCopy.message}
              />
            )} */}

                            {activeTab === "payments" ? (
                                <PaymentTap />
                            ) : (
                                <TabEmptyState
                                    title={activeTabCopy.title}
                                    message={activeTabCopy.message}
                                />
                            )}

                            {activeTab === "security" ? (
                                <SettingTap />
                            ) : (
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
