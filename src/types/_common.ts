import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { NextResponse } from 'next/server';

export type WithNavigate = { navigate: AppRouterInstance['push' | 'replace'] };

export type APIReturn<T extends Promise<NextResponse>> =
  Awaited<T> extends NextResponse<infer R> ? R : never;

export type APIHandlerReturn<
  T extends (...args: any[]) => Promise<NextResponse>,
> = APIReturn<ReturnType<T>>;
