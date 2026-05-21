/**
 * Date utility functions for Korea Standard Time (KST, Asia/Seoul)
 */

/**
 * Returns a Date object adjusted to Korea Standard Time (Asia/Seoul).
 * This shifts the date so that local getters (getFullYear, getMonth, getDate, getDay)
 * return KST numerical values directly, regardless of the system's local timezone.
 */
export function getTodayKST(): Date {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const kstOffset = 9 * 60 * 60 * 1000; // +9 Hours
  return new Date(utc + kstOffset);
}

/**
 * Returns the day of the week in Korean format, e.g., "목요일"
 */
export function getKoreanDayOfWeek(date: Date): string {
  const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  return days[date.getDay()];
}

/**
 * Returns the short day of the week in Korean format, e.g., "목"
 */
export function getKoreanShortDayOfWeek(date: Date): string {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[date.getDay()];
}

/**
 * Formats a Date object to Korean display format, e.g., "5월 15일 금요일"
 */
export function formatKoreanDate(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = getKoreanDayOfWeek(date);
  return `${month}월 ${day}일 ${dayOfWeek}`;
}

/**
 * Formats a Date object to "YYYYMMDD" format for NEIS API key
 */
export function formatDateKey(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

/**
 * Alias for formatDateKey to match NEIS style
 */
export function formatMealDateKey(date: Date): string {
  return formatDateKey(date);
}

/**
 * Returns an array of 5 Date objects representing the Mon-Fri of the week containing the date
 */
export function getWeekDates(date: Date): Date[] {
  const currentDay = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  // Monday of the week
  const dayOffsetFromMonday = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(date);
  monday.setDate(date.getDate() + dayOffsetFromMonday);

  const weekDates: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekDates.push(d);
  }
  return weekDates;
}

/**
 * Calculates which week of the month a date belongs to (e.g., "5월 3주차")
 */
export function getWeekOfMonth(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstDayDayOfWeek = firstDay.getDay(); // 0 is Sun, 1 is Mon, 5 is Fri, etc.

  const dayOfMonth = date.getDate();
  // Standard week adjustment:
  const weekNum = Math.ceil((dayOfMonth + (firstDayDayOfWeek === 0 ? 6 : firstDayDayOfWeek - 1)) / 7);
  return `${month + 1}월 ${weekNum}주차`;
}

/**
 * Default selected date logic:
 * - If today is weekday (Mon-Fri), return today.
 * - If today is Saturday, return Friday (직전 금요일) or next Monday.
 *   Here, to match Sunday next-Monday alignment, we return:
 *   - Saturday: Friday (subtract 1 day)
 *   - Sunday: next Monday (add 1 day)
 */
export function getDefaultSelectedDate(today: Date): Date {
  const day = today.getDay();
  if (day >= 1 && day <= 5) {
    return today;
  }
  const adjusted = new Date(today);
  if (day === 6) {
    // Saturday -> closest Friday
    adjusted.setDate(today.getDate() - 1);
  } else if (day === 0) {
    // Sunday -> closest next Monday
    adjusted.setDate(today.getDate() + 1);
  }
  return adjusted;
}
