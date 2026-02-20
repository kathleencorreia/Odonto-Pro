import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(1, { message: "Esse campo é obrigatório" }),
  price: z.string().min(1, { message: "Esse campo é obrigatório" }),
  hours: z.string(),
  minutes: z.string(),
});

export interface UseServiceFromProps {
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
}

export type ServiceFormData = z.infer<typeof formSchema>;

export function useServiceForm({ initialValues }: UseServiceFromProps) {
  return useForm<ServiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: "",
      price: "",
      hours: "",
      minutes: "",
    }
  });
}
