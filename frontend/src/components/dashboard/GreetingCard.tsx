import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface GreetingCardProps {
  name: string;
}

export function GreetingCard({ name }: GreetingCardProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <Card className="overflow-hidden border-none shadow-md bg-gradient-soft">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {getGreeting()}, {name}
        </h2>
        <p className="mt-2 text-gray-600">
          Ready to optimize your cognitive flow today?
        </p>
      </CardContent>
    </Card>
  );
}
