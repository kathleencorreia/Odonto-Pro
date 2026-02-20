"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileFormData, useProfileForm } from "./profile-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import fotoPerfil from "@/public/foto1.png";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Prisma } from "@prisma/client";
import { updateProfile } from "../_actions/update-profile";
import { toast } from "sonner";
import { formatPhone, extractPhoneNumber } from "@/utils/format-phone";

type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
  };
}>;

interface ProfileContentProps {
  user: UserWithSubscription;
}

export function ProfileContent({ user }: ProfileContentProps) {
  
  const [selectedHours, setSelectedHours] = useState<string[]>(user.time ?? []);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
 
  const form = useProfileForm({
    name: user.name,
    address: user.address,
    phone: user.phone,
    status: user.status,
    timeZone: user.timeZone,
  });

  function generateTimeSlots(): string[] {
    const hours: string[] = [];

    for (let i = 8; i <= 24; i++) {
      for (let j = 0; j < 2; j++) {
        const hour = i.toString().padStart(2, "0");
        const minute = (j * 30).toString().padStart(2, "0");

        hours.push(`${hour}:${minute}`);
      }
    }
    return hours;
  }
  const hours = generateTimeSlots();

  function toggleHour(hour: string) {
    setSelectedHours((prevstate) =>
      prevstate.includes(hour)
        ? prevstate.filter((h) => h !== hour)
        : [...prevstate, hour].sort(),
    );
  }

  const timeZones = Intl.supportedValuesOf("timeZone").filter(
    (zone) =>
      zone.startsWith("America/Sao_Paulo") ||
      zone.startsWith("America/Fortaleza") ||
      zone.startsWith("America/Recife") ||
      zone.startsWith("America/Bahia") ||
      zone.startsWith("America/Belem") ||
      zone.startsWith("America/Manaus") ||
      zone.startsWith("America/Cuiaba"),
  );

  async function onSubmit(values: ProfileFormData) {
    // const extractValue = extractPhoneNumber(values.phone || ""); formatação do telefone
    //console.log(extractValue)

    const response = await updateProfile({
      name: values.name,
      phone: values.phone,
      address: values.address,
      status: values.status === "active" ? true : false,
      timeZone: values.timeZone,
      time: selectedHours || [],
    });

    if (response.error) {
      toast("Erro ao atualizar a clínica");
    }

    toast.success("Dados atualizados com sucesso");
    console.log(response);
  }

 

  return (
    <div className="mx-auto my-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">Meu Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-10">
            <Image
              src={user.image ? user.image : fotoPerfil}
              width={100}
              height={100}
              alt="Foto de Perfil"
              className="rounded-full"
            />
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Nome</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Nome da Clínica"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="address">Endereço</FieldLabel>
                    <Input
                      {...field}
                      id="address"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite seu endereço"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="phone">Telefone</FieldLabel>
                    <Input
                      {...field}
                      id="phone"
                      aria-invalid={fieldState.invalid}
                      placeholder="(62)-99999-9999"
                      onChange={(e) => {
                        const formattedValue = formatPhone(e.target.value);
                        field.onChange(formattedValue);
                      }}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="status">Status</FieldLabel>
                    <Select
                      name={field.name}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue="active"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <FieldLabel>Configurar horário</FieldLabel>
                <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex justify-between border rounded-[7px] px-3 py-2 text-sm text-left bg-transparent text-gray-500 font-light"
                    >
                      Abrir
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Horários</DialogTitle>
                      <DialogDescription>
                        Selecione abaixo os horários de funcionamento:
                      </DialogDescription>
                    </DialogHeader>
                    <section>
                      <div className="grid grid-cols-5 gap-2 ">
                        {hours.map((hour) => (
                          <Button
                            key={hour}
                            variant="outline"
                            className={cn(
                              "bg-transparent text-black border",
                              selectedHours.includes(hour) &&
                                " border-2 border-emerald-500",
                            )}
                            onClick={() => toggleHour(hour)}
                          >
                            {hour}
                          </Button>
                        ))}
                      </div>
                    </section>
                    <Button onClick={() => setDialogIsOpen(false)}>
                      Salvar horários
                    </Button>
                  </DialogContent>
                </Dialog>
              </Field>
              <Controller
                name="timeZone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="timeZone">Fuso horário</FieldLabel>
                    <Select
                      name={field.name}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o fuso horário"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {timeZones.map((zone) => (
                          <SelectItem key={zone} value={zone}>
                            {zone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button
              type="submit"
              className=" w-full mt-5 bg-emerald-500 text-white font-semibold hover:bg-emerald-300 cursor-pointer"
            >
              Salvar alterações
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
