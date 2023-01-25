import { differenceInDays, isBefore } from "date-fns";

export abstract class DateUtils {
  public static dayIsLessThan(leftDate: Date, rightDate: Date): boolean {
    if (differenceInDays(leftDate, rightDate) === 0) return false;
    return isBefore(leftDate, rightDate);
  }
}
