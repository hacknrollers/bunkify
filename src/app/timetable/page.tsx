'use client';

import { useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function TimetablePage() {
  const [hydrated, setHydrated] = useState(false); // ✅ hydration guard
  const [subjects, setSubjects] = useState<string[]>([]);
  const [timetable, setTimetable] = useState<Record<string, string[]>>({});
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('');

  // Prevent SSR hydration mismatch
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const localSubjects = localStorage.getItem('subjects');
    if (localSubjects) {
      const parsed = JSON.parse(localSubjects);
      setSubjects(parsed.map((s: { name: string }) => s.name));
    } else {
      setSubjects(['Math', 'English', 'Physics', 'History', 'Art', 'Computer']);
    }

    const savedTimetable = localStorage.getItem('timetable');
    if (savedTimetable) {
      const parsed = JSON.parse(savedTimetable);
      const ensured: Record<string, string[]> = {};
      weekdays.forEach((day) => {
        ensured[day] = parsed[day] ?? [];
      });
      setTimetable(ensured);
    } else {
      const initial: Record<string, string[]> = {};
      weekdays.forEach((day) => (initial[day] = []));
      setTimetable(initial);
    }
  }, [hydrated]);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('timetable', JSON.stringify(timetable));
    }
  }, [timetable, hydrated]);

  const updateSubjects = (day: string, subject: string) => {
    setTimetable((prev) => {
      const exists = prev[day]?.includes(subject);
      const updated = exists
        ? prev[day].filter((s) => s !== subject)
        : [...(prev[day] ?? []), subject];
      return { ...prev, [day]: updated };
    });
    setQuery('');
    setSelected('');
  };

  const removeSubject = (day: string, subject: string) => {
    setTimetable((prev) => ({
      ...prev,
      [day]: (prev[day] ?? []).filter((s) => s !== subject),
    }));
  };

  const saveTimetable = () => {
    localStorage.setItem('timetable', JSON.stringify(timetable));
    alert('Timetable saved!');
  };

  const resetTimetable = () => {
    const cleared: Record<string, string[]> = {};
    weekdays.forEach((day) => (cleared[day] = []));
    setTimetable(cleared);
    alert('Timetable reset!');
  };

  if (!hydrated) return null;

  return (
    <motion.div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-10">Weekly Timetable</h1>

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto overflow-visible">
        {weekdays.map((day, idx) => {
          const availableSubjects = subjects.filter(
            (s) => !(timetable[day] ?? []).includes(s)
          );

          const filteredSubjects = query === ''
            ? availableSubjects
            : availableSubjects.filter((s) =>
                s.toLowerCase().includes(query.toLowerCase())
              );

          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative z-0 glass rounded-2xl shadow-lg p-6 border border-[#232a3a] hover:shadow-2xl hover:scale-105 transition-all min-h-[200px] pb-20"
            >
              <h2 className="text-xl font-semibold mb-4">{day}</h2>

              {/* Selected subjects */}
              <div className="flex flex-wrap gap-2 mb-3">
                {(timetable[day] ?? []).map((s) => (
                  <span
                    key={s}
                    className="flex items-center gap-1 bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                  >
                    {s}
                    <XMarkIcon
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => removeSubject(day, s)}
                    />
                  </span>
                ))}
              </div>

              {/* Combobox for subjects */}
              <Combobox value={selected} onChange={(val) => updateSubjects(day, val)}>
                <div className="relative z-50">
                  <Combobox.Input
                    className="w-full border border-gray-600 bg-gray-800 px-5 py-2 rounded focus:outline-none"
                    placeholder="Search subject..."
                    onChange={(e) => setQuery(e.target.value)}
                    displayValue={() => ''}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-2 flex items-center pr-2">
                    <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
                  </Combobox.Button>

                  {filteredSubjects.length > 0 && (
                    <Combobox.Options
                      className="absolute z-[9999] mt-1 max-h-20 w-full overflow-y-auto rounded-md bg-gray-800 py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                      {filteredSubjects.map((subj) => (
                        <Combobox.Option
                          key={subj}
                          value={subj}
                          className={({ active }) =>
                            `cursor-pointer select-none py-2 px-4 ${
                              active ? 'bg-blue-600 text-white' : 'text-gray-300'
                            }`
                          }
                        >
                          {({ selected }) => (
                            <span className="flex justify-between items-center">
                              {subj}
                              {selected && <CheckIcon className="h-4 w-4 text-white" />}
                            </span>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  )}
                </div>
              </Combobox>
            </motion.div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mt-20 pt-4">
        <button
          onClick={saveTimetable}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          Save
        </button>
        <button
          onClick={resetTimetable}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
          Reset
        </button>
      </div>
    </motion.div>
  );
}
