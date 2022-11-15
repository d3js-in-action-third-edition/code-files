import { useState } from 'react';

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