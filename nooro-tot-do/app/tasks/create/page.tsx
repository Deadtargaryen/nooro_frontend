'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BackIcon from "@/components/ui/back";
import logo from "@/public/logo.png";
import Button from "@/components/Button";

const CreateTask: React.FC = () => {
  const router = useRouter();
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleBack = () => {
    router.push("/");
  };

  const handleAddTask = () => {
    if (taskTitle && selectedColor) {
      const newTask = {
        id: new Date().toISOString(),
        title: taskTitle,
        color: selectedColor,
        completed: false,
      };

      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const updatedTasks = [...storedTasks, newTask];
      
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      router.push("/");
    }
  };

  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col items-center py-8 px-4">
      {/* Header */}
      <header className="text-center mb-6">
        <Image
          src={logo}
          className="text-4xl text-white"
          width={150}
          height={150}
          alt="task-manager-logo"
        />
      </header>
      <div className="relative w-full max-w-2xl mb-6">
        <button
          onClick={handleBack}
          className="absolute left-0 top-0 text-white flex items-center"
        >
          <BackIcon />
        </button>
      </div>

      {/* Form */}
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <div className="mt-8">
          <label htmlFor="task-title" className="block text-sm mb-2 text-[#4EA8DE]">
            Title
          </label>
          <input
            id="task-title"
            type="text"
            placeholder="Ex. Brush your teeth"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="color" className="block text-sm mb-2 text-[#4EA8DE]">Color</label>
          <div className="flex gap-4">
            {["red", "orange", "yellow", "green", "blue", "purple", "pink", "brown"].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? "border-white" : "border-transparent"}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <Button
          text="Add Task"
          onClick={handleAddTask}
          variant="primary"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex justify-center items-center gap-2"
        />
      </div>
    </div>
  );
};

export default CreateTask;
