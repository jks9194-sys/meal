import { Home, CalendarDays, Calculator, User } from "lucide-react";

interface BottomNavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNavBar({
  activeTab,
  setActiveTab
}: BottomNavBarProps) {
  const tabs = [
    { id: "홈", label: "홈", icon: Home },
    { id: "식단표", label: "식단표", icon: CalendarDays },
    { id: "영양계산", label: "영양계산", icon: Calculator },
    { id: "프로필", label: "프로필", icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-4 pb-safe h-[80px] max-w-[390px] mx-auto bg-[#ffffff]/80 dark:bg-[#191c19]/80 backdrop-blur-md shadow-[0px_-4px_20px_rgba(79,111,0,0.06)] border-t border-[#e1e3dd]/30 rounded-t-2xl">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            aria-label={tab.label}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 transition-all active:scale-95 duration-100 ${
              isActive
                ? "bg-[#d2ea7a] text-[#576a00] rounded-full px-5 py-[6px] shadow-sm transform translate-y-[-1px]"
                : "text-[#444939] hover:bg-[#edefe9]/40 rounded-xl px-4 py-1"
            }`}
          >
            <Icon className={`w-[20px] h-[20px] ${isActive ? "stroke-[2.5px]" : "stroke-[2px]"}`} />
            <span className="text-[11px] font-medium mt-[3px] font-sans">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
