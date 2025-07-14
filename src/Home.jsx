import { SignInButton } from "@clerk/clerk-react";
import { Button } from "./components/ui/button";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Category from "./components/Category";
import MostSearchedBike from "./components/MostSearchedBike";
import Info from "./components/Info";
import Footer from "./components/Footer";
function Home() {
  return (
    <div>
      <Header></Header>
      <Hero></Hero>
      <Category></Category>
      <MostSearchedBike></MostSearchedBike>
      <Info></Info>

      <Footer></Footer>
      {/* 
      <SignInButton mode="modal" forceRedirectUrl="/">
        <Button>Sign In</Button>
      </SignInButton> */}
    </div>
  );
}
export default Home;
