import { ReactNode } from "react";

type TabDefinition<T extends string> = {
  id: T;
  label: string;
  description: string;
  icon: ReactNode;
};

type AccountSidebarProps<T extends string> = {
  tabs: Array<TabDefinition<T>>;
  activeTab: T;
  onTabChange: (tab: T) => void;
};

export default function AccountSidebar<T extends string>({
  tabs,
  activeTab,
  onTabChange,
}: AccountSidebarProps<T>) {
  return (
    <aside className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm">
      <nav className="space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`w-full flex items-start gap-4 px-4 py-3 rounded-2xl text-left transition-colors ${
              activeTab === tab.id
                ? "bg-blue-50 text-blue-700"
                : "hover:bg-slate-50 text-slate-700"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <span
              className={`p-2 rounded-xl ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {tab.icon}
            </span>
            <span className="flex-1">
              <span className="block font-semibold text-base">{tab.label}</span>
              <span className="block text-sm text-slate-500">
                {tab.description}
              </span>
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
