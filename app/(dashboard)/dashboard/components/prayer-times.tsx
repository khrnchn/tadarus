"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState, useMemo } from "react";

const PrayerTimeCard = ({ name, time, color } : { name: string, time: string, color: string }) => (
  <Card
    className={`${color} p-2 sm:p-4 rounded-lg shadow-lg border-2 sm:border-3 border-black transform transition-transform hover:scale-105`}
  >
    <h2 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-gray-800 capitalize">
      {name}
    </h2>
    <p className="text-lg sm:text-xl md:text-2xl font-mono font-bold text-gray-900">
      {time}
    </p>
  </Card>
);

const TimeDisplay = ({ currentDateTime } : { currentDateTime: Date }) => (
  <Card className="bg-gray-200 p-4 sm:p-6 rounded-lg shadow-lg border-2 sm:border-3 border-black">
    <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">
      today&apos;s date
    </h2>
    <p className="text-2xl sm:text-3xl font-mono font-bold text-gray-900">
      {currentDateTime.toLocaleTimeString()}
    </p>
    <p className="text-base sm:text-lg md:text-xl font-mono font-bold text-gray-700 mt-2">
      {currentDateTime.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </p>
  </Card>
);

const PRAYER_TIMES = [
  { name: "fajr", time: "05:49" },
  { name: "zuhur", time: "13:10" },
  { name: "asar", time: "16:15" },
  { name: "maghrib", time: "19:01" },
  { name: "isyak", time: "20:20" },
];

const COLORS = [
  "bg-yellow-300",
  "bg-green-300",
  "bg-blue-300",
  "bg-red-300",
  "bg-purple-300",
];

export default function PrayerTimes() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const { user } = useUser();

  const colorAssignments = useMemo(
    () => PRAYER_TIMES.map((_, index) => COLORS[index % COLORS.length]),
    []
  );

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="w-fit h-fit">
      <CardHeader className="text-center">
        <CardTitle>
          welcome to tadarus.my,{" "}
          <span className="text-red-500">{user?.firstName}</span>
        </CardTitle>
      </CardHeader>
      <div className="p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4 mb-4">
          {PRAYER_TIMES.map((prayer, index) => (
            <PrayerTimeCard
              key={prayer.name}
              name={prayer.name}
              time={prayer.time}
              color={colorAssignments[index]}
            />
          ))}
        </div>
        <TimeDisplay currentDateTime={currentDateTime} />
      </div>
    </Card>
  );
}