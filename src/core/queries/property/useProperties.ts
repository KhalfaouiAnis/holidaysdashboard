"use client";

import { PAGE_SIZE, queryKeys } from "@/core/constants";
import { listProperties } from "@/server/property/property-actions";
import { useQuery } from "@tanstack/react-query";

type PropertiesOptions = {
  page: number;
  pageSize?: number;
};

const useProperties = ({ page, pageSize }: PropertiesOptions) => {
  const { data, status, isRefetching, isLoading, isPending, error, refetch } = useQuery<PagedResult<Property>>({
    queryKey: [...queryKeys.USERS, page],
    queryFn: () =>
      listProperties({
        page,
        pageSize: pageSize || PAGE_SIZE,
      }),
  });

  return {
    properties: data?.data ?? [],
    page: data?.page,
    pageSize: data?.pageSize,
    totalCount: data?.totalCount,
    totalPages: data?.totalPages,
    isLoading,
    status,
    error,
    isPending,
    isRefetching,
    refetch,
  };
};

export default useProperties;
