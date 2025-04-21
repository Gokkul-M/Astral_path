
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Settings = () => {
  const moodData = [
    { day: "Mon", happiness: 7, energy: 6, productivity: 8 },
    { day: "Tue", happiness: 6, energy: 5, productivity: 7 },
    { day: "Wed", happiness: 8, energy: 7, productivity: 8 },
    { day: "Thu", happiness: 8, energy: 8, productivity: 9 },
    { day: "Fri", happiness: 7, energy: 5, productivity: 6 },
    { day: "Sat", happiness: 9, energy: 8, productivity: 7 },
    { day: "Sun", happiness: 8, energy: 7, productivity: 8 },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile and application preferences
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="mood-tracker">Mood Tracker</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-cogni-purple flex items-center justify-center text-2xl font-medium text-primary">
                  J
                </div>
                <div>
                  <Button variant="outline">Change Avatar</Button>
                  <p className="text-xs text-muted-foreground mt-2">JPG, GIF or PNG. 1MB max size.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Jane Cooper" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="jane@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school">School/University</Label>
                    <Input id="school" defaultValue="Stanford University" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="major">Major/Subject Area</Label>
                    <Input id="major" defaultValue="Computer Science" />
                  </div>
                </div>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mood-tracker">
          <Card className="card-gradient mb-6">
            <CardHeader>
              <CardTitle>Mood History</CardTitle>
              <CardDescription>Track your emotional well-being over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={moodData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="day" />
                    <YAxis domain={[0, 10]} tickCount={6} />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="happiness" 
                      stackId="1"
                      stroke="#8884d8" 
                      fill="#E5DEFF" 
                      name="Happiness"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="energy" 
                      stackId="2"
                      stroke="#82ca9d" 
                      fill="#E0F5E9" 
                      name="Energy"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="productivity" 
                      stackId="3"
                      stroke="#ffc658" 
                      fill="#FDE1D3" 
                      name="Productivity"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Mood Tracking Settings</CardTitle>
              <CardDescription>Configure how you track your mood</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily Check-in Reminder</p>
                  <p className="text-sm text-muted-foreground">Get a daily reminder to log your mood</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Before/After Focus Sessions</p>
                  <p className="text-sm text-muted-foreground">Track mood changes during focus sessions</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Mood Insights</p>
                  <p className="text-sm text-muted-foreground">Receive weekly insights about your mood patterns</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Task Due Reminders</p>
                    <p className="text-sm text-muted-foreground">Notifications when tasks are approaching deadline</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Focus Session Alerts</p>
                    <p className="text-sm text-muted-foreground">Reminders to start scheduled focus sessions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Progress Reports</p>
                    <p className="text-sm text-muted-foreground">Summary of your productivity and completed tasks</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Energy Level Recommendations</p>
                    <p className="text-sm text-muted-foreground">Suggestions based on your current energy levels</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Learning Management System Integrations</CardTitle>
              <CardDescription>Connect your academic accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-[#4285F4] flex items-center justify-center text-white font-bold">
                      G
                    </div>
                    <div>
                      <p className="font-medium">Google Classroom</p>
                      <p className="text-sm text-muted-foreground">Import assignments and deadlines</p>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-1">
                    Connect
                    <ChevronRight size={16} />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-[#E21B3C] flex items-center justify-center text-white font-bold">
                      C
                    </div>
                    <div>
                      <p className="font-medium">Canvas</p>
                      <p className="text-sm text-muted-foreground">Sync your courses and assignments</p>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-1">
                    Connect
                    <ChevronRight size={16} />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-[#3A5998] flex items-center justify-center text-white font-bold">
                      M
                    </div>
                    <div>
                      <p className="font-medium">Moodle</p>
                      <p className="text-sm text-muted-foreground">Connect to your school's Moodle instance</p>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-1">
                    Connect
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
