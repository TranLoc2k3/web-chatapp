import ResetPassword from "@/app/components/reset-password/Reset-password";
import { Toaster } from "@/components/ui/toaster";

function SignUpPage() {
  return (
    <div>
      <ResetPassword />
      <Toaster />
    </div>
  );
}

export default SignUpPage;
