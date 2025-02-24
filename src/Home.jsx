import { SignInButton } from "@clerk/clerk-react";
import { Button } from "./components/ui/button";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Category from "./components/Category";
import MostSearchedCar from "./components/MostSearchedCar";
import Info from "./components/Info";
import Footer from "./components/Footer";
function Home() {
  return (
    <div>
      {/* Header */}
      <Header></Header>
      {/* Hero */}
      <Hero></Hero>
      {/* catergory */}
      <Category></Category>
      {/* most car search */}
      <MostSearchedCar></MostSearchedCar>

      {/* info */}
      <Info></Info>

        <Footer></Footer>

      <SignInButton mode="modal" afterSignIn="/">
        <Button>Sign In</Button>
      </SignInButton>
    </div>
  );
}
export default Home;
