import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, CheckCircle2, PlusCircle, Save, Sparkles, Soup, Cake, HandPlatter, ShieldAlert } from "lucide-react";
import { Meal, MockDish } from "../types";

interface CalculatorViewProps {
  key?: string;
  today: Date;
  meals: Meal[];
  isWeekend: boolean;
}

type FoodCategory = "전체" | "밥류" | "국/찌개" | "반찬" | "디저트";

export default function CalculatorView({
  today,
  meals,
  isWeekend
}: CalculatorViewProps) {
  // Find today's lunch meal to pre-populate (if weekend, parent passes next Monday's meals)
  const todayLunch = useMemo(() => {
    return meals.find(m => m.mealType === "중식") || null;
  }, [meals]);

  // Dishes database helper (fallback to a standard list if todayLunch isn't loaded)
  const dishesSource = useMemo(() => {
    if (todayLunch && todayLunch.dishDetails) {
      return todayLunch.dishDetails;
    }
    return [
      { name: "친환경현미밥", kcal: 300, carbohydrate: 65, protein: 6, fat: 2, category: "밥류" },
      { name: "쇠고기미역국", kcal: 180, carbohydrate: 8, protein: 12, fat: 8, category: "국/찌개" },
      { name: "매콤돈육강정", kcal: 290, carbohydrate: 18, protein: 20, fat: 12, category: "반찬" },
      { name: "시금치나물무침", kcal: 45, carbohydrate: 5, protein: 3, fat: 2, category: "반찬" },
      { name: "배추김치", kcal: 30, carbohydrate: 6, protein: 1, fat: 0.5, category: "반찬" }
    ] as MockDish[];
  }, [todayLunch]);

  // Select all by default to match screenshot "380g" or similar
  const [selectedDishNames, setSelectedDishNames] = useState<string[]>(() => {
    return dishesSource.slice(0, 3).map(d => d.name); // Default first 3 items checked as in third screenshot
  });

  const [activeCategory, setActiveCategory] = useState<FoodCategory>("전체");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Toggle selection
  const handleToggleDish = (name: string) => {
    if (selectedDishNames.includes(name)) {
      setSelectedDishNames(selectedDishNames.filter(n => n !== name));
    } else {
      setSelectedDishNames([...selectedDishNames, name]);
    }
  };

  // Calculate dynamic totals based on checked items
  const totals = useMemo(() => {
    return dishesSource
      .filter(d => selectedDishNames.includes(d.name))
      .reduce(
        (acc, d) => {
          acc.kcal += d.kcal;
          acc.carbohydrate += d.carbohydrate;
          acc.protein += d.protein;
          acc.fat += d.fat;
          return acc;
        },
        { kcal: 0, carbohydrate: 0, protein: 0, fat: 0 }
      );
  }, [dishesSource, selectedDishNames]);

  // Filter dishes by category horizontal-chips view
  const filteredDishes = useMemo(() => {
    if (activeCategory === "전체") return dishesSource;
    return dishesSource.filter(d => d.category === activeCategory);
  }, [dishesSource, activeCategory]);

  const categories: FoodCategory[] = ["전체", "밥류", "국/찌개", "반찬", "디저트"];

  // Recommend standards (Lunch-specific scale)
  const targetKcal = 850;
  const targetProtein = 35;
  const targetCarbs = 130;
  const targetFat = 30;

  const proteinProgress = Math.min(100, Math.round((totals.protein * 100) / targetProtein));
  const carbsProgress = Math.min(100, Math.round((totals.carbohydrate * 100) / targetCarbs));
  const fatProgress = Math.min(100, Math.round((totals.fat * 100) / targetFat));

  const handleSaveResult = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Category Icon Generator
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "밥류":
        return <Soup className="w-5 h-5 text-[#3c5500]" />;
      case "국/찌개":
        return <Soup className="w-5 h-5 text-secondary stroke-[2.5]" />;
      case "반찬":
        return <HandPlatter className="w-5 h-5 text-[#606a3f]" />;
      case "디저트":
        return <Cake className="w-5 h-5 text-amber-600" />;
      default:
        return <HandPlatter className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryThemeClass = (category: string) => {
    switch (category) {
      case "밥류":
        return "bg-[#c9f17c]/20 text-[#3c5500]";
      case "국/찌개":
        return "bg-amber-100 dark:bg-amber-950/40 text-amber-700";
      case "반찬":
        return "bg-emerald-50 text-emerald-700";
      case "디저트":
        return "bg-rose-50 text-rose-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 pb-20"
    >
      {/* Dynamic Success Alert Banner */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#3c5500] text-white py-3 px-6 rounded-2xl shadow-lg border border-[#c9f17c]/30 flex items-center gap-2.5 max-w-[350px] font-sans"
          >
            <Sparkles className="w-4 h-4 text-[#c9f17c] fill-[#c9f17c]" />
            <span className="text-[13px] font-medium">영양 계산표가 기기에 저장되었습니다!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calories Overview Bento Panel */}
      <section className="bg-white dark:bg-[#191c19] rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(79,111,0,0.06)] flex flex-col gap-5 border border-[#e1e3dd]/35 relative overflow-hidden">
        {/* Decorative ambient badge icon background */}
        <div className="absolute top-2 right-2 p-3 opacity-5 pointer-events-none">
          <Calculator className="w-[100px] h-[100px] text-[#3c5500]" />
        </div>

        <div>
          <h2 className="text-[18px] font-bold text-[#3c5500] dark:text-[#add463] flex items-center gap-2 font-sans">
            오늘의 선택 영양
            <Sparkles className="w-4 h-4 text-[#3c5500] dark:text-[#add4 add463]" />
          </h2>
          <p className="text-[12px] text-[#444939] dark:text-[#c4c9b4] mt-0.5 font-sans leading-none">
            권장량 대비 섭취량 ({todayLunch ? `${todayLunch.dayOfWeek}요일 중식` : "오늘"} 기준)
          </p>
        </div>

        <div className="flex items-end gap-1.5 z-10 pl-0.5">
          <span className="text-[32px] font-extrabold text-[#191c19] dark:text-white font-sans leading-none">
            {totals.kcal}
          </span>
          <span className="text-[13px] text-[#444939] dark:text-[#c4c9b4] font-medium pb-1 font-sans">
            kcal
          </span>
        </div>

        <div className="flex flex-col gap-3.5 z-10">
          {/* Protein */}
          <div>
            <div className="flex justify-between text-[11px] mb-1 pl-0.5 font-sans">
              <span className="text-[#191c19] dark:text-[#eff1eb] font-medium">단백질</span>
              <span className="text-[#3c5500] dark:text-[#add463] font-bold">
                {totals.protein}g <span className="opacity-60 font-normal">({proteinProgress}%)</span>
              </span>
            </div>
            <div className="w-full h-2 bg-[#edefe9] dark:bg-[#2e312d] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3c5500] rounded-full transition-all duration-300"
                style={{ width: `${proteinProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Carbo */}
          <div>
            <div className="flex justify-between text-[11px] mb-1 pl-0.5 font-sans">
              <span className="text-[#191c19] dark:text-[#eff1eb] font-medium">탄수화물</span>
              <span className="text-[#536500] dark:text-[#b9d164] font-bold">
                {totals.carbohydrate}g <span className="opacity-60 font-normal">({carbsProgress}%)</span>
              </span>
            </div>
            <div className="w-full h-2 bg-[#edefe9] dark:bg-[#2e312d] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#536500] rounded-full transition-all duration-300"
                style={{ width: `${carbsProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Fat */}
          <div>
            <div className="flex justify-between text-[11px] mb-1 pl-0.5 font-sans">
              <span className="text-[#191c19] dark:text-[#eff1eb] font-medium">지방</span>
              <span className="text-[#485229] dark:text-[#c1cc98] font-bold">
                {totals.fat}g <span className="opacity-60 font-normal">({fatProgress}%)</span>
              </span>
            </div>
            <div className="w-full h-2 bg-[#edefe9] dark:bg-[#2e312d] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#485229] rounded-full transition-all duration-300"
                style={{ width: `${fatProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Checklist panel */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between pl-1">
          <h3 className="text-[18px] font-bold text-[#191c19] dark:text-white font-sans">
            메뉴 담기
          </h3>
          <span className="text-[12px] font-bold text-[#444939] bg-[#f2f4ee] px-3 py-1 rounded-full font-sans">
            {selectedDishNames.length}개 선택됨
          </span>
        </div>

        {/* Categories Chips scrolling */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 snap-x scrollbar-none">
          {categories.map(cat => {
            const isCatActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`snap-start flex-none px-4 py-2 text-[12px] font-bold rounded-xl border border-transparent transition-colors ${
                  isCatActive
                    ? "bg-[#3c5500] text-white shadow-sm"
                    : "bg-white dark:bg-[#191c19] border-[#e1e3dd]/80 text-[#444939] dark:text-[#c4c9b4] hover:bg-[#f2f4ee]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dishes Checklist map */}
        <div className="flex flex-col gap-3 font-sans">
          <AnimatePresence mode="popLayout">
            {filteredDishes.map(dish => {
              const isChecked = selectedDishNames.includes(dish.name);

              return (
                <motion.div
                  key={dish.name}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleToggleDish(dish.name)}
                  className={`rounded-2xl p-4 flex items-center justify-between cursor-pointer border-2 transition-all shadow-sm active:scale-[0.98] ${
                    isChecked
                      ? "bg-white border-[#3c5500] dark:bg-[#191c19]"
                      : "bg-[#ffffff]/60 dark:bg-[#191c19]/30 border-transparent hover:border-[#e1e3dd]"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center ${getCategoryThemeClass(dish.category)}`}>
                      {getCategoryIcon(dish.category)}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#191c19] dark:text-white">
                        {dish.name}
                      </h4>
                      <p className="text-[11px] text-[#444939]/80 dark:text-[#c4c9b4] mt-[3px] font-sans">
                        탄 {dish.carbohydrate}g · 단 {dish.protein}g · 지 {dish.fat}g
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[15px] font-bold ${isChecked ? "text-[#3c5500] dark:text-[#add463]" : "text-[#444939]"}`}>
                      {dish.kcal}
                      <span className="text-[10px] font-normal opacity-80 ml-0.5">kcal</span>
                    </span>
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-[#3c5500] fill-[#c9f17c]/10" />
                    ) : (
                      <PlusCircle className="w-5 h-5 text-[#444939]/40" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* Floating anchor button container padded for footer */}
      <div className="fixed bottom-[80px] left-0 right-0 max-w-[390px] mx-auto px-5 py-4 bg-gradient-to-t from-[#f8faf4] via-[#f8faf4]/90 to-transparent z-40 pointer-events-none flex justify-center">
        <button
          onClick={handleSaveResult}
          className="w-full bg-[#3c5500] text-white font-bold py-3.5 rounded-xl shadow-md pointer-events-auto hover:bg-[#3c5500]/95 active:translate-y-[1px] active:shadow-sm transition-all flex items-center justify-center gap-2 text-[14px] font-sans"
        >
          <Save className="w-[16px] h-[16px]" />
          <span>계산 결과 저장하기</span>
        </button>
      </div>
    </motion.div>
  );
}
