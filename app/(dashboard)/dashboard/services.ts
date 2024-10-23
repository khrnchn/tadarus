"use server";

// Environment variable for the API base URL
const url = process.env.WAKTU_SOLAT_BASE_URL;

// Interface for the API prayer times response
export interface PrayerData {
  hijri: string;
  day: number;
  fajr: number;
  syuruk: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
}

// Interface for UI display of prayer times
export interface Prayer {
  name: string;
  time: string;
}

// Interface for the complete prayer times response
export interface PrayerTimes {
  zone: string;
  year: number;
  month: string;
  last_updated: Date;
  prayers: PrayerData[];
}

/**
 * Gets today's prayer times from the prayers array
 * @param prayers Array of prayer times for the month
 * @returns PrayerData object for today or null if not found
 */
const getTodaysPrayers = (prayers: PrayerData[]): PrayerData | null => {
  const today = new Date();
  const currentDay = today.getDate();

  // Find prayer times for current day
  return prayers.find((prayer) => prayer.day === currentDay) || null;
};

/**
 * Converts a Unix timestamp to formatted time string
 * @param unixTime Unix timestamp
 * @returns Formatted time string
 */
const formatTime = (unixTime: number): string => {
  const date = new Date(unixTime * 1000);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Transforms PrayerData to UI Prayer format
 * @param data PrayerData from API
 * @returns Array of Prayer objects for UI
 */
const transformPrayerData = (data: PrayerData): Prayer[] => {
  return [
    { name: "fajr", time: formatTime(data.fajr) },
    { name: "zuhur", time: formatTime(data.dhuhr) },
    { name: "asar", time: formatTime(data.asr) },
    { name: "maghrib", time: formatTime(data.maghrib) },
    { name: "isyak", time: formatTime(data.isha) },
  ];
};

/**
 * Fetches prayer times from the API for zone SGR01
 * @returns Promise<Prayer[] | null> Prayer times data for UI or null if fetch fails
 */
export const getPrayerTimes = async (): Promise<Prayer[] | null> => {
  try {
    if (!url) {
      throw new Error("WAKTU_SOLAT_BASE_URL environment variable is not set");
    }

    const response = await fetch(`${url}/v2/solat/SGR01`, {
      cache: "no-store",
      next: {
        tags: ["prayer-times"],
        revalidate: 3600, // Revalidate every hour
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching prayer times: ${response.statusText}`);
    }

    const data: PrayerTimes = await response.json();

    // Get today's prayer times
    const todaysPrayers = getTodaysPrayers(data.prayers);

    if (!todaysPrayers) {
      throw new Error("Could not find prayer times for today");
    }

    // Transform the data for UI display
    return transformPrayerData(todaysPrayers);
  } catch (error) {
    console.error("Failed to fetch prayer times:", error);
    return null;
  }
};
