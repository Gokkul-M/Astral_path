import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  Plus,
  X,
  FileText,
  CheckSquare,
  StickyNote,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ItemType = "task" | "note" | "file";

interface ThoughtItem {
  id: number;
  title: string;
  content: string;
  type: ItemType;
  x: number;
  y: number;
  color: string;
  connections: number[];
}

const typeMap = {
  task: {
    icon: <CheckSquare size={16} />,
    color: "#D3E4FD",
    badge: "bg-cogni-blue text-blue-800",
  },
  note: {
    icon: <StickyNote size={16} />,
    color: "#E0F5E9",
    badge: "bg-cogni-mint text-green-800",
  },
  file: {
    icon: <FileText size={16} />,
    color: "#FDE1D3",
    badge: "bg-cogni-peach text-orange-800",
  },
};

const ThoughtWeb = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ThoughtItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    content: "",
    type: "task" as ItemType,
  });

  const [items, setItems] = useState<ThoughtItem[]>([
    {
      id: 1,
      title: "Final Project",
      content: "Complete research on renewable energy sources",
      type: "task",
      x: 350,
      y: 250,
      color: typeMap["task"].color,
      connections: [2, 3],
    },
    {
      id: 2,
      title: "Research Notes",
      content: "Solar energy efficiency comparisons and statistics",
      type: "note",
      x: 500,
      y: 150,
      color: typeMap["note"].color,
      connections: [1, 4],
    },
    {
      id: 3,
      title: "Wind Energy PDF",
      content: "Scientific paper on wind turbine innovations",
      type: "file",
      x: 200,
      y: 170,
      color: typeMap["file"].color,
      connections: [1],
    },
    {
      id: 4,
      title: "Presentation Outline",
      content: "Structure for the final presentation on renewable energy",
      type: "note",
      x: 450,
      y: 350,
      color: typeMap["note"].color,
      connections: [2],
    },
    {
      id: 5,
      title: "Statistical Data",
      content: "Collected data and charts for energy comparison",
      type: "file",
      x: 600,
      y: 270,
      color: typeMap["file"].color,
      connections: [],
    },
  ]);

  const handleDrag = (id: number, x: number, y: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, x, y } : item))
    );
  };

  const openDetails = (item: ThoughtItem) => {
    setCurrentItem(item);
    setDetailsOpen(true);
  };

  const addItem = () => {
    const newId = items.length + 1;
    const newThought: ThoughtItem = {
      id: newId,
      title: newItem.title,
      content: newItem.content,
      type: newItem.type,
      x: 300 + Math.random() * 100,
      y: 200 + Math.random() * 100,
      color: typeMap[newItem.type].color,
      connections: [],
    };
    setItems([...items, newThought]);
    setNewItem({ title: "", content: "", type: "task" });
    setDialogOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Thought Web</h1>
        <p className="text-muted-foreground">
          Visualize and connect your tasks, notes, and files
        </p>
      </div>

      <div className="relative w-full h-[600px] border rounded-xl bg-secondary/20 overflow-hidden mb-6">
        {/* Connection lines */}
        <svg className="absolute top-0 left-0 w-full h-full z-0">
          {items.flatMap((item) =>
            item.connections.map((connectionId) => {
              const connected = items.find((i) => i.id === connectionId);
              if (!connected) return null;
              return (
                <line
                  key={`${item.id}-${connectionId}`}
                  x1={item.x + 75}
                  y1={item.y + 40}
                  x2={connected.x + 75}
                  y2={connected.y + 40}
                  stroke="#999"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  strokeLinecap="round"
                />
              );
            })
          )}
        </svg>

        {/* Thought items */}
        {items.map((item) => (
          <motion.div
            key={item.id}
            className={cn(
              "absolute p-4 rounded-lg shadow-md z-10 cursor-move flex flex-col",
              "border border-transparent hover:border-primary/40",
              selected === item.id ? "ring-2 ring-primary" : ""
            )}
            style={{
              top: item.y,
              left: item.x,
              width: "150px",
              backgroundColor: item.color,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            drag
            dragMomentum={false}
            onDrag={(_, info) => {
              const newX = item.x + info.delta.x;
              const newY = item.y + info.delta.y;
              handleDrag(item.id, newX, newY);
            }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => {
              setSelected(item.id);
              openDetails(item);
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <Badge variant="outline" className={typeMap[item.type].badge}>
                <span className="flex items-center gap-1">
                  {typeMap[item.type].icon}
                  {item.type}
                </span>
              </Badge>
            </div>
            <h3 className="font-medium text-sm mb-1">{item.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {item.content}
            </p>

            {hoveredItem === item.id && (
              <div className="absolute -top-2 -right-2 flex gap-1 z-20">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-6 w-6 rounded-full"
                >
                  <Pencil size={12} />
                </Button>
              </div>
            )}
          </motion.div>
        ))}

        {/* Add New Item Button */}
        <Button
          className="absolute bottom-4 right-4 z-20"
          size="sm"
          onClick={() => setDialogOpen(true)}
        >
          <Plus size={16} className="mr-1" /> Add Item
        </Button>
      </div>

      {/* Detailed view */}
      {detailsOpen && currentItem && (
        <Card className="card-gradient mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Badge className={typeMap[currentItem.type].badge}>
                  <span className="flex items-center gap-1">
                    {typeMap[currentItem.type].icon}
                    {currentItem.type}
                  </span>
                </Badge>
                <h2 className="text-xl font-medium">{currentItem.title}</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDetailsOpen(false)}
              >
                <X size={18} />
              </Button>
            </div>
            <p className="text-muted-foreground mb-4">
              {currentItem.content}
            </p>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Connected Items:</h3>
              <div className="flex flex-wrap gap-2">
                {currentItem.connections.length ? (
                  currentItem.connections.map((id) => {
                    const connected = items.find((i) => i.id === id);
                    return connected ? (
                      <Badge key={id} variant="outline">
                        {connected.title}
                      </Badge>
                    ) : null;
                  })
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No connections yet
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <Pencil size={16} className="mr-2" />
                Edit
              </Button>
              <Button>View Details</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add New Item Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Thought</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Title"
            className="mb-2"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          />
          <Textarea
            placeholder="Content"
            className="mb-2"
            value={newItem.content}
            onChange={(e) =>
              setNewItem({ ...newItem, content: e.target.value })
            }
          />
          <select
            className="w-full p-2 border rounded text-sm"
            value={newItem.type}
            onChange={(e) =>
              setNewItem({ ...newItem, type: e.target.value as ItemType })
            }
          >
            <option value="task">Task</option>
            <option value="note">Note</option>
            <option value="file">File</option>
          </select>
          <div className="flex justify-end mt-4">
            <Button onClick={addItem}>Add</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ThoughtWeb;
