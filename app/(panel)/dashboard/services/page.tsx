import getSession from "@/lib/getSession"
import { redirect } from "next/navigation";
import { ServicesContent } from "./_components/service-content";

const Services = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }
  return (
    <div>
    <ServicesContent userId={session.user.id!}/>
    </div>
  );
};

export default Services;
