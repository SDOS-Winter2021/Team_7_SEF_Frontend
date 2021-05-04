import React from 'react'
//import { useHistory } from 'react-router-dom';
//import APIService from '../../APIService';
// import '../node_modules/react-vis/dist/style.css';
import {XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
import {VerticalBarSeries, LabelSeries, VerticalBarSeriesCanvas} from 'react-vis';

function TransactionVisualisation(props) {

  const data = [
    {x: 'Q1', y: props.amountQ1/1000},
    {x: 'Q2', y: 0},
    {x: 'Q3', y: 0},
    {x: 'Q4', y: 0},
  ];

  const labelData = data.map((d, idx) => ({
    x: d.x,
    y: data[idx].y
  }));
  
  return (
    <TransactionVisualisationClass labeldata={labelData} data={data}/>
  )
}

export default TransactionVisualisation

class TransactionVisualisationClass extends React.Component {

  state = {
    useCanvas: false
  };

  render() {
    const {useCanvas} = this.state;
    //const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
    return (
      <div>
        <XYPlot xType="ordinal" width={750} height={400} color="#5cb85c">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <BarSeries data={this.props.data} />
          <LabelSeries data={this.props.labelData} getLabel={d => d.x} />
        </XYPlot>
      </div>
    );
  }
}

