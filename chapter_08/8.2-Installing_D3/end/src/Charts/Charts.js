import { Fragment } from 'react';

import Rankings from './Rankings';
import ScatterplotD3Controlled from './ScatterplotD3Controlled';
import BarChart from './BarChart';

const Charts = props => {
  return (
    <Fragment>
      <h1>Front-end Frameworks</h1>
      <div className='row'>
        <div className='col-9'>
          <Rankings />
        </div>
        <div className='col-3'>
          <div className='row'>
            <div className='col-12'>
              <ScatterplotD3Controlled />
            </div>
            <div className='col-12'>
              <BarChart />
            </div>
          </div>
        </div>
      </div>
      <div className="source">Data source and original rankings chart: <a href="https://2021.stateofjs.com/en-US/libraries/front-end-frameworks">The State of JS 2021: Front-end Frameworks</a></div>
    </Fragment>
  )
};

export default Charts;