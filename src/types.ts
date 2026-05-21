export interface MockDish {
  name: string;
  kcal: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  category: "밥류" | "국/찌개" | "반찬" | "디저트";
}

export interface Meal {
  id: string;
  schoolName: string;
  date: Date;
  dateKey: string;
  dayOfWeek: string;
  mealType: "중식" | "석식";
  title: string;
  dishes: string[];
  dishDetails: MockDish[];
  totalCalories: number;
  nutrition: {
    kcal: number;
    carbohydrate: number;
    protein: number;
    fat: number;
  };
  allergens: string[];
  proteinProgress?: number;
}
