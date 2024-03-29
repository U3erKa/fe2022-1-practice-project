'use client';

import { useCallback, useEffect, type FC } from 'react';
import LightBox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useDispatch, useSelector } from 'hooks';
import { ContestPageContents } from 'components/contestById';
import { Header, OnlyAuthorizedUser } from 'components/general';
import { PUBLIC_URL } from 'constants/general';
import {
  changeEditContest,
  changeShowImage,
  getContestById,
} from 'store/slices/contestByIdSlice';

export type Props = {
  readonly params: { id: number };
};

const ContestPage = (({ params: { id } }) => {
  const { imagePath, isShowOnFull } = useSelector(({ contestByIdStore }) => {
    const { imagePath, isShowOnFull } = contestByIdStore;
    return { imagePath, isShowOnFull };
  });

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

  return (
    <OnlyAuthorizedUser>
      {isShowOnFull ? (
        <LightBox
          open
          close={handleShowOnFull}
          slides={[{ src: `${PUBLIC_URL}${imagePath}` }]}
        />
      ) : null}
      <Header />
      <ContestPageContents contestId={id} />
    </OnlyAuthorizedUser>
  );
}) satisfies FC<Props>;

export default ContestPage;
