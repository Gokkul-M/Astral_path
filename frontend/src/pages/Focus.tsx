"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  PlayCircle, PauseCircle, RotateCcw,
  Volume2, VolumeX
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const Focus = () => {
  const [timerActive, setTimerActive] = useState(false);
  const [timerMode, setTimerMode] = useState("pomodoro");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [selectedSound, setSelectedSound] = useState("Nature");
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sounds = {
    Nature: "/sounds/nature.mp3",
    Rain: "/sounds/rain.mp3",
    "Coffee Shop": "/sounds/coffee.mp3",
  };

  const moods = [
    { emoji: "😊", label: "happy" },
    { emoji: "😐", label: "neutral" },
    { emoji: "😔", label: "sad" },
    { emoji: "🤔", label: "thoughtful" },
    { emoji: "💪", label: "energetic" },
    { emoji: "🧠", label: "productive" },
  ];

  const timerModes = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // 🔊 Audio plays only while timer is active and audio is enabled
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (audioEnabled && timerActive) {
      const newAudio = new Audio(sounds[selectedSound]);
      newAudio.loop = true;
      newAudio.volume = volume;
      newAudio.play().catch((err) => {
        console.warn("Audio playback failed:", err);
      });
      audioRef.current = newAudio;
    }
  }, [audioEnabled, selectedSound, volume, timerActive]);

  const startTimer = () => setTimerActive(true);
  const pauseTimer = () => setTimerActive(false);
  const resetTimer = () => {
    setTimerActive(false);
    setTimeLeft(timerModes[timerMode as keyof typeof timerModes]);
  };
  const changeTimerMode = (mode: string) => {
    setTimerMode(mode);
    setTimerActive(false);
    setTimeLeft(timerModes[mode as keyof typeof timerModes]);
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  const calculateProgress = () => {
    const totalTime = timerModes[timerMode as keyof typeof timerModes];
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const saveNote = async () => {
    try {
      await axios.post("http://localhost:5000/api/notes", {
        content: notes,
        createdAt: new Date().toISOString(),
      });
      setNotes("");
      alert("Note saved!");
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Focus Mode</h1>
        <p className="text-muted-foreground">Enhance your concentration with timed focus sessions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="card-gradient lg:col-span-2">
          <CardHeader><CardTitle>Pomodoro Timer</CardTitle></CardHeader>
          <CardContent>
            <Tabs value={timerMode} onValueChange={changeTimerMode} className="mb-6">
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
                <TabsTrigger value="shortBreak">Short Break</TabsTrigger>
                <TabsTrigger value="longBreak">Long Break</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative mx-auto w-64 h-64 mb-8">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="transparent" stroke="#e2e8f0" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="45" fill="transparent"
                  stroke="hsl(var(--primary))" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - calculateProgress() / 100)}`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{formatTime(timeLeft)}</span>
                <span className="text-sm text-muted-foreground capitalize">{timerMode}</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-8">
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={resetTimer}><RotateCcw /></Button>
              {!timerActive ? (
                <Button size="icon" className="h-12 w-12 rounded-full" onClick={startTimer}><PlayCircle /></Button>
              ) : (
                <Button size="icon" variant="destructive" className="h-12 w-12 rounded-full" onClick={pauseTimer}><PauseCircle /></Button>
              )}
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={() => setAudioEnabled(!audioEnabled)}>
                {audioEnabled ? <Volume2 /> : <VolumeX />}
              </Button>
            </div>

            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Background Sounds</span>
                <Switch checked={audioEnabled} onCheckedChange={setAudioEnabled} />
              </div>
              {audioEnabled && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Volume</span>
                    <Slider
                      defaultValue={[volume * 100]}
                      max={100}
                      step={1}
                      className="w-1/2"
                      onValueChange={(v) => setVolume(v[0] / 100)}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {Object.keys(sounds).map((sound) => (
                      <Button
                        key={sound}
                        variant={selectedSound === sound ? "default" : "outline"}
                        size="sm"
                        className="h-auto py-2"
                        onClick={() => setSelectedSound(sound)}
                      >
                        {sound}
                      </Button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="card-gradient">
            <CardHeader><CardTitle className="text-lg">Mood Check-In</CardTitle></CardHeader>
            <CardContent>
              <div className="text-center mb-2">
                {currentMood ? (
                  <div>
                    <span className="text-5xl">{moods.find(m => m.label === currentMood)?.emoji}</span>
                    <p className="text-sm text-muted-foreground mt-2 capitalize">You're feeling {currentMood}</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground mb-3">How are you feeling right now?</p>
                )}
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => setCurrentMood(mood.label)}
                    className={cn("h-10 w-10 rounded-full flex items-center justify-center", currentMood === mood.label && "ring-2 ring-primary")}
                  >
                    {mood.emoji}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader><CardTitle className="text-lg">Quick Notes</CardTitle></CardHeader>
            <CardContent>
              <Textarea
                placeholder="Capture your thoughts during this focus session..."
                className="min-h-[150px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button className="w-full mt-4" onClick={saveNote}>Save Notes</Button>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader><CardTitle className="text-lg">Session Stats</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Focus sessions today:</span>
                <Badge variant="secondary">3</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total focus time:</span>
                <span>1h 15m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current streak:</span>
                <span>3 days</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Focus;
