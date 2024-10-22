import React from "react";
import PrayerTimes from "./components/prayer-times";
import DailyPlanner from "./components/daily-planner";
import FastingTracker from "./components/fasting-tracker";
import ZakatCalculator from "./components/zakat-calculator";

const Dashboard = () => {
  return (
    <div className="pt-8 grid grid-cols-2 gap-4 min-h-screen bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      {/* <PrayerTimes />
      <DailyPlanner />
      <FastingTracker />
      <ZakatCalculator /> */}
    </div>
  );
};

export default Dashboard;
