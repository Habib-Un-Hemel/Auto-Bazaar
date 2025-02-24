import { SignInButton } from "@clerk/clerk-react";
import { Button } from "./components/ui/button";
import Header from "./components/Header";
import Hero from "./components/Hero";
function Home() {
  return (
    <div>
      {/* Header */}
      <Header></Header>
      <Hero></Hero>
      

      <SignInButton mode="modal" afterSignIn="/">
        <Button>Sign In</Button>
      </SignInButton>
    </div>
  );
}
export default Home;
