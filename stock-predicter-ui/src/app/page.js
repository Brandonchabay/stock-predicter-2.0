import { createUser } from "../firebase/auth.js";
import Navbar from "./Components/Navbar.js";
import InfoSection from "./Components/Infosection.js";
export default function Home() {
  return (
    <div className="">
      <Navbar />
      <InfoSection />
    </div>
  );
}
