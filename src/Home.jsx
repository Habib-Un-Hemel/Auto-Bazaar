import { SignInButton } from "@clerk/clerk-react";
import { Button } from "./components/ui/button";
import Header from "./components/Header";

function Home() {
  return (
    <div>
      {/* Header */}
      <Header></Header>

      <SignInButton mode="modal" afterSignIn="/">
        <Button>Sign In</Button>
      </SignInButton>
    </div>
  );
}
export default Home;
