import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChangeUsername from "./change-username";
import ResetPassword from "./reset-password";
import ManageSubscription from "./manage-subscription";

export default function AccountPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Change Username</CardTitle>
            <CardDescription>
              Update your username here. Your current username is displayed
              below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChangeUsername />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Change your password to keep your account secure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPassword />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manage Subscription</CardTitle>
            <CardDescription>
              View and update your current subscription plan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ManageSubscription />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
