import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertyFormDefaultValues, PropertyFormInput, PropertyFormSchema } from "@/core/schema/property-form-schema";
import { addProperty, editProperty, deleteProperty } from "@/server/property/property-actions";
import { handleClientError } from "@/lib/utils";
import { queryClient } from "@/providers/query-provider";
import { queryKeys } from "@/core/constants";

export const usePropertyLogic = (property?: Property) => {
  const form = useForm<PropertyFormInput>({
    resolver: zodResolver(PropertyFormSchema),
    defaultValues: property
      ? {
          ...property,
          images: property.images.join(","),
        }
      : PropertyFormDefaultValues,
  });

  const handleAddProperty = async (values: PropertyFormInput) => {
    try {
      if (property && property.id) {
        await editProperty(property.id, values);
        toast.success("Property updated successfully.");
      } else {
        await addProperty(values);
        toast.success("Property added successfully.");
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.PROPERTIES });
    } catch (error) {
      handleClientError(error);
    }
  };

  return { form, handleAddProperty };
};

export const handleDeleteProperty = async (id: string) => {
  try {
    await deleteProperty({ id });
    await queryClient.invalidateQueries({ queryKey: queryKeys.PROPERTIES });
    toast.success("Property deleted successfully.");
  } catch (error) {
    handleClientError(error);
  }
};
