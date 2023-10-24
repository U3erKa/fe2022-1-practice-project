import { useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import LightBox from 'yet-another-react-lightbox';
import { useDispatch, useSelector } from 'hooks';
import {
  changeEditContest,
  changeShowImage,
  getContestById,
} from 'store/slices/contestByIdSlice';
import { ContestPageContents } from '.';
import { Header } from 'components/general';
import { PUBLIC_URL } from 'constants/general';
import 'yet-another-react-lightbox/styles.css';

const ContestPage = () => {
  const { isShowOnFull, imagePath } = useSelector(
    ({ contestByIdStore }) => contestByIdStore,
  );

  const dispatch = useDispatch();
  const match = useMatch('/contest/:id')!;
  const contestId = match.params.id as unknown as number;

  useEffect(() => {
    dispatch(getContestById({ contestId }));

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
      <ContestPageContents contestId={contestId} />
    </div>
  );
};

export default ContestPage;
