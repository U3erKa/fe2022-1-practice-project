import { TryAgain, ItemsContainer } from 'components/general';
import { CustomFilter } from './CustomFilter';
import styles from '../styles/CustomerDashboard.module.sass';

const buttons = [
  { name: 'Offers to review', filter: false },
  { name: 'Reviewed offers', filter: true },
];

export default function ModeratorDashboard() {
  const { isFetching, haveMore, error, offers, isReviewed, contestData } =
    useSelector(({ contestByIdStore }) => contestByIdStore);
  const items = offers.map((offer) => (
    <OfferBox
      data={offer}
      key={offer.id}
      setOfferStatus={setOfferStatusMethod}
      contestData={contestData}
    />
  ));

  return (
    <div className={styles.mainContainer}>
      <CustomFilter
        buttons={buttons}
        predicate={isReviewed}
        filterAction={
          setOfferReviewStatus as ActionCreatorWithPayload<any, string>
        }
      />
      <div className={styles.contestsContainer}>
        {error ? (
          <TryAgain getData={getOffersMethod} />
        ) : (
          <ItemsContainer
            isFetching={isFetching}
            haveMore={haveMore}
            items={items}
            loadMore={getOffersMethod}
          />
        )}
      </div>
    </div>
  );
}
