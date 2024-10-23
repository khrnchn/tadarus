import PrayerTimes from "./components/prayer-times";

const Dashboard = () => {
  return (
    <div className="content-center justify-items-center h-screen bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
        <PrayerTimes />
    </div>
  );
};

export default Dashboard;
