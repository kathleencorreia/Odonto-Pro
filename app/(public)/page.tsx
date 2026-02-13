import Footer from "./_components/Footer";
import { Header } from "./_components/Header";
import Hero from "./_components/Hero";
import Profissionais from "./_components/Profissionais";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Hero/>
      <Profissionais/>
      <Footer/>
    </div>
  );
}
