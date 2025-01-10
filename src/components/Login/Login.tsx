"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginProps {
  onLogin: (username: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [recentUsers, setRecentUsers] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("recentUsers");
    if (saved) {
      setRecentUsers(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      // Save to recent users
      const updatedUsers = [
        username,
        ...recentUsers.filter((u) => u !== username),
      ].slice(0, 5);
      localStorage.setItem("recentUsers", JSON.stringify(updatedUsers));
      onLogin(username);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-sm space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Enter your name to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="w-full"
            required
          />
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
        {recentUsers.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Recent users:</p>
            <div className="flex flex-wrap gap-2">
              {recentUsers.map((user) => (
                <Button
                  key={user}
                  variant="outline"
                  size="sm"
                  onClick={() => onLogin(user)}
                >
                  {user}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
