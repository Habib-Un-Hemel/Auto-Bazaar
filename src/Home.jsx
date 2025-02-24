import { SignInButton } from "@clerk/clerk-react";
import { Button } from "./components/ui/button";

function Home() {
  return (
    <div>
      <SignInButton mode="modal" forceRedirectUrl="/">
        <Button>Sign in</Button>
      </SignInButton>
    </div>
  );
}
export default Home;
