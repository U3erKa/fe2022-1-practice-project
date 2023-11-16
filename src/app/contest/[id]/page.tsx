'use client';
import { useEffect, type FC } from 'react';
import LightBox from 'yet-another-react-lightbox';
import { useDispatch, useSelector } from 'store';
import {
  changeEditContest,
  changeShowImage,
  getContestById,
} from 'store/slices/contestByIdSlice';
import { ContestPageContents } from 'components/contestById';
import { Header } from 'components/general';
import { PUBLIC_URL } from 'constants/general';
import 'yet-another-react-lightbox/styles.css';

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
            dispatch(changeShowImage({ isShowOnFull: false, imagePath: null }))
          }
        />
      )}
      <Header />
      <ContestPageContents contestId={id} />
    </div>
  );
};

export default ContestPage;