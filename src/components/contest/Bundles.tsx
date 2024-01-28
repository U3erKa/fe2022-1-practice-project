'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { BundleBox } from 'components/startContest';
import type { SINGLE_BUNDLES } from 'constants/contest';
import { CUSTOMER, PAGE } from 'constants/general';
import { updateBundle } from 'store/slices/bundleSlice';
import type { Bundle } from 'types/slices';

type Props = {
  bundles: typeof SINGLE_BUNDLES;
};

export default function Bundles({ bundles }: Props) {
  const role = useSelector(({ userStore }) => userStore.data?.role);
  const dispatch = useDispatch();
  const router = useRouter();

  const setBundle = useCallback(
    (bundleStr: string) => {
      const array = bundleStr.toLowerCase().split('+');
      const bundleList = { first: array[0] } as unknown as Bundle;
      for (let i = 0; i < array.length; i++) {
        // @ts-expect-error
        bundleList[array[i] as keyof typeof bundleList] =
          i === array.length - 1 ? 'payment' : array[i + 1];
      }
      dispatch(updateBundle(bundleList));
      router.push(`${PAGE.START_CONTEST}/${bundleList.first}`);
    },
    [dispatch, router],
  );

  useEffect(() => {
    if (role !== CUSTOMER) router.replace(PAGE.HOME);
  }, [router, role]);

  return bundles.map((bundle) => (
    <BundleBox key={bundle.header} setBundle={setBundle} {...bundle} />
  ));
}
