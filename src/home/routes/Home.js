import {useState, React} from 'react';

import Owner from '../components/Owner';
import MainSearch from '../components/MainSearch';
import styles from '../css/Home.module.css';

function Home() {
    return(
      <div id="wrapper">
        <div id={styles.ownerWrapper}>
              <Owner placement="end" />
        </div>
        <div id={styles.searchWrapper}>
              <MainSearch />
        </div>
      </div>
    );
}

export default Home;