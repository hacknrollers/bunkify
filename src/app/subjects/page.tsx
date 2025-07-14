"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Button from "./button"; // Import button component

// Define the Subject type
type Subject = {
  name: string;
};

export default function Subjects() {
    const router = useRouter();
    // State for Subjects list - Add, Edit, Remove function
  const [subjects, setSubjects] = useState<Subject[]>([]);
  // Ref for add input field
  const inputRef = useRef<HTMLInputElement>(null);
  // State for eidt function
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

    // Function to close the edit input field
  function handleClose() {
    setIsEditing(false);
  }

  // Function section
  function addSubject() {
    const name = inputRef.current?.value?.trim();
    
    // Validate input field is not null or empty
    if (!name) {
      alert("Please enter a subject name.");
      return;
    }
    // Get subjects from localStorage
    const newSubject: Subject = { name };
    const currentSubjects = localStorage.getItem("subjects");

    const updatedSubjects: Subject[] = currentSubjects
      ? JSON.parse(currentSubjects)
      : [];

    updatedSubjects.push(newSubject);
    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    // Update subjects state
    setSubjects(updatedSubjects); 
    if (inputRef.current) {
      inputRef.current.value = ""; // Clear the input field
    }
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

  return (
    <>
      <motion.div className="flex flex-row justify-center content-end my-8 md:my-10 min-h-auto">
        {/* Input field */}
        <motion.input
          ref={inputRef}
          type="text"
          placeholder="Enter subject name"
          className="mx-4 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] w-64"
          style={{ boxShadow: "0 0 8px 1px #6366f1, 0 0 16px 2px #22c55e33" }}
          transition={{ duration: 0.4 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        ></motion.input>
        {/* "Add" button */}
        <Button onClick={addSubject} content="Add Subject" />
      </motion.div>
      {/* Header */}
      <motion.div className="flex flex-col items-center justify-start min-h-screen">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold mb-4"
        >
          Subjects
        </motion.h1>
        {/* Subjects list*/}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {subjects.map((subject, index) => (
            // Subject card
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative glass rounded-2xl shadow-lg p-8 border border-[#232a3a] hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
              style={{ boxShadow: "0 4px 16px 0 rgba(99,102,241,0.08)" }}
            >
              {/* Close button when editing */}
              {isEditing && editIndex === index && (
                <motion.button
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  onClick={handleClose}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold focus:outline-none"
                >
                  &times;
                </motion.button>
              )}

              {/* Subject Name OR Input Field */}
              {isEditing && editIndex === index ? (
                <motion.input
                  type="text"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Edit subject name"
                />
              ) : (
                <p className="text-md break-words whitespace-normal max-w-full">
                  {subject.name}
                </p>
              )}

              <motion.div className="flex flex-row justify-between mt-4">
                {/* Remove Button */}
                <Button onClick={() => removeSubject(index)} content="Remove" />

                {/* Edit / Submit Toggle Button */}
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
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
