import Card from '../UI/Card';
import ChartContainer from '../ChartComponents/ChartContainer';

const BarChart = props => {
  const width = 300;
  const height = 245;
  const innerWidth = width - props.margin.left - props.margin.right;
  const innerHeight = height - props.margin.top - props.margin.bottom;

  return (
    <Card>
      <h2>Awareness</h2>
      <ChartContainer
        width={width}
        height={height}
        margin={props.margin}
      >
      </ChartContainer> 
    </Card>
  )
};

export default BarChart;