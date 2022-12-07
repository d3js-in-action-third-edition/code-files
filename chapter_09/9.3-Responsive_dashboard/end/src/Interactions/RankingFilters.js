import Button from "../UI/Button";

import './RankingFilters.css';

const RankingFilters = props => {
  return (
    <div className="ranking-filters">
      {props.filters.map(filter => (
        <Button
          key={filter.id}
          id={filter.id}
          label={filter.label}
          isActive={props.activeFilter === filter.id ? true : false}
          onClick={props.onFilterSelection}
        />
      ))}
    </div>
  );
};

export default RankingFilters;