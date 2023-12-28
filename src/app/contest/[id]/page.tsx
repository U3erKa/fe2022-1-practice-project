'use client';

import { type FC, useCallback, useEffect } from 'react';
import LightBox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useDispatch, useSelector } from 'hooks';
import { ContestPageContents } from 'components/contestById';
import { Header } from 'components/general';
import { PUBLIC_URL } from 'constants/general';
import {
  changeEditContest,
  changeShowImage,
  getContestById,
} from 'store/slices/contestByIdSlice';

export type Props = {
  readonly params: { id: number };
};

const ContestPage: FC<Props> = ({ params: { id } }) => {
  const { isShowOnFull, imagePath } = useSelector(
    ({ contestByIdStore }) => contestByIdStore,
  );

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
