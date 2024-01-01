'use client';

import { useRouter } from 'next/navigation';
import { type FC, useCallback, useEffect } from 'react';
import LightBox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useDispatch, useSelector } from 'hooks';
import { ContestPageContents } from 'components/contestById';
import { Header } from 'components/general';
import { PAGE, PUBLIC_URL } from 'constants/general';
import {
  changeEditContest,
  changeShowImage,
  getContestById,
} from 'store/slices/contestByIdSlice';

export type Props = {
  readonly params: { id: number };
};

const ContestPage: FC<Props> = ({ params: { id } }) => {
  const { imagePath, isShowOnFull, user } = useSelector(
    ({ contestByIdStore, userStore }) => {
      const { imagePath, isShowOnFull } = contestByIdStore;
      const { data: user } = userStore;
      return { imagePath, isShowOnFull, user };
    },
  );
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContestById({ contestId: id }));

    return () => {
      dispatch(changeEditContest(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowOnFull = useCallback(
    () => dispatch(changeShowImage({ imagePath: null, isShowOnFull: false })),
    [dispatch],
  );

  if (!user) {
    router.replace(PAGE.HOME);
    return null;
  }

  return (
    <div>
      {isShowOnFull ? (
        <LightBox
          open
          close={handleShowOnFull}
          slides={[{ src: `${PUBLIC_URL}${imagePath}` }]}
        />
      ) : null}
      <Header />
      <ContestPageContents contestId={id} />
    </div>
  );
};

export default ContestPage;
