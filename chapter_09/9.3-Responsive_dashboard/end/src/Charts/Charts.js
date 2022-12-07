import { Fragment, useState, useEffect } from 'react';
import * as d3 from 'd3';

import Rankings from './Rankings';
import RankingsMobile from './RankingsMobile';
import ScatterplotReactControlled from './ScatterplotReactControlled';
import BarChart from './BarChart';
import BarChartMobile from './BarChartMobile';

const breakPoint = 600;
const getLayout = () => {
  const layout = window.innerWidth >= breakPoint ? "desktop" : "mobile";
  return layout;
};

const rankingFilters = [
  { id: "satisfaction", label: "Satisfaction" },
  { id: "interest", label: "Interest" },
  { id: "usage", label: "Usage" },
  { id: "awareness", label: "Awareness" },
];

const Charts = props => {
  const [layout, setLayout] = useState(getLayout());

  const margin = {top: 30, right: 10, bottom: 50, left: 60};

  useEffect(() => {
    const handleWindowResize = () => {
      const windowWidth = window.innerWidth;
      if ((windowWidth >= breakPoint && layout === "mobile") ||
          (windowWidth < breakPoint && layout === "desktop")) {
        setLayout(getLayout());
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [layout]);

  const colorScale = d3.scaleOrdinal()
    .domain(props.data.ids)
    .range(d3.schemeTableau10);
  
  const [activeFilter, setActiveFilter] = useState("satisfaction");
  const filterSelectionHandler = (id) => {
    if (activeFilter !== id) {
      setActiveFilter(id);
    }
  };

  return (
    <Fragment>
      <h1>Front-end Frameworks</h1>
      <div className='row'>
        <div className='col-12 col-lg-9'>
          {layout === "desktop"
            ? <Rankings 
                margin={margin} 
                data={props.data}
                colorScale={colorScale}
                rankingFilters={rankingFilters}
                activeFilter={activeFilter}
                onFilterSelection={filterSelectionHandler}
              />
            : <RankingsMobile
                margin={margin} 
                data={props.data}
                colorScale={colorScale}
                rankingFilters={rankingFilters}
                activeFilter={activeFilter}
                onFilterSelection={filterSelectionHandler}
              />
          }
        </div>
        <div className='col-12 col-lg-3'>
          <div className='row'>
            <div className='col-12 col-md-6 col-lg-12'>
              <ScatterplotReactControlled 
                margin={margin}
                data={props.data.experience}
                colorScale={colorScale}
              />
            </div>
            <div className='col-12 col-md-6 col-lg-12'>
              {layout === "desktop"
                ? <BarChart 
                    data={props.data.experience} 
                    margin={margin} 
                    colorScale={colorScale}
                  />
                : <BarChartMobile 
                    data={props.data.experience} 
                    margin={margin} 
                    colorScale={colorScale}
                  />
              }
            </div>
          </div>
        </div>
      </div>
      <div className="source">Data source and original rankings chart: <a href="https://2021.stateofjs.com/en-US/libraries/front-end-frameworks">The State of JS 2021: Front-end Frameworks</a></div>
    </Fragment>
  )
};

export default Charts;