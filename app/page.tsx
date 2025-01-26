'use client' 

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../public/logo.png";
import clipboard from "../public/Clipboard.png";
import PlusIcon from "./../components/ui/plus";
import Button from "@/components/Button";
import TrashIcon from "@/components/ui/trash";
import EditIcon from "@/components/ui/edit";

interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  const handleCreateTask = () => {
    router.push("/tasks/create");
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleEditTask = (id: string) => {
    router.push(`/tasks/edit/${id}`);
  };

  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col items-center py-8">
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

      <Button
        text="Create Task"
        onClick={handleCreateTask}
        variant="primary"
        className="mb-4 mt-12 w-[506px] z-10 relative"
      >
        <PlusIcon />
      </Button>

      <div className="mt-8 w-full max-w-2xl">
        <div className="flex justify-between px-4 py-2 text-sm border-b border-gray-700">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-semibold">
            Tasks <span className="bg-gray-900 px-2 py-1 rounded-full text-white">{tasks.length}</span>
          </span>
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-semibold">
            Completed {" "}
            <span className="bg-gray-900 px-2 py-1 rounded-full text-white">
              {tasks.filter((task) => task.completed).length} of {tasks.length}
            </span>
          </span>
        </div>

        {tasks.length > 0 ? (
          <ul className="mt-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between px-4 py-2 bg-gray-800 rounded-lg mb-2"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="h-5 w-5 mr-4 checkbox-as-radio"
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
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
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
