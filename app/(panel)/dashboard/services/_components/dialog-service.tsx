"use client";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useServiceForm, ServiceFormData } from "./service-form";
import { Controller } from "react-hook-form";
import convertRealToCent from "@/utils/convertCurrency";
import { createNewService } from "../_actions/create-service";
import { toast } from "sonner";
import { updateService } from "../_actions/update-service";

export interface DialogServiceProps {
  closeModal: () => void;
  serviceId?: string;
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
}

export default function DialogService({
  closeModal,
  serviceId,
  initialValues,
}: DialogServiceProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useServiceForm({ initialValues: initialValues });

  async function onSubmit(values: ServiceFormData) {
    setLoading(true);
    const priceInCents = convertRealToCent(values.price);
    const hours = parseInt(values.hours) || 0;
    const minutes = parseInt(values.minutes) || 0;

    const duration = hours * 60 + minutes;

    if (serviceId) {
      await editServiceById({
        serviceId: serviceId,
        name: values.name,
        priceInCents: priceInCents,
        duration: duration,
      });
      setLoading(false);
      return;
    }

    const response = await createNewService({
      name: values.name,
      price: priceInCents,
      duration: duration,
    });
    setLoading(false);

    if (response.error) {
      toast("Erro ao cadastrar serviço");
    }
    if (!response.error) {
      setIsDialogOpen(false);
    }

    toast.success("Serviço cadastrado com sucesso");
    handleCloseModal();
  }

  async function editServiceById({
    serviceId,
    name,
    priceInCents,
    duration,
  }: {
    serviceId: string;
    name: string;
    priceInCents: number;
    duration: number;
  }) {
    const response = await updateService({
      serviceId: serviceId,
      name: name,
      price: priceInCents,
      duration: duration,
    });

    setLoading(false);

    if (response.error) {
      toast("Erro ao cadastrar serviço");
    }

    toast.success("Serviço cadastrado com sucesso");
    handleCloseModal();
  }

  function handleCloseModal() {
    form.reset();
    closeModal();
  }

  // valor em centavos = valor em reais * 100
  // valor em reais = valor em centavos / 100
  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;
    value = value.replace(/\D/g, "");

    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
      value = value.replace(".", ",");
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    event.target.value = value;
    form.setValue("price", value);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Serviço</DialogTitle>
      </DialogHeader>
      <DialogDescription>Adicione um novo serviço:</DialogDescription>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="name">Nome do serviço</FieldLabel>
                <Input id="name" placeholder="Nome do serviço" {...field} />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="price">Valor do serviço</FieldLabel>
                <Input
                  id="price"
                  placeholder="Ex: 120,00"
                  {...field}
                  onChange={changeCurrency}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <p className="font-medium text-sm">Tempo de duração do serviço</p>
          <div className="flex justify-between gap-5">
            <Controller
              name="hours"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="hours">Horas</FieldLabel>
                  <Input
                    id="hours"
                    placeholder="1"
                    min="0"
                    type="number"
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="minutes"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="minutes">Minutos</FieldLabel>
                  <Input
                    id="minutes"
                    placeholder="00"
                    min="0"
                    type="number"
                    {...field}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </FieldGroup>
        <Button
          type="submit"
          className="w-full mt-5 cursor-pointer"
          disabled={loading}
        >
          {loading
            ? "Carregando..."
            : `${serviceId ? "Atualizar serviço" : "Adicionar serviço"}`}
        </Button>
      </form>
    </>
  );
}
