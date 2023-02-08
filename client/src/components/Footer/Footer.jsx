import { Component } from 'react';
import { Link } from 'react-router-dom';

import { DUMMY_LINK, FOOTER_ITEMS } from 'constants/general';
import styles from './Footer.module.sass';

class Footer extends Component {
  topFooterItemsRender = (item) => (
    <div key={item.title}>
      <h4>{item.title}</h4>
      {item.items.map((i) => (
        <Link key={i} to={DUMMY_LINK}>
          {i}
        </Link>
      ))}
    </div>
  );

  topFooterRender() {
    return FOOTER_ITEMS.map((item) => this.topFooterItemsRender(item));
  }

  render() {
    return (
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div>{this.topFooterRender()}</div>
        </div>
      </div>
    );
  }
}

export default Footer;
