import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import ThoughtWeb from "./ThoughtWeb";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleTaskClick = (id: number) => {
    navigate(`/tasks?highlight=${id}`);
  };

  const [userName, setUserName] = useState("Gokkul");
  const [currentMood, setCurrentMood] = useState("productive");
  const [loading, setLoading] = useState(true);
  const topTasks = [
    {
      id: 1,
      title: "Complete Biology Assignment",
      dueDate: "Today",
      subject: "Biology",
      difficulty: "medium",
      energy: 3,
      timeRequired: 60,
    },
    {
      id: 2,
      title: "Math problem set",
      dueDate: "Tomorrow",
      subject: "Mathematics",
      difficulty: "hard",
      energy: 4,
      timeRequired: 90,
    },
    {
      id: 3,
      title: "Review literature notes",
      dueDate: "Friday",
      subject: "Literature",
      difficulty: "easy",
      energy: 2,
      timeRequired: 30,
    },
  ];

  const moods = [
    { emoji: "😊", label: "happy" },
    { emoji: "😐", label: "neutral" },
    { emoji: "😔", label: "sad" },
    { emoji: "🤔", label: "thoughtful" },
    { emoji: "💪", label: "energetic" },
    { emoji: "🧠", label: "productive" },
  ];

  const currentTime = new Date();
  const hours = currentTime.getHours();
  let greeting;
  if (hours < 12) greeting = "Good Morning";
  else if (hours < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-muted";
    }
  };

  const getMoodEmoji = (label: string) =>
    moods.find((m) => m.label === label)?.emoji || "😊";

  return (
    <div className="max-w-6xl mx-auto p-4 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-1">
          {greeting}, <span className="text-primary">{userName}</span>
        </h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })} — Let's make it productive!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Energy Tracker Card */}
        <Card className="bg-gradient-to-r from-indigo-100 to-purple-100 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap size={18} className="text-yellow-500" /> Energy Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-4">
              <span className="text-6xl">{getMoodEmoji(currentMood)}</span>
              <p className="text-sm text-muted-foreground mt-2 capitalize">
                Feeling {currentMood}
              </p>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {moods.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => setCurrentMood(mood.label)}
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center transition-all hover:scale-110",
                    currentMood === mood.label
                      ? "ring-2 ring-purple-500 bg-white"
                      : "bg-gray-100"
                  )}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cognitive Digest */}
        <Card className="col-span-1 md:col-span-2 bg-gradient-to-br from-sky-50 to-sky-100 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg">Cognitive Digest</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Your top 3 priority tasks for today
            </p>
            <div className="flex flex-col gap-4">
              {topTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleTaskClick(task.id)}
                  className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-base">{task.title}</h3>
                    <Badge
                      variant="secondary"
                      className={getDifficultyColor(task.difficulty)}
                    >
                      {task.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center flex-wrap gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarIcon size={12} /> <span>Due {task.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} /> <span>{task.timeRequired} min</span>
                    </div>
                    <Badge variant="outline">{task.subject}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Thought Web Preview */}
      <Card className="bg-gradient-to-br from-violet-100 to-pink-100 p-6 shadow-xl">
        <ThoughtWeb />
      </Card>
    </div>
  );
};

export default Dashboard;
