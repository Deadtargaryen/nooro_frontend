'use client';

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import BackIcon from "@/components/ui/back";
import logo from "@/public/logo.png";

const EditTask: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const taskId = params?.id && !Array.isArray(params.id) ? params.id : null;

  const [taskTitle, setTaskTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch task data
  useEffect(() => {
    if (!taskId) {
      console.error("Invalid task ID");
      return;
    }

    const fetchTask = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`);
        if (!response.ok) throw new Error("Failed to fetch task");

        const data = await response.json();
        setTaskTitle(data.title);
        setSelectedColor(data.color);
      } catch (error) {
        console.error("Error fetching task:", error);
        router.push("/"); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, router]);

  const handleBack = () => {
    router.push("/");
  };

  const handleSaveTask = async () => {
    if (!taskId || !taskTitle || !selectedColor) {
      alert("Please provide a task title and color.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: taskTitle, color: selectedColor }),
      });

      if (response.ok) {
        router.push("/"); // Redirect after successful save
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to update task.");
      }
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Error saving task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!taskId) {
    return <div>Task not found or invalid ID.</div>;
  }

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
            placeholder="Enter task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full px-4 py-2 text-gray-200 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="color" className="block text-sm mb-2 text-[#4EA8DE]">
            Color
          </label>
          <div className="flex gap-4">
            {["red", "orange", "yellow", "green", "blue", "purple", "pink", "brown"].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full ${
                  selectedColor === color ? "ring-4 ring-blue-500" : ""
                }`}
                style={{ backgroundColor: color }}
              ></button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSaveTask}
          className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Save Task
        </button>
      </div>
    </div>
  );
};

export default EditTask;
