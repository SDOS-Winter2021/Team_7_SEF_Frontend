import React, { useState, useEffect } from 'react'
// import DonorList from './DonorList';
import { useHistory } from 'react-router-dom';
import APIService from '../../APIService';
// import Breadcrumb from 'react-bootstrap/Breadcrumb';
// import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
// import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
import {VerticalBarSeries, MarkSeries, LabelSeries, VerticalBarSeriesCanvas} from 'react-vis';

// function DonorVisualisation() {

  // const getItems = () => APIService.GetDonor();
  // const [donors, setDonors] = useState([]);
  // const [trial, setTrial] = useState([]);
  // const history = useHistory();

  // useEffect(() => {
  //   getItems().then(data => setDonors(data));
  // }, []);

  // useEffect(() => {
  //   var tx = []
  //   donors.forEach(d => {
  //     //if (d?.Donor === donor?.id) {
  //       tx.push(d.First_Name);
  //     //}
  //   });
  //   setTrial(tx)
  // }, [donors])

  const data = [
    {x: 0, y: 8},
    {x: 1, y: 5},
    {x: 2, y: 4},
    {x: 3, y: 9},
  ];

  const labelData = data.map((d, idx) => ({
    x: d.x,
    y: data[idx].y
  }));

//   return (
//     <div>
//         <XYPlot height={300} width= {300}>
//           <LineSeries data={data} />
//           <VerticalGridLines />
//           <HorizontalGridLines />
//           <XAxis />
//           <YAxis />
//         </XYPlot>

//         <XYPlot height={200} width={200}>
//   <VerticalBarSeries data={data} />
// </XYPlot>
// <XYPlot height={200} width={200}>
//   <LineSeries data={data} />
// </XYPlot>
// <XYPlot height={200} width={200}>
//   <MarkSeries data={data} />
// </XYPlot>

// <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
//           <VerticalGridLines />
//           <HorizontalGridLines />
//           <XAxis />
//           <YAxis />
//           <VerticalBarSeries data={data} />
//           <LabelSeries data={labelData} getLabel={d=>d.x} />
//         </XYPlot>
// <h6>{trial}</h6>
//     </div>
//   )
// }

// export default DonorVisualisation

export default class DonorVisualisation extends React.Component {
  state = {
    useCanvas: false
  };

  render() {
    const {useCanvas} = this.state;
    const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
    return (
      <div>
        {/* <ShowcaseButton
          onClick={() => this.setState({useCanvas: !useCanvas})}
          buttonContent={content}
        /> */}
        <div><h6 class='display-text'>{labelData.map(r => {
              return <option>{r.d}</option>
          })}</h6></div>
        <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          {/* <BarSeries className="vertical-bar-series-example" data={greenData} /> */}
          <BarSeries data={data} />
          <LabelSeries data={labelData} getLabel={d => d.x} />
        </XYPlot>
      </div>
    );
  }
}
