import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import SignIn from "@/app/components/sign-in/SignIn";
import { getServerSession } from "next-auth";
import { permanentRedirect } from "next/navigation";

async function Page() {
  // const session = await getServerSession(authOptions);
  // if (session?.token?.user) {
  //   permanentRedirect("/dashboard");
  // }
  return (
    <div>
      <SignIn />
    </div>
  );
}

export default Page;
