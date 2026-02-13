import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Profissionais = () => {
  return (
    <section className="bg-gray-50 py-16 flex items-center justify-center ">
      <div className="container mx-auto">
        <h2 className="font-bold text-4xl text-center">Profissionais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardContent>
              <div className="relative h-48 ">
                <Image
                  src="/profissional.png"
                  alt="Profissional"
                  className="rounded-lg object-cover w-full h-48"
                  fill
                  quality={100}
                />
              </div>
              <div className="pt-4 flex flex-col gap-4 ">
                <div className="flex justify-between">
                  <p className="text-lg font-semibold">Odonto pra você</p>
                  <span className="w-4 h-4 rounded-full bg-emerald-500"></span>
                </div>
                <p>Rua x, centro, Campo Grande - MS</p>
                <Link
                  href="/agendar"
                  className="flex justify-center items-center gap-2 bg-[#10B880] hover:bg-emerald-600 text-white text-center font-semibold px-2 rounded-lg py-2 text-sm md:text-base"
                >
                  {" "}
                  Agendar hórario
                  <ArrowRight />
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="relative h-48 ">
                <Image
                  src="/profissional.png"
                  alt="Profissional"
                  className="rounded-lg object-cover w-full h-48"
                  fill
                  quality={100}
                />
              </div>
              <div className="pt-4 flex flex-col gap-4 ">
                <div className="flex justify-between">
                  <p className="text-lg font-semibold">Odonto pra você</p>
                  <span className="w-4 h-4 rounded-full bg-emerald-500"></span>
                </div>
                <p>Rua x, centro, Campo Grande - MS</p>
                <Link
                  href="/agendar"
                  className="flex justify-center items-center gap-2 bg-[#10B880] hover:bg-emerald-600 text-white text-center font-semibold px-2 rounded-lg py-2 text-sm md:text-base"
                >
                  {" "}
                  Agendar hórario
                  <ArrowRight />
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="relative h-48 ">
                <Image
                  src="/profissional.png"
                  alt="Profissional"
                  className="rounded-lg object-cover w-full h-48"
                  fill
                  quality={100}
                />
              </div>
              <div className="pt-4 flex flex-col gap-4 ">
                <div className="flex justify-between">
                  <p className="text-lg font-semibold">Odonto pra você</p>
                  <span className="w-4 h-4 rounded-full bg-emerald-500"></span>
                </div>
                <p>Rua x, centro, Campo Grande - MS</p>
                <Link
                  href="/agendar"
                  className="flex justify-center items-center gap-2 bg-[#10B880] hover:bg-emerald-600 text-white text-center font-semibold px-2 rounded-lg py-2 text-sm md:text-base"
                >
                  {" "}
                  Agendar horário
                  <ArrowRight />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Profissionais;
