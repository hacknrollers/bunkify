"use client";
import { useEffect, useState } from "react";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const subjects = ["Math", "Physics", "Chemistry", "Biology", "History", "English"];

const subjectColors: Record<string, string> = {
  Math: "text-blue-400",
  Physics: "text-purple-400",
  Chemistry: "text-pink-400",
  Biology: "text-green-400",
  History: "text-yellow-400",
  English: "text-red-400",
};

export default function Timetable() {
  const [schedule, setSchedule] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("timetable");
    if (stored) setSchedule(JSON.parse(stored));
  }, []);

  // Handle subject selection
  const handleChange = (day: string, subject: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: subject,
    }));
    setSaved(false);
  };

  // Save to localStorage
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const allFilled = weekdays.every((day) => !!schedule[day]);
    if (!allFilled) {
      alert("⚠ Please select subjects for all days!");
      return;
    }
    localStorage.setItem("timetable", JSON.stringify(schedule));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Clear timetable
  const handleClear = () => {
    setSchedule({});
    setSaved(false);
    localStorage.removeItem("timetable");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">📚 Weekly Timetable</h1>

      <form
        onSubmit={handleSave}
        className="max-w-xl mx-auto bg-slate-800 p-6 rounded-2xl shadow-lg space-y-4"
      >
        {weekdays.map((day) => (
          <div key={day} className="flex justify-between items-center">
            <label className="font-semibold w-1/3">{day}</label>
            <select
              value={schedule[day] || ""}
              onChange={(e) => handleChange(day, e.target.value)}
              className="w-2/3 p-2 bg-slate-700 text-white rounded-md"
            >
              <option value="">-- Select Subject --</option>
              {subjects.map((subj) => (
                <option key={subj} value={subj} className={subjectColors[subj]}>
                  {subj}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button
          type="submit"
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition"
        >
          💾 Save Timetable
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg mt-2"
        >
          🗑 Clear Timetable
        </button>

        {saved && (
          <p className="text-center text-green-400 mt-2 animate-pulse">
            ✅ Timetable saved!
          </p>
        )}
      </form>
    </div>
  );
}
