"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Pencil,
  Plus,
  X,
  FileText,
  CheckSquare,
  StickyNote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ThoughtType = "task" | "note" | "file";

interface ThoughtItem {
  _id: string;
  title: string;
  content: string;
  type: ThoughtType;
  x: number;
  y: number;
  color: string;
  connections: string[];
  createdAt: string;
}

const typeMap = {
  task: {
    icon: <CheckSquare size={14} />,
    color: "#D3E4FD",
    badge: "bg-cogni-blue text-blue-800",
  },
  note: {
    icon: <StickyNote size={14} />,
    color: "#E0F5E9",
    badge: "bg-cogni-mint text-green-800",
  },
  file: {
    icon: <FileText size={14} />,
    color: "#FDE1D3",
    badge: "bg-cogni-peach text-orange-800",
  },
};

export default function ThoughtWeb() {
  const [items, setItems] = useState<ThoughtItem[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ThoughtItem | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    content: "",
    type: "task" as ThoughtType,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/thoughts");
        setItems(response.data);
      } catch (error) {
        console.error("Failed to fetch thoughts:", error);
      }
    };
    fetchItems();
  }, []);

  const handleDrag = async (id: string, x: number, y: number) => {
    const boundedX = Math.max(0, Math.min(x, 850));
    const boundedY = Math.max(0, Math.min(y, 500));

    const updatedItems = items.map((item) =>
      item._id === id ? { ...item, x: boundedX, y: boundedY } : item
    );
    setItems(updatedItems);

    try {
      await axios.put(`http://localhost:5000/api/thoughts/${id}`, {
        x: boundedX,
        y: boundedY,
      });
    } catch (err) {
      console.error("Failed to update position:", err);
    }
  };

  const addNewItem = async () => {
    const newThought: Omit<ThoughtItem, "_id"> = {
      title: newItem.title,
      content: newItem.content,
      type: newItem.type,
      x: 50,
      y: 50,
      color: typeMap[newItem.type].color,
      connections: [],
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post("http://localhost:5000/api/thoughts", newThought);
      const savedItem = response.data;
      setItems((prev) => [...prev, savedItem]);
    } catch (error) {
      console.error("Failed to save new item:", error);
    }

    setNewItem({ title: "", content: "", type: "task" });
    setAddDialogOpen(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white text-black">
      <div ref={containerRef} className="relative w-full h-full">
        {/* SVG Connection Lines */}
        <svg className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          {items.map((item) =>
            item.connections.map((connectionId) => {
              const connected = items.find((i) => i._id === connectionId);
              if (!connected) return null;

              const x1 = item.x + 75;
              const y1 = item.y + 50;
              const x2 = connected.x + 75;
              const y2 = connected.y + 50;

              return (
                <line
                  key={`${item._id}-${connectionId}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#000"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              );
            })
          )}
        </svg>

        {/* Thought Items */}
        {items.map((item) => (
          <motion.div
            key={item._id}
            className="absolute p-4 rounded-lg shadow-md z-10 cursor-move border hover:border-primary/40"
            style={{
              top: item.y,
              left: item.x,
              width: 150,
              backgroundColor: item.color,
            }}
            drag
            dragMomentum={false}
            onDragEnd={(event, info) => {
              const container = containerRef.current;
              if (!container) return;
              const containerRect = container.getBoundingClientRect();
              const newX = info.point.x - containerRect.left;
              const newY = info.point.y - containerRect.top;
              handleDrag(item._id, newX, newY);
            }}
            onClick={() => {
              setCurrentItem(item);
              setDetailsOpen(true);
            }}
          >
            <Badge className={typeMap[item.type].badge + " mb-1"}>
              <span className="flex items-center gap-1">
                {typeMap[item.type].icon}
                {item.type}
              </span>
            </Badge>
            <h3 className="text-sm font-medium mb-1">{item.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {item.content}
            </p>
          </motion.div>
        ))}

        {/* Add New Item Button */}
        <Button
          className="absolute bottom-4 right-4 z-20"
          size="sm"
          onClick={() => setAddDialogOpen(true)}
        >
          <Plus size={16} className="mr-1" /> Add Item
        </Button>

        {/* Edit Dialog */}
        {detailsOpen && currentItem && (
          <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Thought</DialogTitle>
              </DialogHeader>
              <Input
                className="mb-2"
                value={currentItem.title}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, title: e.target.value })
                }
              />
              <Textarea
                className="mb-2"
                rows={4}
                value={currentItem.content}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, content: e.target.value })
                }
              />
              <div className="flex justify-end gap-2">
                <Button
                  onClick={() => {
                    const updated = items.map((item) =>
                      item._id === currentItem._id ? currentItem : item
                    );
                    setItems(updated);
                    setDetailsOpen(false);
                  }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setDetailsOpen(false)}
                >
                  <X size={16} />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Add New Thought Dialog */}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Thought</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Title"
              className="mb-2"
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })
              }
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
                setNewItem({ ...newItem, type: e.target.value as ThoughtType })
              }
            >
              <option value="task">Task</option>
              <option value="note">Note</option>
              <option value="file">File</option>
            </select>
            <div className="flex justify-end mt-4">
              <Button onClick={addNewItem}>Add</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
