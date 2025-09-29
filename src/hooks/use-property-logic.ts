import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertyFormDefaultValues, PropertyFormSchema, PropertyFormType } from "@/core/schema/property-form-schema";
import { addProperty, deleteProperty } from "@/server/property/property-actions";
import { handleError } from "@/lib/utils";

export const usePropertyLogic = () => {
  const form = useForm<PropertyFormType>({
    resolver: zodResolver(PropertyFormSchema),
    defaultValues: PropertyFormDefaultValues,
  });

  const handleAddProperty = async (values: PropertyFormType) => {
    try {
      await addProperty(values);
      toast.success("Property added successfully.");
    } catch (error) {
      handleError(error);
    }
  };

  return { form, handleAddProperty };
};

export const handleDeleteProperty = async (id: string) => {
  try {
    await deleteProperty(id);
    toast.success("Property deleted successfully.");
  } catch (error) {
    handleError(error);
  }
};
