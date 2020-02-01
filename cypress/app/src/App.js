import React from 'react';

import {DataStructureTest/*, ValidationTest*/} from './components';

import styles from './app.module.css';

function App() {
  return (
    <div>
      <div className={styles.section}>
        <DataStructureTest />
      </div>
    </div>
  );
}

export default App;
