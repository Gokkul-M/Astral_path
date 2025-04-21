
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import ThoughtWeb from "./ThoughtWeb";

const Dashboard = () => {
  const [userName, setUserName] = useState("Jane");
  const [currentMood, setCurrentMood] = useState("productive");
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
  if (hours < 12) {
    greeting = "Good Morning";
  } else if (hours < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

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

  const thoughtWebItems = [
    { id: 1, title: "Biology study", type: "task" },
    { id: 2, title: "Research ideas", type: "note" },
    { id: 3, title: "Physics chapter 5", type: "file" },
    { id: 4, title: "Project timeline", type: "note" },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-difficulty-easy text-green-800";
      case "medium":
        return "bg-difficulty-medium text-amber-800";
      case "hard":
        return "bg-difficulty-hard text-red-800";
      default:
        return "bg-muted";
    }
  };

  const getMoodEmoji = (label: string) => {
    const found = moods.find(mood => mood.label === label);
    return found ? found.emoji : "😊";
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {greeting}, {userName}
        </h1>
        <p className="text-muted-foreground">Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}. Let's make it productive!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Energy Tracker Card */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="text-lg">Energy Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-2">
              <span className="text-5xl">{getMoodEmoji(currentMood)}</span>
              <p className="text-sm text-muted-foreground mt-2 capitalize">You're feeling {currentMood}</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {moods.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => setCurrentMood(mood.label)}
                  className={cn(
                    "h-9 w-9 rounded-full flex items-center justify-center",
                    currentMood === mood.label ? "ring-2 ring-primary" : ""
                  )}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cognitive Digest */}
        <Card className="col-span-1 md:col-span-2 card-gradient">
          <CardHeader>
            <CardTitle className="text-lg">Cognitive Digest</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Your top 3 priority tasks for today</p>
            <div className="flex flex-col gap-3">
              {topTasks.map((task) => (
                <div key={task.id} className="p-3 bg-white rounded-lg shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{task.title}</h3>
                    <Badge variant="secondary" className={getDifficultyColor(task.difficulty)}>
                      {task.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarIcon size={12} />
                      <span>Due {task.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{task.timeRequired} min</span>
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
      <Card className="card-gradient mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Thought Web Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-52 w-full relative bg-muted/20 rounded-lg overflow-hidden flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-cogni-purple/20 rounded-full flex items-center justify-center z-10">
              <span className="text-lg">🧠</span>
            </div>
            {thoughtWebItems.map((item, index) => {
              const angle = index * (360 / thoughtWebItems.length);
              const radius = 80;
              const x = radius * Math.cos(angle * Math.PI / 180);
              const y = radius * Math.sin(angle * Math.PI / 180);
              
              const getBgColor = () => {
                switch (item.type) {
                  case "task":
                    return "bg-cogni-blue";
                  case "note":
                    return "bg-cogni-mint";
                  case "file":
                    return "bg-cogni-peach";
                  default:
                    return "bg-white";
                }
              };
              
              return (
                <div 
                  key={item.id}
                  className={`absolute p-3 rounded-lg ${getBgColor()} shadow-sm animate-float`}
                  style={{ 
                    transform: `translate(${x}px, ${y}px)`,
                    animationDelay: `${index * 0.2}s` 
                  }}
                >
                  <p className="text-xs font-medium">{item.title}</p>
                  <Badge variant="secondary" className="text-xs mt-1 bg-white/80">{item.type}</Badge>
                </div>
              );
            })}
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent bottom-0 h-16"></div>
          </div>
        </CardContent>
        <ThoughtWeb/>
      </Card>
    </div>
  );
};

export default Dashboard;
