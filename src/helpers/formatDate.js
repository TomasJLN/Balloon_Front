import { format } from "date-fns";

/**
 * Safely format a date string. Returns empty string if the date is invalid.
 * @param {string|Date} date - The date to format
 * @param {string} pattern - date-fns format pattern (e.g. "yyyy-MM-dd")
 * @param {object} [options] - date-fns format options (e.g. { locale: es })
 */
export const formatDate = (date, pattern, options) => {
  if (!date) return "";
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return "";
  return format(parsed, pattern, options);
};
