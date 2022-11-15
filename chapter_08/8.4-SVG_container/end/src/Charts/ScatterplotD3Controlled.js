import Card from '../UI/Card';
import ChartContainer from '../ChartComponents/ChartContainer';

const ScatterplotD3Controlled = props => {
  const width = 300;
  const height = 245;
  const innerWidth = width - props.margin.left - props.margin.right;
  const innerHeight = height - props.margin.top - props.margin.bottom;

  return (
    <Card>
      <h2>Retention vs Usage</h2>
      <ChartContainer
        width={width}
        height={height}
        margin={props.margin}
      >
      </ChartContainer> 
    </Card>
  )
};

export default ScatterplotD3Controlled;