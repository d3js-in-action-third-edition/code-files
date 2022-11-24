import { useState } from 'react';

import RankingFilters from '../Interactions/RankingFilters';
import Card from '../UI/Card';
import ChartContainer from '../ChartComponents/ChartContainer';

const rankingFilters = [
  { id: "satisfaction", label: "Satisfaction" },
  { id: "interest", label: "Interest" },
  { id: "usage", label: "Usage" },
  { id: "awareness", label: "Awareness" },
];

const Rankings = props => {
  const [activeFilter, setActiveFilter] = useState("satisfaction");

  const width = 1000;
  const height = 542;
  const marginRight = 150;
  const marginLeft = 110;
  const innerWidth = width - props.marginLeft - props.marginRight;
  const innerHeight = height - props.margin.top - props.margin.bottom;

  return (
    <Card>
      <h2>Rankings</h2>
      <RankingFilters
        filters={rankingFilters}
        activeFilter={activeFilter}
      />
      <ChartContainer
        width={width}
        height={height}
        margin={props.margin}
      >
      </ChartContainer> 
    </Card>
  )
};

export default Rankings;