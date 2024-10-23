"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getPrayerTimes, Prayer } from "../services";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function PrayerTimes() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const data = useUser();
  const user = data.user;

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const data = await getPrayerTimes();

        if (!data) {
          throw new Error("Failed to fetch prayer times");
        }

        setPrayerTimes(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load prayer times" + err);
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  const getRandomColor = () => {
    const colors = [
      "bg-yellow-300",
      "bg-green-300",
      "bg-blue-300",
      "bg-red-300",
      "bg-purple-300",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Card className="w-fit h-fit">
      <CardHeader className="text-center">
        <CardTitle>welcome to tadarus.my, <span className="text-red-500">{user?.firstName}</span></CardTitle>
      </CardHeader>
      <div className="p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4 mb-4">
          {prayerTimes.map((prayer) => (
            <Card
              key={prayer.name}
              className={`${getRandomColor()} p-2 sm:p-4 rounded-lg shadow-lg border-2 sm:border-3 border-black transform transition-transform hover:scale-105`}
            >
              <h2 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-gray-800">
                {prayer.name}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl font-mono font-bold text-gray-900">
                {prayer.time}
              </p>
            </Card>
          ))}
        </div>
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
      </div>
    </Card>
  );
}
