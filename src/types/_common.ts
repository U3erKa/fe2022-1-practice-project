import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export type WithNavigate = { navigate: AppRouterInstance['push' | 'replace'] };
