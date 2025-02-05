import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

    
export enum DaysOfWeek {
  'Sunday' = 0,
  'Monday' = 1,
  'Tuesday' = 2,
  'Wednesday' = 3,
  'Thursday' = 4,
  'Friday' = 5,
  'Saturday' = 6,
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getWeek(date: Date): Date[] {
  const start = new Date(date)
  start.setDate(start.getDate() - start.getDay() + 1)

  return Array(5)
    .fill(0)
    .map((_, i) => {
      const day = new Date(start)
      day.setDate(day.getDate() + i)
      return day
    })
}

export function dateFormatter(date: Date): string {
  return date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })
}
