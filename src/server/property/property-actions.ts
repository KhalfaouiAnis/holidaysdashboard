"use server";

import { client } from "@/core/api/client";
import { PropertyFormType } from "@/core/schema/property-form-schema";

export const addProperty = async (values: PropertyFormType) => {
  await client.post("/properties", values);
};

export const listProperties = async (options: PaginationParams): Promise<PagedResult<Property>> => {
  const { page, pageSize } = options;

  const { data } = await client.get(`/properties?page=${page}&pageSize=${pageSize}`);

  return data;
};

export const deleteProperty = async (id: string) => {
  await client.delete(`/properties/${id}`);
};
