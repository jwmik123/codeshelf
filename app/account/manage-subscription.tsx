"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const plans = [
  { id: "free", name: "Free Plan", price: "$0/month" },
  { id: "pro", name: "Pro Plan", price: "$9.99/month" },
  { id: "enterprise", name: "Enterprise Plan", price: "$49.99/month" },
];

export default function ManageSubscription() {
  const [currentPlan, setCurrentPlan] = useState("free");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePlan = async (newPlan: string) => {
    setIsLoading(true);
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentPlan(newPlan);
    alert(
      `Subscription changed to: ${
        plans.find((plan) => plan.id === newPlan)?.name
      }`
    );
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="subscription-plan">Current Plan</Label>
        <Select
          value={currentPlan}
          onValueChange={handleChangePlan}
          disabled={isLoading}
        >
          <SelectTrigger id="subscription-plan">
            <SelectValue placeholder="Select a plan" />
          </SelectTrigger>
          <SelectContent>
            {plans.map((plan) => (
              <SelectItem key={plan.id} value={plan.id}>
                {plan.name} - {plan.price}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        disabled={isLoading}
        onClick={() => handleChangePlan(currentPlan)}
      >
        {isLoading ? "Updating..." : "Update Subscription"}
      </Button>
    </div>
  );
}
