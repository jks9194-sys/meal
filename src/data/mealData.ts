import { getWeekDates, formatDateKey } from "../utils/dateUtils";
import { MockDish, Meal } from "../types";

// Fixed template recipes that we map dynamically to Mon-Fri week dates
const MEAL_TEMPLATES = [
  // Monday (0)
  {
    lunch: {
      title: "치즈돈까스 정식",
      totalCalories: 845,
      allergens: ["우유 함유", "대두 함유", "돼지고기 함유", "밀 함유"],
      proteinProgress: 85,
      dishDetails: [
        { name: "친환경현미밥", kcal: 300, carbohydrate: 65, protein: 6, fat: 2, category: "밥류" },
        { name: "쇠고기미역국", kcal: 180, carbohydrate: 8, protein: 12, fat: 8, category: "국/찌개" },
        { name: "매콤돈육강정", kcal: 290, carbohydrate: 18, protein: 20, fat: 12, category: "반찬" },
        { name: "시금치나물무침", kcal: 45, carbohydrate: 5, protein: 3, fat: 2, category: "반찬" },
        { name: "배추김치", kcal: 30, carbohydrate: 6, protein: 1, fat: 0.5, category: "반찬" }
      ] as MockDish[]
    },
    dinner: {
      title: "참치마요덮밥 정식",
      totalCalories: 720,
      allergens: ["계란 함유", "밀 함유", "우유 함유", "대두 함유"],
      proteinProgress: 60,
      dishDetails: [
        { name: "참치마요덮밥", kcal: 450, carbohydrate: 70, protein: 15, fat: 10, category: "밥류" },
        { name: "맑은우동국물", kcal: 120, carbohydrate: 15, protein: 4, fat: 3, category: "국/찌개" },
        { name: "수제마늘빵", kcal: 110, carbohydrate: 18, protein: 3, fat: 4, category: "디저트" },
        { name: "깍두기", kcal: 40, carbohydrate: 8, protein: 1, fat: 0.2, category: "반찬" }
      ] as MockDish[]
    }
  },
  // Tuesday (1)
  {
    lunch: {
      title: "매콤닭갈비 식단",
      totalCalories: 830,
      allergens: ["대두 함유", "닭고기 함유", "밀 함유"],
      proteinProgress: 80,
      dishDetails: [
        { name: "흑미밥", kcal: 310, carbohydrate: 68, protein: 6, fat: 1.5, category: "밥류" },
        { name: "대구지리탕", kcal: 160, carbohydrate: 6, protein: 18, fat: 4, category: "국/찌개" },
        { name: "매콤닭갈비", kcal: 280, carbohydrate: 12, protein: 22, fat: 16, category: "반찬" },
        { name: "청포묵무침", kcal: 50, carbohydrate: 10, protein: 1, fat: 0.5, category: "반찬" },
        { name: "배추김치", kcal: 30, carbohydrate: 6, protein: 1, fat: 0.5, category: "반찬" }
      ] as MockDish[]
    },
    dinner: {
      title: "수제짜장면 소풍",
      totalCalories: 750,
      allergens: ["밀 함유", "돼지고기 함유", "대두 함유"],
      proteinProgress: 55,
      dishDetails: [
        { name: "돈육수제짜장면", kcal: 520, carbohydrate: 85, protein: 16, fat: 12, category: "밥류" },
        { name: "팽이버섯맑은국", kcal: 80, carbohydrate: 4, protein: 2, fat: 1, category: "국/찌개" },
        { name: "바삭군만두", kcal: 120, carbohydrate: 18, protein: 4, fat: 4, category: "디저트" },
        { name: "새콤단무지", kcal: 30, carbohydrate: 7, protein: 0, fat: 0, category: "반찬" }
      ] as MockDish[]
    }
  },
  // Wednesday (2)
  {
    lunch: {
      title: "수제함박스테이크 정식",
      totalCalories: 850,
      allergens: ["밀 함유", "대두 함유", "돼지고기 함유", "우유 함유"],
      proteinProgress: 85,
      dishDetails: [
        { name: "혼합잡곡밥", kcal: 320, carbohydrate: 70, protein: 7, fat: 2, category: "밥류" },
        { name: "돈육김치찌개", kcal: 210, carbohydrate: 10, protein: 14, fat: 12, category: "국/찌개" },
        { name: "수제함박스테이크", kcal: 260, carbohydrate: 16, protein: 18, fat: 14, category: "반찬" },
        { name: "마카로니콘샐러드", kcal: 120, carbohydrate: 14, protein: 2, fat: 7, category: "반찬" },
        { name: "배추김치", kcal: 30, carbohydrate: 6, protein: 1, fat: 0.5, category: "반찬" }
      ] as MockDish[]
    },
    dinner: {
      title: "참치마요와 미니우동",
      totalCalories: 720,
      allergens: ["밀 함유", "대두 함유", "우유 함유"],
      proteinProgress: 60,
      dishDetails: [
        { name: "참치마요덮밥", kcal: 440, carbohydrate: 68, protein: 14, fat: 12, category: "밥류" },
        { name: "미니꼬치우동", kcal: 200, carbohydrate: 24, protein: 4, fat: 3, category: "국/찌개" },
        { name: "단무지실파무침", kcal: 40, carbohydrate: 9, protein: 1, fat: 0.1, category: "반찬" },
        { name: "요구르트(유기농)", kcal: 40, carbohydrate: 10, protein: 1, fat: 0, category: "디저트" }
      ] as MockDish[]
    }
  },
  // Thursday (3)
  {
    lunch: {
      title: "소불고기 낙지 전골",
      totalCalories: 840,
      allergens: ["대두 함유", "밀 함유", "쇠고기 함유"],
      proteinProgress: 90,
      dishDetails: [
        { name: "발아현미밥", kcal: 300, carbohydrate: 65, protein: 6, fat: 2, category: "밥류" },
        { name: "낙지연포탕", kcal: 200, carbohydrate: 10, protein: 18, fat: 8, category: "국/찌개" },
        { name: "소불고기당면볶음", kcal: 260, carbohydrate: 12, protein: 20, fat: 14, category: "반찬" },
        { name: "데친브로콜리초장", kcal: 50, carbohydrate: 8, protein: 2, fat: 0.5, category: "반찬" },
        { name: "깍두기", kcal: 30, carbohydrate: 6, protein: 1, fat: 0.5, category: "반찬" }
      ] as MockDish[]
    },
    dinner: {
      title: "치킨 카레라이스",
      totalCalories: 730,
      allergens: ["밀 함유", "대두 함유", "닭고기 함유", "우유 함유"],
      proteinProgress: 65,
      dishDetails: [
        { name: "치킨카레라이스", kcal: 490, carbohydrate: 78, protein: 16, fat: 12, category: "밥류" },
        { name: "미소장국", kcal: 70, carbohydrate: 5, protein: 3, fat: 2, category: "국/찌개" },
        { name: "추억의샐러드빵", kcal: 140, carbohydrate: 20, protein: 4, fat: 5, category: "디저트" },
        { name: "배추김치", kcal: 30, carbohydrate: 6, protein: 1, fat: 0.5, category: "반찬" }
      ] as MockDish[]
    }
  },
  // Friday (4)
  {
    lunch: {
      title: "오삼불고기 쌈밥",
      totalCalories: 810,
      allergens: ["대두 함유", "밀 함유", "오징어 함유", "돼지고기 함유"],
      proteinProgress: 82,
      dishDetails: [
        { name: "영양기장밥", kcal: 310, carbohydrate: 67, protein: 6, fat: 1.5, category: "밥류" },
        { name: "꽃게얼큰탕", kcal: 180, carbohydrate: 8, protein: 16, fat: 6, category: "국/찌개" },
        { name: "매콤오삼불고기", kcal: 240, carbohydrate: 14, protein: 18, fat: 11, category: "반찬" },
        { name: "아삭숙주나물", kcal: 50, carbohydrate: 5, protein: 3, fat: 2, category: "반찬" },
        { name: "배추김치", kcal: 30, carbohydrate: 6, protein: 1, fat: 0.5, category: "반찬" }
      ] as MockDish[]
    },
    dinner: {
      title: "고소한 새우필라프",
      totalCalories: 740,
      allergens: ["새우 함유", "계란 함유", "밀 함유", "토마토 함유"],
      proteinProgress: 70,
      dishDetails: [
        { name: "새우베이컨필라프", kcal: 440, carbohydrate: 68, protein: 12, fat: 14, category: "밥류" },
        { name: "부드러운계란국", kcal: 120, carbohydrate: 4, protein: 8, fat: 6, category: "국/찌개" },
        { name: "허니버터감자튀김", kcal: 150, carbohydrate: 20, protein: 2, fat: 8, category: "디저트" },
        { name: "새콤깍두기", kcal: 30, carbohydrate: 6, protein: 1, fat: 0.5, category: "반찬" }
      ] as MockDish[]
    }
  }
];

const DAYS_SHORT = ["월", "화", "수", "목", "금"];

/**
 * Dynamically generates 10 meals (5 lunch, 5 dinner) for the Monday-Friday week dates in Asia/Seoul.
 */
export function getMockMealsForWeek(baseDate: Date): Meal[] {
  const weekDates = getWeekDates(baseDate);
  const meals: Meal[] = [];

  for (let i = 0; i < 5; i++) {
    const curDate = weekDates[i];
    const curDateKey = formatDateKey(curDate);
    const dayName = DAYS_SHORT[i];
    const template = MEAL_TEMPLATES[i];

    // Build Lunch (중식)
    const lunchNutrition = calculateTotals(template.lunch.dishDetails);
    meals.push({
      id: `${curDateKey}-lunch`,
      schoolName: "씨마스고등학교",
      date: curDate,
      dateKey: curDateKey,
      dayOfWeek: dayName,
      mealType: "중식",
      title: template.lunch.title,
      dishes: template.lunch.dishDetails.map(d => d.name),
      dishDetails: template.lunch.dishDetails,
      totalCalories: template.lunch.totalCalories,
      nutrition: lunchNutrition,
      allergens: template.lunch.allergens,
      proteinProgress: template.lunch.proteinProgress
    });

    // Build Dinner (석식)
    const dinnerNutrition = calculateTotals(template.dinner.dishDetails);
    meals.push({
      id: `${curDateKey}-dinner`,
      schoolName: "씨마스고등학교",
      date: curDate,
      dateKey: curDateKey,
      dayOfWeek: dayName,
      mealType: "석식",
      title: template.dinner.title,
      dishes: template.dinner.dishDetails.map(d => d.name),
      dishDetails: template.dinner.dishDetails,
      totalCalories: template.dinner.totalCalories,
      nutrition: dinnerNutrition,
      allergens: template.dinner.allergens,
      proteinProgress: template.dinner.proteinProgress
    });
  }

  return meals;
}

function calculateTotals(dishes: MockDish[]) {
  return dishes.reduce(
    (acc, cur) => {
      acc.kcal += cur.kcal;
      acc.carbohydrate += cur.carbohydrate;
      acc.protein += cur.protein;
      acc.fat += cur.fat;
      return acc;
    },
    { kcal: 0, carbohydrate: 0, protein: 0, fat: 0 }
  );
}
