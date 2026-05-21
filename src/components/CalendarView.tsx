import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, CalendarDays, Award } from "lucide-react";
import { Meal } from "../types";
import { getWeekDates, getWeekOfMonth, getKoreanShortDayOfWeek, formatDateKey } from "../utils/dateUtils";

interface CalendarViewProps {
  key?: string;
  baseDate: Date; // represents the default date calculated at start
  meals: Meal[];
  initialSelectedDate: Date;
}

export default function CalendarView({
  baseDate,
  meals,
  initialSelectedDate
}: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(initialSelectedDate);
  const selectedDateKey = formatDateKey(selectedDate);

  // Get current week dates (Mon-Fri) for baseDate
  const weekDates = getWeekDates(baseDate);

  // Filter meals for selected day
  const dailyMeals = meals.filter(m => m.dateKey === selectedDateKey);
  const lunchMeal = dailyMeals.find(m => m.mealType === "중식");
  const dinnerMeal = dailyMeals.find(m => m.mealType === "석식");

  const weekTitle = getWeekOfMonth(selectedDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6"
    >
      {/* Week Header Selector */}
      <section className="flex flex-col gap-3">
        <h2 className="text-[20px] font-bold text-[#191c19] dark:text-white flex items-center gap-2 font-sans tracking-tight">
          <CalendarDays className="w-5 h-5 text-[#3c5500]" />
          <span>{weekTitle} 주간 식단</span>
        </h2>

        {/* Dynamic Horizontal Week Days Selector Buttons */}
        <div className="flex gap-2.5 overflow-x-auto py-2 scrollbar-none snap-x">
          {weekDates.map((dateItem, index) => {
            const isSelected = formatDateKey(dateItem) === selectedDateKey;
            const dayOfWeekLabel = getKoreanShortDayOfWeek(dateItem);
            const dateNum = dateItem.getDate();

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(dateItem)}
                className={`snap-start flex flex-col items-center justify-center w-14 h-16 rounded-2xl flex-shrink-0 transition-all duration-200 active:scale-95 ${
                  isSelected
                    ? "bg-[#3c5500] text-white shadow-md shadow-[#3c5500]/15 translate-y-[1px]"
                    : "bg-[#edefe9] dark:bg-[#1e211c] text-[#444939] dark:text-[#c4c9b4] hover:bg-[#e1e3dd] dark:hover:bg-[#2e312d]"
                }`}
              >
                <span className={`text-[11px] font-medium leading-normal ${isSelected ? "text-white/80" : "opacity-80"}`}>
                  {dayOfWeekLabel}
                </span>
                <span className="text-[18px] font-bold mt-0.5 font-sans leading-none">
                  {dateNum}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Selected Day's Lunch and Dinner Details */}
      <div className="flex flex-col gap-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDateKey}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-5"
          >
            {/* Lunch Card */}
            {lunchMeal ? (
              <article className="bg-white dark:bg-[#191c19] rounded-[24px] p-5 shadow-[0px_4px_20px_rgba(79,111,0,0.06)] border border-[#e1e3dd]/35 flex flex-col gap-3.5">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2.5">
                    <Sun className="w-5 h-5 text-[#3c5500]" />
                    <h3 className="text-[16px] font-bold text-[#3c5500] dark:text-[#add463]">
                      중식
                    </h3>
                  </div>
                  <span className="text-[12px] font-bold text-[#444939] dark:text-[#c4c9b4] bg-[#f2f4ee] dark:bg-[#1e211c] px-3 py-1 rounded-full">
                    {lunchMeal.totalCalories} kcal
                  </span>
                </div>

                <div className="text-[15px] text-[#191c19] dark:text-[#eff1eb] flex flex-col gap-1.5 font-sans pl-1">
                  {lunchMeal.dishDetails.map((dish, dIdx) => (
                    <p key={dIdx} className={dIdx === 2 ? "font-bold text-[#3c5500]" : ""}>
                      {dish.name}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-1.5 pl-1">
                  {lunchMeal.allergens.map((allergen, aIdx) => (
                    <span
                      key={aIdx}
                      className="text-[11px] bg-[#dde8b2] text-[#414b23] px-2.5 py-1 rounded-full border border-[#c1cc98]/30 font-medium"
                    >
                      {allergen.replace(" 함유", "")}
                    </span>
                  ))}
                </div>

                {/* Protein Slider info */}
                {lunchMeal.proteinProgress && (
                  <div className="mt-2.5 bg-[#f2f4ee]/80 dark:bg-[#1e211c]/80 p-3.5 rounded-xl flex flex-col gap-2 border border-[#e1e3dd]/20">
                    <div className="flex justify-between items-center text-[12px]">
                      <span className="text-[#444939] dark:text-[#c4c9b4] font-medium">단백질 달성률</span>
                      <span className="text-[#3c5500] dark:text-[#add463] font-bold">
                        {lunchMeal.proteinProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-[#e1e3dd] dark:bg-[#2e312d] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#3c5500] h-1.5 rounded-full"
                        style={{ width: `${lunchMeal.proteinProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </article>
            ) : (
              <div className="bg-white dark:bg-[#191c19] rounded-[24px] p-8 text-center border border-dashed border-[#e1e3dd] text-sm text-[#444939]">
                선택된 날짜의 중식 정보가 없습니다.
              </div>
            )}

            {/* Dinner Card */}
            {dinnerMeal ? (
              <article className="bg-white dark:bg-[#191c19] rounded-[24px] p-5 shadow-[0px_4px_20px_rgba(79,111,0,0.06)] border border-[#e1e3dd]/35 flex flex-col gap-3.5">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2.5">
                    <Moon className="w-5 h-5 text-[#536500]" />
                    <h3 className="text-[16px] font-bold text-[#536500] dark:text-[#b9d164]">
                      석식
                    </h3>
                  </div>
                  <span className="text-[12px] font-bold text-[#444939] dark:text-[#c4c9b4] bg-[#f2f4ee] dark:bg-[#1e211c] px-3 py-1 rounded-full">
                    {dinnerMeal.totalCalories} kcal
                  </span>
                </div>

                <div className="text-[15px] text-[#191c19] dark:text-[#eff1eb] flex flex-col gap-1.5 font-sans pl-1">
                  {dinnerMeal.dishDetails.map((dish, dIdx) => (
                    <p key={dIdx} className={dIdx === 0 ? "font-bold text-[#536500]" : ""}>
                      {dish.name}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-1.5 pl-1">
                  {dinnerMeal.allergens.map((allergen, aIdx) => (
                    <span
                      key={aIdx}
                      className="text-[11px] bg-[#e1e3dd] text-[#444939] px-2.5 py-1 rounded-full border border-gray-300/35 font-medium"
                    >
                      {allergen.replace(" 함유", "")}
                    </span>
                  ))}
                </div>

                {/* Protein Slider info */}
                {dinnerMeal.proteinProgress && (
                  <div className="mt-2.5 bg-[#f2f4ee]/80 dark:bg-[#1e211c]/80 p-3.5 rounded-xl flex flex-col gap-2 border border-[#e1e3dd]/20">
                    <div className="flex justify-between items-center text-[12px]">
                      <span className="text-[#444939] dark:text-[#c4c9b4] font-medium">단백질 달성률</span>
                      <span className="text-[#536500] dark:text-[#b9d164] font-bold">
                        {dinnerMeal.proteinProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-[#e1e3dd] dark:bg-[#2e312d] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#536500] h-1.5 rounded-full"
                        style={{ width: `${dinnerMeal.proteinProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </article>
            ) : (
              <div className="bg-white dark:bg-[#191c19] rounded-[24px] p-8 text-center border border-dashed border-[#e1e3dd] text-sm text-[#444939]">
                선택된 날짜의 석식 정보가 없습니다.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
