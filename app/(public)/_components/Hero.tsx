import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-full min-h-screen px-40 pt-30 pb-20">
      <div className="container mx-auto grid gap-8 md:grid-cols-2 items-center justify-center">
        <div className="flex flex-col md:col-span-1 gap-8 items-center md:items-start max-w-2xl">
          <h1 className="font-bold text-5xl md:text-[54px] text-center md:text-left">
            Encontre os melhores profissionais em um único local!
          </h1>
          <p className="text-lg text-center md:text-left md:max-w-3/4">
            Nós somos uma plataforma para profissionais da saúde com foco em
            agilizar seu atendimento de forma simplificada e organizada.
          </p>
          <Button className="bg-[#10B880] hover:bg-emerald-600 px-2 rounded-lg py-4 md:w-fit">
            Profissionais disponíveis
          </Button>
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <Image
            src="/doctor-hero.png"
            alt="Doctor image"
            width={237}
            height={355}
            className="md:w-[437] md:h-[555] object-contain"
            quality={100}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
