import { useState } from "react";
import { AnimatePresence } from "motion/react";
import AppHeader from "./components/AppHeader";
import BottomNavBar from "./components/BottomNavBar";
import HomeView from "./components/HomeView";
import CalendarView from "./components/CalendarView";
import CalculatorView from "./components/CalculatorView";
import ProfileView from "./components/ProfileView";
import { getTodayKST, getDefaultSelectedDate, formatDateKey, formatKoreanDate } from "./utils/dateUtils";
import { getMockMealsForWeek } from "./data/mealData";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("홈");

  // Retrieve today's KST date (shifted to Asia/Seoul regardless of container environment timezone)
  const today = getTodayKST();
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;

  // Retrieve default selected date based on weekdays/weekend rules
  const defaultSelectedDate = getDefaultSelectedDate(today);

  // Home screen targets next Monday's meals if active weekend is Saturday or Sunday (Way B)
  const homeDisplayDate = isWeekend
    ? (today.getDay() === 6
        ? new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000) // Sat -> Mon (add 2 days)
        : new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000) // Sun -> Mon (add 1 day)
      )
    : today;

  // Generate mock meals for current week and next week to guarantee seamless coverage across Sat/Sun
  const currentWeekMeals = getMockMealsForWeek(today);
  
  const nextWeekDate = new Date(today);
  nextWeekDate.setDate(today.getDate() + 7);
  const nextWeekMeals = getMockMealsForWeek(nextWeekDate);

  // Unified multi-week meals database containing 20 total meals
  const allMeals = [...currentWeekMeals, ...nextWeekMeals];

  const handleNotificationsClick = () => {
    alert("알림 설정은 프로필 탭에서 켜고 끌 수 있습니다.");
  };

  const handleSettingsClick = () => {
    setActiveTab("프로필");
  };

  return (
    <div className="min-h-screen bg-[#f8faf4] dark:bg-[#12140e] text-[#191c19] dark:text-[#eff1eb] flex justify-center selection:bg-[#c9f17c]/60">
      {/* Maximum viewport constraint matching dynamic school meal prototype app width (390px layout) */}
      <div className="w-full max-w-[390px] min-h-screen relative flex flex-col bg-[#f8faf4] dark:bg-[#12140e] pb-[100px] pt-[80px]">
        {/* Persistent App Header */}
        <AppHeader
          activeTab={activeTab}
          onNotificationsClick={handleNotificationsClick}
          onSettingsClick={handleSettingsClick}
        />

        {/* Dynamic Context Canvas */}
        <main className="flex-1 px-5 py-2 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === "홈" && (
              <HomeView
                key="home"
                today={homeDisplayDate}
                meals={allMeals}
                isWeekend={isWeekend}
                onNavigateToTab={setActiveTab}
              />
            )}

            {activeTab === "식단표" && (
              <CalendarView
                key="calendar"
                baseDate={today}
                meals={allMeals}
                initialSelectedDate={defaultSelectedDate}
              />
            )}

            {activeTab === "영양계산" && (
              <CalculatorView
                key="calculator"
                today={homeDisplayDate}
                meals={allMeals}
                isWeekend={isWeekend}
              />
            )}

            {activeTab === "프로필" && (
              <ProfileView key="profile" />
            )}
          </AnimatePresence>
        </main>

        {/* Tactile Bottom Tab Bar Navigation */}
        <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
