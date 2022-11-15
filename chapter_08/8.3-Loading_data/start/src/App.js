import { useState } from 'react';
import * as d3 from 'd3';

import Charts from './Charts/Charts';

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="container">
      {loading && <div className="loading">Loading...</div>}
      {!loading && <Charts />}
    </div>
  );
};

export default App;