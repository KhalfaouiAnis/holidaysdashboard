"use client";

import { PAGE_SIZE, queryKeys } from "@/core/constants";
import { listUsers } from "@/server/user/user-actions";
import { useQuery } from "@tanstack/react-query";

type PropertiesOptions = {
  page: number;
  pageSize?: number;
};

const useUsers = ({ page, pageSize }: PropertiesOptions) => {
  const { data, status, isRefetching, isLoading, isPending, error, refetch } = useQuery({
    queryKey: queryKeys.USERS,
    queryFn: () =>
      listUsers(
        {
          page,
          pageSize: pageSize || PAGE_SIZE,
        },
      ),
  });

  const users = data?.data ?? [];

  return {
    users,
    isLoading,
    count: data?.totalCount,
    status,
    error,
    isPending,
    isRefetching,
    refetch,
  };
};

export default useUsers;
