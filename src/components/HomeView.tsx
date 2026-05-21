import { useState } from "react";
import { motion } from "motion/react";
import { Sun, Moon, Star, Heart, Calendar, Compass, AlertCircle, ArrowRight } from "lucide-react";
import { Meal } from "../types";
import { formatKoreanDate, formatDateKey } from "../utils/dateUtils";

interface HomeViewProps {
  key?: string;
  today: Date;
  meals: Meal[];
  isWeekend: boolean;
  onNavigateToTab?: (tab: string) => void;
}

export default function HomeView({
  today,
  meals,
  isWeekend,
  onNavigateToTab
}: HomeViewProps) {
  const [favorite, setFavorite] = useState(false);

  // Filter meals for the active target date
  // (In parent, if weekend, meals are generated for next Monday, so we filter by next Monday's dateKey)
  const activeDateKey = formatDateKey(today);
  const activeMeals = meals.filter(m => m.dateKey === activeDateKey);

  const lunchMeal = activeMeals.find(m => m.mealType === "중식");
  const dinnerMeal = activeMeals.find(m => m.mealType === "석식");

  // Hero section displays Lunch or a custom recommended meal
  const heroMeal = lunchMeal || dinnerMeal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6"
    >
      {/* Weekend Info Banner */}
      {isWeekend && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#ffeaf0] text-[#ba1a1a] p-4 rounded-2xl shadow-sm border border-[#ffdad6] flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#ba1a1a]" />
          <div>
            <h4 className="font-bold text-[14px]">오늘은 주말이라 급식이 없습니다.</h4>
            <p className="text-[12px] opacity-90 mt-1 leading-relaxed">
              가장 가까운 평일인 <span className="font-bold">다음 급식일 식단</span>을 불러왔습니다.
            </p>
          </div>
        </motion.div>
      )}

      {/* Hero Card */}
      {heroMeal ? (
        <section className="relative bg-white dark:bg-[#191c19] rounded-[24px] overflow-hidden shadow-[0px_4px_20px_rgba(79,111,0,0.08)] w-full group border border-[#e1e3dd]/10">
          <div className="h-[210px] w-full relative">
            <img
              alt="Delicious pork cutlet meal"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp3VIA_aLVHLQ25UQThlH1RV5BoVb2rPnZGoMpjvEjDnKrChH3YvMXCJSXA9icuRKzT45-EQ53hO1HMPK3rwIlQbM7CCptb9kqRoFm_EfMn7IB4vM26tdDOK57fUyZSvWwDRmzbSi6v_x9huY9ppizLEhSNIo3d9Rrb8aKhtejjRbJ8o6dDqLRHLvqaNxRQRhmmpHVFGUye7cdsmWJFQaoQERqP2vEokJoRd_lPf5RGO4RBZRxnLU8dDiwz9mMVbvnnxUmVoLqcBU"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

            {/* Recommendation badge */}
            <div className="absolute top-4 left-4 bg-[#dde8b2] text-[#171e00] px-3.5 py-1 rounded-full text-[12px] font-bold flex items-center gap-1 shadow-sm">
              {isWeekend ? (
                <>
                  <Compass className="w-3.5 h-3.5 text-[#3c5500]" />
                  <span>다음 급식일 추천</span>
                </>
              ) : (
                <>
                  <Star className="w-3.5 h-3.5 text-[#3c5500] fill-[#3c5500]" />
                  <span>오늘의 추천 급식</span>
                </>
              )}
            </div>

            {/* Favorite toggle */}
            <button
              onClick={() => setFavorite(!favorite)}
              aria-label="Add to favorites"
              className="absolute top-3 right-3 text-white transition-all p-2 rounded-full bg-black/35 backdrop-blur-md active:scale-90"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  favorite ? "text-[#ba1a1a] fill-[#ba1a1a]" : "text-white hover:text-[#ffdad6]"
                }`}
              />
            </button>

            {/* Hero details */}
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-[12px] font-medium opacity-90 mb-1 font-sans">
                {formatKoreanDate(today)} {isWeekend && <span className="text-[#c9f17c] font-bold ml-1.5">(월요일 식단)</span>}
              </p>
              <h2 className="text-[20px] font-bold drop-shadow-md text-white tracking-tight font-sans">
                {heroMeal.title}
              </h2>
            </div>

            {/* Calories overlay */}
            <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-[#191c19]/95 text-[#3c5500] dark:text-[#add463] px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-sm font-bold text-[12px] tracking-wide">
              {heroMeal.totalCalories} kcal
            </div>
          </div>
        </section>
      ) : (
        <div className="h-[210px] w-full flex items-center justify-center bg-[#edefe9] rounded-[24px]">
          <p className="text-sm text-[#444939]">등록된 식단이 없습니다.</p>
        </div>
      )}

      {/* Lunch Menu Card */}
      {lunchMeal && (
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-[#191c19] rounded-[24px] p-5 shadow-[0px_4px_20px_rgba(79,111,0,0.06)] border border-[#e1e3dd]/35"
        >
          <header className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-[#3c5500]" />
              <h3 className="font-bold text-[18px] text-[#3c5500] dark:text-[#add463]">
                {lunchMeal.mealType}
              </h3>
            </div>
            <span className="bg-[#f2f4ee] dark:bg-[#1e211c] text-[#444939] dark:text-[#c4c9b4] px-3 py-1 rounded-full text-[12px] font-bold">
              {lunchMeal.totalCalories} kcal
            </span>
          </header>

          <ul className="flex flex-col gap-3 text-[14px] text-[#191c19] dark:text-[#eff1eb] mb-5 font-sans">
            {lunchMeal.dishDetails.map((dish, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#536500] mt-[6px] flex-shrink-0"></span>
                <span className={idx === 2 ? "font-bold text-[#191c19] dark:text-white" : ""}>
                  {dish.name}
                </span>
                <span className="text-[11px] text-[#444939]/70 dark:text-[#c4c9b4]/70 ml-1.5 font-mono">
                  {dish.kcal}kcal
                </span>
              </li>
            ))}
          </ul>

          {lunchMeal.allergens && lunchMeal.allergens.length > 0 && (
            <div className="pt-4 border-t border-[#e1e3dd]/50 flex flex-wrap gap-2">
              {lunchMeal.allergens.map((allergen, idx) => (
                <span
                  key={idx}
                  className="bg-[#dde8b2] text-[#414b23] px-2.5 py-1 rounded-md text-[11px] font-medium border border-[#c1cc98]/50"
                >
                  {allergen}
                </span>
              ))}
            </div>
          )}
        </motion.article>
      )}

      {/* Dinner Menu Card */}
      {dinnerMeal && (
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-[#191c19] rounded-[24px] p-5 shadow-[0px_4px_20px_rgba(79,111,0,0.06)] border border-[#e1e3dd]/35"
        >
          <header className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-[#3c5500]" />
              <h3 className="font-bold text-[18px] text-[#3c5500] dark:text-[#add463]">
                {dinnerMeal.mealType}
              </h3>
            </div>
            <span className="bg-[#f2f4ee] dark:bg-[#1e211c] text-[#444939] dark:text-[#c4c9b4] px-3 py-1 rounded-full text-[12px] font-bold">
              {dinnerMeal.totalCalories} kcal
            </span>
          </header>

          <ul className="flex flex-col gap-3 text-[14px] text-[#191c19] dark:text-[#eff1eb] mb-5 font-sans">
            {dinnerMeal.dishDetails.map((dish, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#536500] mt-[6px] flex-shrink-0"></span>
                <span className={idx === 0 ? "font-bold text-[#191c19] dark:text-white" : ""}>
                  {dish.name}
                </span>
                <span className="text-[11px] text-[#444939]/70 dark:text-[#c4c9b4]/70 ml-1.5 font-mono">
                  {dish.kcal}kcal
                </span>
              </li>
            ))}
          </ul>

          {dinnerMeal.allergens && dinnerMeal.allergens.length > 0 && (
            <div className="pt-4 border-t border-[#e1e3dd]/50 flex flex-wrap gap-2">
              {dinnerMeal.allergens.map((allergen, idx) => (
                <span
                  key={idx}
                  className="bg-[#dde8b2] text-[#414b23] px-2.5 py-1 rounded-md text-[11px] font-medium border border-[#c1cc98]/50"
                >
                  {allergen}
                </span>
              ))}
            </div>
          )}
        </motion.article>
      )}

      {/* Quick Actions / Micro Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onClick={() => onNavigateToTab && onNavigateToTab("영양계산")}
        className="bg-[#f2f4ee] hover:bg-[#edefe9] dark:bg-[#1e211c] p-4 rounded-2xl cursor-pointer flex items-center justify-between transition-colors border border-[#e1e3dd]/35 group"
      >
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-[#3c5500]" />
          <div>
            <h4 className="text-[13px] font-bold text-[#191c19] dark:text-white">오늘의 영양성분이 궁굼한가요?</h4>
            <p className="text-[11px] text-[#444939] opacity-80 mt-0.5">식사를 선택하고 단단지 비율을 계산해 보세요.</p>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-[#3c5500] group-hover:translate-x-1 transition-transform" />
      </motion.div>
    </motion.div>
  );
}
