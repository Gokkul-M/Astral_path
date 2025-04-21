
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Plus, X, FileText, CheckSquare, StickyNote } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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

const ThoughtWeb = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [items, setItems] = useState<ThoughtItem[]>([
    {
      id: 1,
      title: "Final Project",
      content: "Complete research on renewable energy sources",
      type: "task",
      x: 350,
      y: 250,
      color: "#D3E4FD",
      connections: [2, 3],
    },
    {
      id: 2,
      title: "Research Notes",
      content: "Solar energy efficiency comparisons and statistics",
      type: "note",
      x: 500,
      y: 150,
      color: "#E0F5E9",
      connections: [1, 4],
    },
    {
      id: 3,
      title: "Wind Energy PDF",
      content: "Scientific paper on wind turbine innovations",
      type: "file",
      x: 200,
      y: 170,
      color: "#FDE1D3",
      connections: [1],
    },
    {
      id: 4,
      title: "Presentation Outline",
      content: "Structure for the final presentation on renewable energy",
      type: "note",
      x: 450,
      y: 350,
      color: "#E0F5E9",
      connections: [2],
    },
    {
      id: 5,
      title: "Statistical Data",
      content: "Collected data and charts for energy comparison",
      type: "file",
      x: 600,
      y: 270,
      color: "#FDE1D3",
      connections: [],
    },
  ]);

  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ThoughtItem | null>(null);

  const handleDrag = (id: number, x: number, y: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, x, y } : item
      )
    );
  };

  const openDetails = (item: ThoughtItem) => {
    setCurrentItem(item);
    setDetailsOpen(true);
  };

  const getTypeIcon = (type: ItemType) => {
    switch (type) {
      case "task":
        return <CheckSquare size={16} />;
      case "note":
        return <StickyNote size={16} />;
      case "file":
        return <FileText size={16} />;
    }
  };

  const getTypeColor = (type: ItemType) => {
    switch (type) {
      case "task":
        return "bg-cogni-blue text-blue-800";
      case "note":
        return "bg-cogni-mint text-green-800";
      case "file":
        return "bg-cogni-peach text-orange-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Thought Web</h1>
        <p className="text-muted-foreground">
          Visualize and connect your tasks, notes, and files
        </p>
      </div>

      <div className="relative w-full h-[600px] border rounded-xl bg-secondary/20 overflow-hidden mb-6">
        {/* Connection lines */}
        <svg className="absolute top-0 left-0 w-full h-full">
          {items.map((item) =>
            item.connections.map((connectionId) => {
              const connected = items.find((i) => i.id === connectionId);
              if (connected) {
                return (
                  <line
                    key={`${item.id}-${connectionId}`}
                    x1={item.x + 75}
                    y1={item.y + 40}
                    x2={connected.x + 75}
                    y2={connected.y + 40}
                    stroke="#ccc"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    strokeLinecap="round"
                  />
                );
              }
              return null;
            })
          )}
        </svg>

        {/* Thought items */}
        {items.map((item) => (
          <motion.div
            key={item.id}
            className={cn(
              "absolute p-4 rounded-lg shadow-md cursor-move flex flex-col",
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
              <Badge variant="outline" className={getTypeColor(item.type)}>
                <span className="flex items-center gap-1">
                  {getTypeIcon(item.type)}
                  {item.type}
                </span>
              </Badge>
            </div>
            <h3 className="font-medium text-sm mb-1">{item.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">{item.content}</p>

            {hoveredItem === item.id && (
              <div className="absolute -top-2 -right-2 flex gap-1">
                <Button size="icon" variant="secondary" className="h-6 w-6 rounded-full">
                  <Pencil size={12} />
                </Button>
              </div>
            )}
          </motion.div>
        ))}

        {/* Add new button */}
        <Button
          className="absolute bottom-4 right-4"
          size="sm"
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
                <Badge className={getTypeColor(currentItem.type)}>
                  <span className="flex items-center gap-1">
                    {getTypeIcon(currentItem.type)}
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
            <p className="text-muted-foreground mb-4">{currentItem.content}</p>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Connected Items:</h3>
              <div className="flex flex-wrap gap-2">
                {currentItem.connections.map((connectionId) => {
                  const connected = items.find((i) => i.id === connectionId);
                  return connected ? (
                    <Badge key={connectionId} variant="outline">
                      {connected.title}
                    </Badge>
                  ) : null;
                })}
                {currentItem.connections.length === 0 && (
                  <span className="text-sm text-muted-foreground">No connections yet</span>
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
    </div>
  );
};

export default ThoughtWeb;
