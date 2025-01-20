"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChangeUsername() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(`Username changed to: ${username}`);
    setIsLoading(false);
    setUsername("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">New Username</Label>
        <Input
          id="username"
          placeholder="Enter new username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Changing..." : "Change Username"}
      </Button>
    </form>
  );
}
