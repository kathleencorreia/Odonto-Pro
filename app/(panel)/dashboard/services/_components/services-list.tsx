"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Services } from "@prisma/client";
import { formatCurrency } from "@/utils/formatCurrency";
import { deleteService } from "../_actions/delete-services";
import DialogService from "./dialog-service";

interface ServicesListProps {
  services: Services[];
}

export default function ServicesList({ services }: ServicesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [editingService, setEditingService] = useState<null | Services>(null);

  async function handleDeleteService(serviceId: string) {
    const response = await deleteService({ serviceId: serviceId });
    if (response.error) {
      toast(response.error);
      return;
    }

    toast.success(response.data);
  }

  function handleEditService(service: Services) {
    console.log(service);
    setEditingService(service);
    setIsDialogOpen(true);
  }

  return (
    <section>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <section className="w-full flex justify-between md:px-10 mt-10">
          <h2 className="text-xl md:text-2xl font-semibold">Services</h2>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="bg-transparent text-black border-2 hover:bg-black hover:text-emerald-500 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent
            onInteractOutside={(e) => {
              e.preventDefault();
              setIsDialogOpen(false);
              setEditingService(null);
            }}
          >
            <DialogService
              closeModal={() => {
                setIsDialogOpen(false);
                setEditingService(null);
              }}
              serviceId={editingService ? editingService.id : undefined}
              initialValues={
                editingService
                  ? {
                      name: editingService.name,
                      price: (editingService.price / 100)
                        .toFixed(2)
                        .replace(".", ","),
                      hours: Math.floor(
                        editingService.duration / 60,
                      ).toString(),
                      minutes: (editingService.duration % 60).toString(),
                    }
                  : undefined
              }
            />
          </DialogContent>
        </section>
      </Dialog>
      <div className="mt-10 md:px-10">
        <ul>
          {services.map((service) => (
            <li key={service.id} className="border-b">
              <div className="w-full flex justify-between items-center py-2">
                <div className="flex gap-2">
                  <p className="font-semibold min-w-25 truncate">
                    {service.name
                      ? service.name.charAt(0).toUpperCase() +
                        service.name.slice(1)
                      : ""}
                  </p>
                  <span>-</span>
                  <p className="text-gray-500">
                    {formatCurrency(service.price / 100)}
                  </p>
                </div>
                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditService(service)}
                  >
                    <Edit />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <X />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
