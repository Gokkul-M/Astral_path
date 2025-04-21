
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ListFilter, Plus, Grid2X2, List, Clock, CalendarClock, Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate: string;
  subject: string;
  difficulty: "easy" | "medium" | "hard";
  energy: number;
  timeRequired: number;
  completed: boolean;
  tags: string[];
}

const Tasks = () => {
  const [viewMode, setViewMode] = useState<"list" | "flow">("list");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete Biology Assignment",
      description: "Chapter 5 questions and lab report",
      dueDate: "2025-04-25",
      subject: "Biology",
      difficulty: "medium",
      energy: 3,
      timeRequired: 60,
      completed: false,
      tags: ["assignment", "lab", "science"],
    },
    {
      id: 2,
      title: "Math problem set",
      description: "Pages 45-47, odd problems",
      dueDate: "2025-04-26",
      subject: "Mathematics",
      difficulty: "hard",
      energy: 4,
      timeRequired: 90,
      completed: false,
      tags: ["homework", "equations"],
    },
    {
      id: 3,
      title: "Review literature notes",
      description: "Focus on chapters 3-5 for quiz",
      dueDate: "2025-04-29",
      subject: "Literature",
      difficulty: "easy",
      energy: 2,
      timeRequired: 30,
      completed: false,
      tags: ["reading", "quiz prep"],
    },
    {
      id: 4,
      title: "History research outline",
      description: "Create outline for term paper",
      dueDate: "2025-05-01",
      subject: "History",
      difficulty: "medium",
      energy: 3,
      timeRequired: 45,
      completed: false,
      tags: ["research", "writing"],
    },
    {
      id: 5,
      title: "Chemistry lab preparation",
      description: "Read procedure and pre-lab questions",
      dueDate: "2025-04-27",
      subject: "Chemistry",
      difficulty: "medium",
      energy: 3,
      timeRequired: 40,
      completed: false,
      tags: ["lab", "science"],
    },
    {
      id: 6,
      title: "Complete online quiz",
      description: "Computer science fundamentals",
      dueDate: "2025-04-24",
      subject: "Computer Science",
      difficulty: "easy",
      energy: 2,
      timeRequired: 25,
      completed: true,
      tags: ["quiz", "online"],
    },
  ]);
  
  const [sortBy, setSortBy] = useState<"dueDate" | "energy" | "time">("dueDate");
  
  const groupedTasks = tasks.reduce((groups, task) => {
    const key = task.difficulty;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(task);
    return groups;
  }, {} as Record<string, Task[]>);
  
  const sortTasks = (tasksToSort: Task[]) => {
    return [...tasksToSort].sort((a, b) => {
      if (sortBy === "dueDate") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === "energy") {
        return b.energy - a.energy;
      } else {
        return b.timeRequired - a.timeRequired;
      }
    });
  };
  
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

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map((task) => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const getSortIcon = () => {
    switch (sortBy) {
      case "dueDate":
        return <CalendarClock size={16} />;
      case "energy":
        return <Sparkles size={16} />;
      case "time":
        return <Clock size={16} />;
      default:
        return <ListFilter size={16} />;
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Smart Task Organizer</h1>
          <p className="text-muted-foreground">
            Organize your tasks by difficulty, energy, and time required
          </p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {getSortIcon()}
                <span>Sort by</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortBy("dueDate")} className={sortBy === "dueDate" ? "bg-secondary" : ""}>
                <CalendarClock className="mr-2 h-4 w-4" />
                <span>Due date</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("energy")} className={sortBy === "energy" ? "bg-secondary" : ""}>
                <Sparkles className="mr-2 h-4 w-4" />
                <span>Mental energy</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("time")} className={sortBy === "time" ? "bg-secondary" : ""}>
                <Clock className="mr-2 h-4 w-4" />
                <span>Time required</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" className="w-10 p-0" onClick={() => setViewMode(viewMode === "list" ? "flow" : "list")}>
            {viewMode === "list" ? <Grid2X2 size={16} /> : <List size={16} />}
          </Button>
          
          <Button className="gap-1">
            <Plus size={16} />
            <span>Add Task</span>
          </Button>
        </div>
      </div>
      
      {viewMode === "list" ? (
        <div className="grid grid-cols-1 gap-6">
          {["easy", "medium", "hard"].map((difficulty) => (
            <Card key={difficulty} className="card-gradient">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg capitalize flex items-center gap-2">
                  <Badge className={cn("capitalize", getDifficultyColor(difficulty))}>
                    {difficulty}
                  </Badge>
                  <span>Difficulty</span>
                  <span className="text-muted-foreground ml-2 text-sm font-normal">
                    ({groupedTasks[difficulty]?.length || 0} tasks)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {groupedTasks[difficulty] ? (
                    sortTasks(groupedTasks[difficulty]).map((task) => (
                      <div
                        key={task.id}
                        className={cn(
                          "p-3 bg-white rounded-lg shadow-sm",
                          task.completed && "opacity-60"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className={cn("font-medium", task.completed && "line-through")}>{task.title}</h3>
                              <Badge variant="outline">{task.subject}</Badge>
                            </div>
                            {task.description && (
                              <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                            )}
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <CalendarClock size={12} />
                                <span>
                                  Due {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Sparkles size={12} />
                                <span>Energy: {task.energy}/5</span>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock size={12} />
                                <span>{task.timeRequired} min</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Button
                              variant="outline"
                              size="sm"
                              className={cn(
                                "h-6 w-6 p-0 rounded-full",
                                task.completed && "bg-primary text-white"
                              )}
                              onClick={() => toggleTaskCompletion(task.id)}
                            >
                              {task.completed ? "✓" : ""}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No tasks in this category</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="easy">Easy</TabsTrigger>
                <TabsTrigger value="medium">Medium</TabsTrigger>
                <TabsTrigger value="hard">Hard</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortTasks(tasks).map((task) => (
                  <Card 
                    key={task.id} 
                    className={cn(
                      "card-gradient overflow-hidden border-l-4",
                      task.completed ? "opacity-60" : "",
                      task.difficulty === "easy" ? "border-difficulty-easy" : 
                      task.difficulty === "medium" ? "border-difficulty-medium" : 
                      "border-difficulty-hard"
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={cn("font-medium", task.completed && "line-through")}>{task.title}</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            "h-6 w-6 p-0 rounded-full",
                            task.completed && "bg-primary text-white"
                          )}
                          onClick={() => toggleTaskCompletion(task.id)}
                        >
                          {task.completed ? "✓" : ""}
                        </Button>
                      </div>
                      
                      {task.description && (
                        <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                      )}
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">Subject:</span>
                          <Badge variant="outline">{task.subject}</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">Due:</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-muted/40 p-2 rounded flex flex-col items-center">
                            <span className="text-xs text-muted-foreground">Energy</span>
                            <div className="flex items-center mt-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className={cn(
                                    "h-1.5 w-1.5 rounded-full mx-0.5",
                                    i < task.energy ? "bg-primary" : "bg-muted"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-muted/40 p-2 rounded flex flex-col items-center">
                            <span className="text-xs text-muted-foreground">Time</span>
                            <span className="font-medium text-sm">{task.timeRequired} min</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {["easy", "medium", "hard"].map((difficulty) => (
              <TabsContent key={difficulty} value={difficulty}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortTasks(tasks.filter(task => task.difficulty === difficulty)).map((task) => (
                    <Card 
                      key={task.id} 
                      className={cn(
                        "card-gradient overflow-hidden border-l-4",
                        task.completed ? "opacity-60" : "",
                        task.difficulty === "easy" ? "border-difficulty-easy" : 
                        task.difficulty === "medium" ? "border-difficulty-medium" : 
                        "border-difficulty-hard"
                      )}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={cn("font-medium", task.completed && "line-through")}>{task.title}</h3>
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              "h-6 w-6 p-0 rounded-full",
                              task.completed && "bg-primary text-white"
                            )}
                            onClick={() => toggleTaskCompletion(task.id)}
                          >
                            {task.completed ? "✓" : ""}
                          </Button>
                        </div>
                        
                        {task.description && (
                          <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                        )}
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">Subject:</span>
                            <Badge variant="outline">{task.subject}</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">Due:</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-muted/40 p-2 rounded flex flex-col items-center">
                              <span className="text-xs text-muted-foreground">Energy</span>
                              <div className="flex items-center mt-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <div 
                                    key={i} 
                                    className={cn(
                                      "h-1.5 w-1.5 rounded-full mx-0.5",
                                      i < task.energy ? "bg-primary" : "bg-muted"
                                    )}
                                  />
                                ))}
                              </div>
                            </div>
                            
                            <div className="bg-muted/40 p-2 rounded flex flex-col items-center">
                              <span className="text-xs text-muted-foreground">Time</span>
                              <span className="font-medium text-sm">{task.timeRequired} min</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Tasks;
