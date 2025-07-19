"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./button"; // Import button component

// Define the Subject type
type Subject = {
  name: string;
  days: string[]; // e.g., ["Mon", "Wed"]
  timing?: { start: string; end: string };
  requiredAttendance?: number;
};

export default function Subjects() {
    const router = useRouter();
    // State for Subjects list - Add, Edit, Remove function
  const [subjects, setSubjects] = useState<Subject[]>([]);
  // State for eidt function
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  // Add state for new fields
  const [subjectName, setSubjectName] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [requiredAttendance, setRequiredAttendance] = useState<string>("");
  const [attendanceError, setAttendanceError] = useState("");
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

    // Function to close the edit input field
  function handleClose() {
    setIsEditing(false);
  }

  function handleDayChange(day: string) {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  // Function section
  function addSubject() {
    const name = subjectName.trim();
    // Validate input field is not null or empty
    if (!name) {
      setNotification({ type: 'error', message: 'Please enter a subject name.' });
      return;
    }
    if (requiredAttendance) {
      const percent = Number(requiredAttendance);
      if (isNaN(percent) || percent < 0 || percent > 100) {
        setAttendanceError("Attendance % must be a number between 0 and 100");
        setNotification({ type: 'error', message: 'Attendance % must be a number between 0 and 100' });
        return;
      }
      setAttendanceError("");
    }
    // Build new subject object
    const newSubject: Subject = {
      name,
      days: selectedDays,
      timing:
        startTime && endTime
          ? { start: startTime, end: endTime }
          : undefined,
      requiredAttendance: requiredAttendance ? Number(requiredAttendance) : undefined,
    };
    // Get subjects from localStorage
    const currentSubjects = localStorage.getItem("subjects");
    const updatedSubjects: Subject[] = currentSubjects ? JSON.parse(currentSubjects) : [];
    updatedSubjects.push(newSubject);
    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    setSubjects(updatedSubjects);
    setNotification({ type: 'success', message: 'Subject added successfully!' });
    // Clear form
    setSubjectName("");
    setSelectedDays([]);
    setStartTime("");
    setEndTime("");
    setRequiredAttendance("");
  }

  function handleCancel() {
    if (subjectName || selectedDays.length > 0 || startTime || endTime || requiredAttendance) {
      setShowCancelModal(true);
    } else {
      setSubjectName("");
      setSelectedDays([]);
      setStartTime("");
      setEndTime("");
      setRequiredAttendance("");
    }
  }

  function confirmCancel() {
    setShowCancelModal(false);
    setSubjectName("");
    setSelectedDays([]);
    setStartTime("");
    setEndTime("");
    setRequiredAttendance("");
  }

  function closeNotification() {
    setNotification(null);
  }

  function removeSubject(itemIndex: number) {
    // Remove a subject from localStorage
    const currentSubjects = localStorage.getItem("subjects");
    if (currentSubjects) {
      const subjects: Subject[] = JSON.parse(currentSubjects);
      // Remove choosen subject from current list
      const updatedSubjects = subjects.filter(
        (_, index) => index !== itemIndex
      );
      localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
      // Update subjects state
      setSubjects(updatedSubjects);
    }
  }

  function editSubject(itemIndex: number, newName: string) {
    const trimmedName = newName.trim();
    // Edit a subject from localStorage
    const currentSubjects = localStorage.getItem("subjects");
    if (currentSubjects && trimmedName) {
      const subjects: Subject[] = JSON.parse(currentSubjects);
      // Edit choosen subject from current list
      const updatedSubjects = subjects.map((subject, index) =>
        index === itemIndex
          ? {
              ...subject,
              name: trimmedName || subject.name,
            }
          : subject
      );
      localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
      setSubjects(updatedSubjects);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const subjectsData = localStorage.getItem("subjects");
      if (!subjectsData) {
        // Handle if no subjects are found - Not specified
      } else {
        setSubjects(JSON.parse(subjectsData));
      }
    }
  }, [router]);

  const dayOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#0f172a] to-[#020617] overflow-x-hidden">
      {/* Creative SVG background like landing page */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        {/* Example: a few floating SVGs for vibe, can be expanded */}
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.13, scale: 1 }} transition={{ duration: 1.1, delay: 0.2 }} style={{ position: 'absolute', left: '8%', top: '10%', width: 22, height: 22 }}>
          <svg width="22" height="22" viewBox="0 0 48 48"><rect x="6" y="12" width="36" height="28" rx="6" fill="#6366f1" opacity="0.7" /></svg>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.13, scale: 1 }} transition={{ duration: 1.2, delay: 0.3 }} style={{ position: 'absolute', left: '70%', top: '10%', width: 20, height: 20 }}>
          <svg width="20" height="20" viewBox="0 0 48 48"><rect x="10" y="14" width="12" height="20" rx="3" fill="#6366f1" opacity="0.5" /><rect x="26" y="14" width="12" height="20" rx="3" fill="#38bdf8" opacity="0.5" /></svg>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.13, scale: 1 }} transition={{ duration: 1.3, delay: 0.4 }} style={{ position: 'absolute', left: '18%', top: '18%', width: 18, height: 18 }}>
          <svg width="18" height="18" viewBox="0 0 48 48"><circle cx="24" cy="24" r="9" fill="#38bdf8" opacity="0.7" /><path d="M24 20v5l3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </motion.div>
      </div>
      <motion.div className="flex flex-col items-center justify-center my-8 md:my-10 min-h-auto z-10 w-full">
        {/* Add Subject Form */}
        <motion.form
          className="glass bg-gradient-to-br from-[#232a3a] to-[#232a3a]/80 rounded-2xl p-4 sm:p-8 shadow-2xl w-full max-w-lg flex flex-col gap-4 sm:gap-5 border border-[#232a3a] backdrop-blur-md"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={e => { e.preventDefault(); addSubject(); }}
        >
          <motion.label className="text-white font-semibold" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>Subject Name<span className="text-red-400">*</span></motion.label>
          <motion.input
            type="text"
            value={subjectName}
            onChange={e => setSubjectName(e.target.value)}
            placeholder="Enter subject name"
            className="rounded-lg p-3 bg-[#181c25] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] text-lg shadow-inner"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          />
          <motion.label className="text-white font-semibold mt-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>Class Days</motion.label>
          <div className="flex flex-wrap gap-2">
            {dayOptions.map(day => (
              <label key={day} className={`flex items-center gap-1 text-white px-3 py-1 rounded-full cursor-pointer border transition-all duration-200 ${selectedDays.includes(day) ? 'bg-gradient-to-r from-[#6366f1] to-[#38bdf8] border-[#38bdf8] shadow' : 'bg-[#232a3a] border-[#6366f1]'}`}>
                <input
                  type="checkbox"
                  checked={selectedDays.includes(day)}
                  onChange={() => handleDayChange(day)}
                  className="accent-[#38bdf8]"
                />
                {day}
              </label>
            ))}
          </div>
          {/* Chips for selected days */}
          <AnimatePresence>
            {selectedDays.length > 0 && (
              <motion.div className="flex flex-wrap gap-2 mt-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                {selectedDays.map(day => (
                  <span key={day} className="px-3 py-1 rounded-full bg-gradient-to-r from-[#6366f1] to-[#22c55e] text-white text-xs font-semibold shadow border border-[#232a3a] tracking-wide select-none active:scale-95 transition-transform">{day}</span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.label className="text-white font-semibold mt-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>Class Timing <span className="text-gray-400 text-xs">(optional)</span></motion.label>
          <div className="flex gap-2">
            <input
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              className="rounded-lg p-2 bg-[#181c25] text-white border border-gray-600 focus:outline-none w-32"
              placeholder="Start time"
            />
            <span className="text-white">-</span>
            <input
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              className="rounded-lg p-2 bg-[#181c25] text-white border border-gray-600 focus:outline-none w-32"
              placeholder="End time"
            />
          </div>
          <motion.label className="text-white font-semibold mt-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>Required Attendance % <span className="text-gray-400 text-xs">(optional)</span></motion.label>
          <input
            type="number"
            min={0}
            max={100}
            value={requiredAttendance}
            onChange={e => setRequiredAttendance(e.target.value)}
            placeholder="e.g. 75"
            className="rounded-lg p-2 bg-[#181c25] text-white border border-gray-600 focus:outline-none w-32"
          />
          {attendanceError && <motion.span className="text-red-400 text-xs" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{attendanceError}</motion.span>}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4 w-full">
            <Button onClick={addSubject} content="Add Subject" />
            <Button onClick={handleCancel} content="Cancel" />
          </div>
        </motion.form>
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className={`fixed top-6 left-1/2 z-50 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-semibold ${notification.type === 'success' ? 'bg-gradient-to-r from-[#22c55e] to-[#38bdf8]' : 'bg-gradient-to-r from-red-500 to-pink-500'}`}
              onClick={closeNotification}
            >
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showCancelModal && (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="bg-[#181c25] rounded-2xl p-8 shadow-2xl border border-[#232a3a] flex flex-col items-center gap-4" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
                <div className="text-white text-lg font-semibold mb-2">Discard changes?</div>
                <div className="text-gray-400 mb-4">You have unsaved changes. Are you sure you want to cancel?</div>
                <div className="flex gap-4">
                  <Button onClick={confirmCancel} content="Yes, Discard" />
                  <Button onClick={() => setShowCancelModal(false)} content="No, Keep Editing" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {/* Header and Subject List (unchanged) */}
      <motion.div className="flex flex-col items-center justify-start min-h-screen z-10 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#6366f1] via-[#38bdf8] to-[#22c55e] bg-clip-text text-transparent drop-shadow-lg"
        >
          Subjects
        </motion.h1>
        {/* Subjects list*/}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 w-full max-w-xs sm:max-w-2xl lg:max-w-6xl px-2 sm:px-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative glass rounded-3xl shadow-2xl p-4 sm:p-7 border border-[#232a3a] bg-gradient-to-br from-[#232a3a]/80 to-[#232a3a]/60 backdrop-blur-xl hover:shadow-2xl hover:scale-[1.03] hover:border-[#38bdf8] transition-all cursor-pointer group min-h-[180px] sm:min-h-[220px] flex flex-col justify-between"
              style={{ boxShadow: "0 4px 32px 0 rgba(99,102,241,0.13)" }}
            >
              {/* Edit/Close Button */}
              {isEditing && editIndex === index && (
                <motion.button
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  onClick={handleClose}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold focus:outline-none z-10"
                >
                  &times;
                </motion.button>
              )}
              {/* Subject Name or Edit Field */}
              <div className="mb-2 flex items-center gap-2">
                {isEditing && editIndex === index ? (
                  <motion.input
                    type="text"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="border border-[#38bdf8] rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#181c25] text-white text-lg font-semibold shadow"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Edit subject name"
                  />
                ) : (
                  <h2 className="text-xl font-extrabold text-white bg-gradient-to-r from-[#6366f1] via-[#38bdf8] to-[#22c55e] bg-clip-text text-transparent drop-shadow-lg flex-1 truncate">
                    {subject.name}
                  </h2>
                )}
              </div>
              {/* Days as Chips */}
              <div className="flex flex-wrap gap-2 mb-2">
                {subject.days && subject.days.length > 0 && subject.days.map(day => (
                  <span key={day} className="px-3 py-1 rounded-full bg-gradient-to-r from-[#6366f1] to-[#22c55e] text-white text-xs font-semibold shadow border border-[#232a3a] tracking-wide select-none active:scale-95 transition-transform">{day}</span>
                ))}
              </div>
              {/* Timing and Attendance */}
              <div className="flex flex-col gap-1 mb-3">
                {subject.timing && (
                  <div className="flex items-center gap-2 text-sm text-[#38bdf8] font-medium">
                    <svg width="18" height="18" viewBox="0 0 48 48" className="inline-block"><circle cx="24" cy="24" r="9" fill="#38bdf8" opacity="0.7" /><path d="M24 20v5l3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    <span>{subject.timing.start} - {subject.timing.end}</span>
                  </div>
                )}
                {typeof subject.requiredAttendance === 'number' && (
                  <div className="flex items-center gap-2 text-xs text-[#22c55e] font-semibold">
                    <svg width="16" height="16" viewBox="0 0 48 48" className="inline-block"><circle cx="24" cy="24" r="7" fill="#22c55e" opacity="0.7" /><path d="M18 24l4 4 6-7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    <span>🎯 Required Attendance: {subject.requiredAttendance}%</span>
                  </div>
                )}
              </div>
              {/* Action Buttons */}
              <div className="flex flex-row justify-between items-center mt-auto pt-2 gap-2">
                <Button onClick={() => removeSubject(index)} content="Remove" />
                {isEditing && editIndex === index ? (
                  <Button
                    onClick={() => {
                      editSubject(index, editName);
                      setIsEditing(false);
                      setEditIndex(null);
                      setEditName("");
                      // Refresh UI
                      const subjectsData = localStorage.getItem("subjects");
                      if (subjectsData) {
                        setSubjects(JSON.parse(subjectsData));
                      }
                    }}
                    content="Submit"
                  />
                ) : (
                  <Button
                    onClick={() => {
                      setIsEditing(true);
                      setEditIndex(index);
                      setEditName(subject.name); // preload input with current name
                    }}
                    content="Edit"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
