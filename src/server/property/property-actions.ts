"use server";

import { client } from "@/core/api/client";
import { PropertyFormInput } from "@/core/schema/property-form-schema";

export const addProperty = async (values: PropertyFormInput) => {
  await client.post("/properties", values);
};

export const editProperty = async (id: string, values: PropertyFormInput) => {
  await client.patch(`/properties/${id}`, values);
};

export const listProperties = async (options: PaginationParams): Promise<PagedResult<Property>> => {
  const { page, pageSize } = options;
  const { data } = await client.get(`/properties?page=${page}&pageSize=${pageSize}`);
  return data;
};

type DeleteParams = {
  id?: string;
  ids?: string[];
};

export const deleteProperty = async ({ id, ids }: DeleteParams) => {
  if (id) {
    await client.delete(`/properties/${id}`);
  } else if (ids) {
    await client.post("/properties/delete/bulk", ids);
  } else {
    throw new Error("One id or ids array is required");
  }
};
