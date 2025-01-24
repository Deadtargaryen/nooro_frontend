'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BackIcon from "@/components/ui/back";
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
      // Logic to add the task (e.g., API call or state management)
      console.log("Task added:", { taskTitle, selectedColor });
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col items-center py-8 px-4 mt-24 mb-4">
      {/* Header */}
      <div className="relative w-full max-w-2xl mb-6">
        <button
          onClick={handleBack}
          className="absolute left-0 top-0 text-white flex items-center"
        >
          <BackIcon />
        </button>
        <h1 className="text-center text-2xl font-semibold text-white">Create Task</h1>
      </div>

      {/* Form */}
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <div>
          <label htmlFor="task-title" className="block text-sm mb-2 text-white">
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
          <label className="block text-sm mb-2 text-white">Color</label>
          <div className="flex gap-4">
            {["red", "orange", "yellow", "green", "blue", "purple", "pink", "brown"].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedColor === color ? "border-white" : "border-transparent"
                }`}
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
