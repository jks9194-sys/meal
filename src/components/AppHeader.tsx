import { UtensilsCrossed, Bell, Settings } from "lucide-react";

interface AppHeaderProps {
  activeTab: string;
  onSettingsClick?: () => void;
  onNotificationsClick?: () => void;
}

export default function AppHeader({
  activeTab,
  onSettingsClick,
  onNotificationsClick
}: AppHeaderProps) {
  const isProfile = activeTab === "프로필";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-[64px] max-w-[390px] mx-auto bg-[#ffffff]/90 dark:bg-[#191c19]/90 backdrop-blur-md shadow-[0px_4px_20px_rgba(79,111,0,0.06)] border-b border-[#e1e3dd]/30">
      <button
        aria-label="Menu"
        className="text-[#3c5500] hover:opacity-80 transition-opacity flex items-center justify-center p-2 rounded-full hover:bg-[#edefe9]/50 active:scale-95 duration-100"
      >
        <UtensilsCrossed className="w-[20px] h-[20px]" />
      </button>

      <h1 className="font-bold text-[18px] text-[#3c5500] dark:text-[#add463] text-center tracking-tight font-sans">
        씨마스고등학교 급식
      </h1>

      {isProfile ? (
        <button
          aria-label="Settings"
          onClick={onSettingsClick}
          className="text-[#3c5500] hover:opacity-80 transition-opacity flex items-center justify-center p-2 rounded-full hover:bg-[#edefe9]/50 active:scale-95 duration-100"
        >
          <Settings className="w-[18px] h-[18px]" />
        </button>
      ) : (
        <button
          aria-label="Notifications"
          onClick={onNotificationsClick}
          className="text-[#444939] hover:opacity-80 transition-opacity flex items-center justify-center p-2 rounded-full hover:bg-[#edefe9]/50 active:scale-95 duration-100"
        >
          <Bell className="w-[18px] h-[18px]" />
        </button>
      )}
    </header>
  );
}
