'use client'

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import BackIcon from "@/components/ui/back";
import TickIcon from "@/components/ui/tick";
import logo from "@/public/logo.png";
import Button from "@/components/Button";

const EditTask: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams ? searchParams.get("id") : null;

  const [taskTitle, setTaskTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    if (taskId) {
      // Fetch the task data from local storage
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const taskToEdit = storedTasks.find((task: { id: string }) => task.id === taskId);

      if (taskToEdit) {
        setTaskTitle(taskToEdit.title);
        setSelectedColor(taskToEdit.color);
      } else {
        router.push("/");
      }
    }
  }, [taskId, router]);

  const handleBack = () => {
    router.push("/");
  };

  const handleSaveTask = () => {
    if (taskId && taskTitle && selectedColor) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

      // Update the task
      const updatedTasks = storedTasks.map((task: { id: string }) =>
        task.id === taskId ? { ...task, title: taskTitle, color: selectedColor } : task
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8 text-gray-200 bg-black">
      {/* Header */}
      <header className="mb-6 text-center">
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
          className="absolute top-0 left-0 flex items-center text-white"
        >
          <BackIcon />
        </button>
      </div>

      {/* Form */}
      <div className="flex flex-col w-full max-w-2xl gap-6">
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
            className="w-full px-4 py-2 text-gray-200 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          text="Save"
          onClick={handleSaveTask}
          variant="primary"
          className="flex items-center justify-center w-full gap-2 py-2 text-white rounded-lg hover:bg-blue-600"
        >
          <TickIcon />
        </Button>
      </div>
    </div>
  );
};

export default EditTask;
