"use server";

import { prisma } from "@/lib/prisma";

export async function getAllServices({ userId }: { userId: string }) {
  if (!userId) {
    return {
      error: "Falha ao buscar serviços",
    };
  }

  try {
    const services = await prisma.services.findMany({
      where: {
        userId: userId,
        status: true,
      },
    });

    console.log("Aqui vamos buscar seus serviços");
    return {
      data: services,
    };
  } catch {
    return {
      error: "Falha ao buscar serviços",
    };
  }
}
