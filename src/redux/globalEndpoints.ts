/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryFn, EndpointBuilder, QueryDefinition, MutationDefinition } from "@reduxjs/toolkit/query";
import { IResponse } from "./reduxTypes";
import { Key } from "react";

type EndpointName<TTag extends string> =
  | `getAll${TTag}`
  | `getById${TTag}`
  | `create${TTag}`
  | `update${TTag}`
  | `delete${TTag}`
  | `deleteMany${TTag}`;

export const globalEndpoints = <T, TTag extends string>(
  builder: EndpointBuilder<BaseQueryFn, string, string>,
  path: string,
  name: TTag,
  tags?: string[],
): {
  [K in EndpointName<TTag>]: K extends `getAll${string}`
    ? QueryDefinition<Record<string, unknown>, BaseQueryFn, string, IResponse<T[]>, string>
    : K extends `getById${string}`
      ? QueryDefinition<string, BaseQueryFn, string, IResponse<T>, string>
      : K extends `create${string}`
        ? MutationDefinition<Partial<T>, BaseQueryFn, string, IResponse<T>, string>
        : K extends `update${string}`
          ? MutationDefinition<{ id: string; body: Partial<T> }, BaseQueryFn, string, IResponse<T>, string>
          : K extends `deleteMany${string}`
            ? MutationDefinition<string[] | Key[], BaseQueryFn, string, void, string>
            : K extends `delete${string}`
              ? MutationDefinition<string, BaseQueryFn, string, void, string>
              : never;
} =>
  ({
    [`getAll${name}`]: builder.query<IResponse<T[]>, Record<string, unknown>>({
      query: (params) => ({
        url: `/${path}`,
        method: "GET",
        params,
      }),
      providesTags: [name],
    }),

    [`getById${name}`]: builder.query<IResponse<T>, string>({
      query: (id) => ({
        url: `/${path}/${id}`,
        method: "GET",
      }),
      providesTags: [name],
    }),

    [`create${name}`]: builder.mutation<IResponse<T>, Partial<T>>({
      query: (body) => ({
        url: `/${path}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [name, ...tags],
    }),

    [`update${name}`]: builder.mutation<IResponse<T>, { id: string; body: Partial<T> }>({
      query: ({ id, body }) => ({
        url: `/${path}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [name, ...tags],
    }),

    [`delete${name}`]: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${path}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [name, ...tags],
    }),

    [`deleteMany${name}`]: builder.mutation<void, string[]>({
      query: (ids) => ({
        url: `/${path}/delete-many`,
        method: "POST",
        body: { ids },
      }),
      invalidatesTags: [name, ...tags],
    }),
  }) as any;
