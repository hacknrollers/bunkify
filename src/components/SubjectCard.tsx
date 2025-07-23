"use client";
import { motion } from "framer-motion";
import { Subject } from "@/app/subjects/page";


type Props = {
  subject: Subject;
  index: number;
  onMark: (index: number, type: "present" | "absent" | "no-class") => void;
  marked: boolean;
};

export default function SubjectCard({ subject, index, onMark, marked }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl p-5 bg-gradient-to-br from-[#232a3a]/80 to-[#232a3a]/60 border border-[#2c2f3a] shadow-xl backdrop-blur-md
        ${marked ? "opacity-60 pointer-events-none grayscale" : ""}
      `}
    >
      <h2 className="text-xl font-bold text-white mb-1 bg-gradient-to-r from-[#6366f1] via-[#38bdf8] to-[#22c55e] bg-clip-text text-transparent">
        {subject.name}
      </h2>

      {subject.timing && (
        <p className="text-sm text-[#38bdf8] mb-1">
          ⏰ {subject.timing.start} - {subject.timing.end}
        </p>
      )}

      {typeof subject.requiredAttendance === "number" && (
        <p className="text-xs text-[#22c55e] mb-2">
          🎯 Required: {subject.requiredAttendance}%
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {subject.days.map((day) => (
          <span
            key={day}
            className="text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-[#6366f1] to-[#22c55e] text-white shadow"
          >
            {day}
          </span>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => onMark(index, "present")}
          className="rounded-full cursor-pointer px-2 py-2 text-sm sm:text-base font-semibold bg-gradient-to-r from-[#22c55e] to-[#38bdf8] text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 hover:scale-105"
          style={{ boxShadow: "0 0 8px 1px #22c55e, 0 0 16px 2px #38bdf833" }}
        >
          ✅ Present
        </button>

        <button
          onClick={() => onMark(index, "absent")}
          className="rounded-full cursor-pointer px-2 py-2 text-sm sm:text-base font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 hover:scale-105"
          style={{ boxShadow: "0 0 8px 1px #ef4444, 0 0 16px 2px #ec489933" }}
        >
          ❌ Absent
        </button>

        <button
          onClick={() => onMark(index, "no-class")}
          className="rounded-full cursor-pointer px-2 py-2 text-sm sm:text-base font-semibold bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 hover:scale-105"
          style={{ boxShadow: "0 0 8px 1px #6b7280, 0 0 16px 2px #4b556333" }}
        >
          ➖ No Class
        </button>
      </div>
    </motion.div>
  );
}
