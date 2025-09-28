"use server";

import { client } from "@/core/api/client";

export const listUsers = async (options: PaginationParams): Promise<PagedResult<User>> => {
  const { page, pageSize } = options;

  const { data } = await client.get(`/users?page=${page}&pageSize=${pageSize}`);

  return data;
};