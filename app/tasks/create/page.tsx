'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BackIcon from "@/components/ui/back";
import logo from "@/public/logo.png";
import Button from "@/components/Button";
import PlusIcon from "@/components/ui/plus";

const CreateTask: React.FC = () => {
  const router = useRouter();
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleBack = () => {
    router.push("/");
  };

  const handleAddTask = async () => {
    if (taskTitle && selectedColor) {
      const newTask = {
        title: taskTitle,
        color: selectedColor,
      };
  
      try {
        // Make a POST request to the backend to create the task
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
  
        const responseData = await response.json(); // Consume response once
  
        if (response.ok) {
          router.push("/"); // Redirect on successful task creation
        } else {
          // Handle error (e.g., validation errors, server error)
          alert(responseData.error || "Failed to add task. Please try again.");
        }
      } catch (error) {
        console.error("Error adding task:", error);
        alert("Error adding task. Please try again.");
      }
    } else {
      alert("Please provide a task title and color.");
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
          text="Add Task"
          onClick={handleAddTask}
          variant="primary"
          className="flex items-center justify-center w-full gap-2 py-2 text-white rounded-lg hover:bg-blue-600"
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default CreateTask;
