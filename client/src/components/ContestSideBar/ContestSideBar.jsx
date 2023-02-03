import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import styles from './ContestSideBar.module.sass';
import CONSTANTS from '../../constants';

const ContestSideBar = props => {
  const getTimeStr = () => {
    const diff = moment.duration(
      moment().diff(moment(props.contestData.createdAt))
    );
    let str = '';
    if (diff._data.days !== 0) str = `${diff._data.days} days `;
    if (diff._data.hours !== 0) str += `${diff._data.hours} hours`;
    if (str.length === 0) str = 'less than one hour';
    return str;
  };

  const renderContestInfo = () => {
    const { totalEntries } = props;
    const { User, prize } = props.contestData;
    return (
      <div className={styles.contestSideBarInfo}>
        <div className={styles.contestInfo}>
          <div className={styles.awardAndTimeContainer}>
            <div className={styles.prizeContainer}>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}big-diamond.png`}
                alt='diamond'
              />
              <span>{`$ ${prize}`}</span>
            </div>
            <div className={styles.timeContainer}>
              <div className={styles.timeDesc}>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}clock.png`}
                  alt='clock'
                />
                <span>Going</span>
              </div>
              <span className={styles.time}>{getTimeStr()}</span>
            </div>
            <div className={styles.guaranteedPrize}>
              <div>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}smallCheck.png`}
                  alt='check'
                />
              </div>
              <span>Guaranteed prize</span>
            </div>
          </div>
          <div className={styles.contestStats}>
            <span>Contest Stats</span>
            <div className={styles.totalEntrie}>
              <span className={styles.totalEntriesLabel}>Total Entries</span>
              <span>{totalEntries}</span>
            </div>
          </div>
        </div>
        {props.data.id !== User.id && (
          <div className={styles.infoCustomerContainer}>
            <span className={styles.labelCustomerInfo}>
              About Contest Holder
            </span>
            <div className={styles.customerInfo}>
              <img
                src={
                  User.avatar === 'anon.png'
                    ? CONSTANTS.ANONYM_IMAGE_PATH
                    : `${CONSTANTS.publicURL}${User.avatar}`
                }
                alt='user'
              />
              <div className={styles.customerNameContainer}>
                <span>{`${User.firstName} ${User.lastName}`}</span>
                <span>{User.displayName}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return renderContestInfo();
};

const mapStateToProps = state => state.userStore;

export default connect(mapStateToProps, null)(ContestSideBar);
