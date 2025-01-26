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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (taskId) {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`)
        .then((response) => response.json())
        .then((data) => {
          setTaskTitle(data.title);
          setSelectedColor(data.color);
        })
        .catch((error) => {
          console.error("Error fetching task:", error);
          router.push("/");
        })
        .finally(() => setLoading(false));
    }
  }, [taskId, router]);

  const handleBack = () => {
    router.push("/");
  };

  const handleSaveTask = async () => {
    if (taskId && taskTitle && selectedColor) {
      setLoading(true);
      const updatedTask = {
        title: taskTitle,
        color: selectedColor,
      };

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        });

        if (response.ok) {
          router.push("/");
        } else {
          const errorData = await response.json();
          alert(errorData.error || "Failed to update task. Please try again.");
        }
      } catch (error) {
        console.error("Error saving task:", error);
        alert("Error saving task. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please provide a task title and color.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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
