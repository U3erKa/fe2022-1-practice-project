'use client';

import { type FC, useEffect } from 'react';
import LightBox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useDispatch, useSelector } from 'store';
import { ContestPageContents } from 'components/contestById';
import { Header } from 'components/general';
import { PUBLIC_URL } from 'constants/general';
import {
  changeEditContest,
  changeShowImage,
  getContestById,
} from 'store/slices/contestByIdSlice';

export type Props = {
  params: { id: number };
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

  return (
    <div>
      {isShowOnFull && (
        <LightBox
          open
          slides={[{ src: `${PUBLIC_URL}${imagePath}` }]}
          close={() =>
            dispatch(changeShowImage({ imagePath: null, isShowOnFull: false }))
          }
        />
      )}
      <Header />
      <ContestPageContents contestId={id} />
    </div>
  );
};

export default ContestPage;
