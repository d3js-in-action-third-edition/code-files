import RankingFilters from '../Interactions/RankingFilters';
import Card from '../UI/Card';

const rankingFilters = [
  { id: "satisfaction", label: "Satisfaction" },
  { id: "interest", label: "Interest" },
  { id: "usage", label: "Usage" },
  { id: "awareness", label: "Awareness" },
];

const Rankings = props => {
  return (
    <Card>
      <h2>Rankings</h2>
      <RankingFilters
        filters={rankingFilters}
        activeFilter={activeFilter}
        onFilterSelection={filterSelectionHandler}
      />
    </Card>
  )
};

export default Rankings;