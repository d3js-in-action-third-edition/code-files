import { useState, useEffect } from 'react';
import * as d3 from 'd3';

import Charts from './Charts/Charts';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataURL = "https://d3js-in-action-third-edition.github.io/hosted-data/apis/front_end_frameworks.json";
    
    d3.json(dataURL).then(data => {
      console.log("data", data);

      setData(data);
      setLoading(false);
    });

  }, []);

  return (
    <div className="container">
      {loading && <div className="loading">Loading...</div>}
      {!loading && <Charts data={data} />}
    </div>
  );
};

export default App;