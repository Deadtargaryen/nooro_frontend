'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../public/logo.png";
import clipboard from "../public/Clipboard.png";
import PlusIcon from "./../components/ui/plus";
import Button from "@/components/Button";
import TrashIcon from "@/components/ui/trash";
import EditIcon from "@/components/ui/edit";

const Home: React.FC = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleCreateTask = () => {
    router.push("/tasks/create");
  };

  const toggleTaskCompletion = async (id: number, completed: boolean) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (id: number) => {
    router.push(`/tasks/edit/${id}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-8 text-gray-200 bg-black">
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

      <Button
        text="Create Task"
        onClick={handleCreateTask}
        variant="primary"
        className="mb-4 mt-12 w-[506px] z-10 relative"
      >
        <PlusIcon />
      </Button>

      <div className="w-full max-w-2xl mt-8">
        <div className="flex justify-between px-4 py-2 text-sm border-b border-gray-700">
          <span className="font-semibold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
            Tasks <span className="px-2 py-1 text-white bg-gray-900 rounded-full">{tasks.length}</span>
          </span>
          <span className="font-semibold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
            Completed{" "}
            <span className="px-2 py-1 text-white bg-gray-900 rounded-full">
              {tasks.filter((task) => task.completed).length} of {tasks.length}
            </span>
          </span>
        </div>

        {tasks.length > 0 ? (
          <ul className="mt-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between px-4 py-2 mb-2 bg-gray-800 rounded-lg"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id, task.completed)}
                    className="w-5 h-5 mr-4 checkbox-as-radio"
                  />
                  <span
                    className={`text-sm ${task.completed ? "line-through text-gray-500" : ""}`}
                  >
                    {task.title}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditTask(task.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <EditIcon className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <Image
              className="mb-4"
              src={clipboard}
              width={50}
              height={50}
              alt="clipboard"
            />
            <p className="text-lg text-gray-700">
              You don't have any tasks registered yet.
            </p>
            <p className="text-gray-700">
              Create tasks and organize your to-do items.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
