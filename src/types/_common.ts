import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { NextResponse } from 'next/server';
import type { InferAttributes, Model } from 'sequelize';

export type WithNavigate = { navigate: AppRouterInstance['push' | 'replace'] };

export type APIReturn<T extends Promise<NextResponse>> =
  Awaited<T> extends NextResponse<infer R> ? DataValues<R> : never;

export type APIHandlerReturn<
  T extends (...args: any[]) => Promise<NextResponse>,
> = APIReturn<ReturnType<T>>;

export type DataValues<T> = T extends (infer A)[]
  ? A extends Model
    ? DataValues<A>[]
    : A[]
  : T extends Model
    ? InferAttributes<T>
    : T extends PropertyKey | boolean | null | undefined
      ? T
      : { [key in keyof T]: DataValues<T[key]> };
