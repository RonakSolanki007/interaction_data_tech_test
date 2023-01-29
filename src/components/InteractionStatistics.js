import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import "./InteractionStatistics.scss";

const InteractionStatistics = (props) => {
  const options = {};
  const series = [];
  const highchartData = [];
  let ui = [];
  let total = 0;
  const interactionCount = {};
  const interactionData = props.data;
  let sectorName = "";

  //calculating count of interactions within data on basis of sector name
  interactionData.map((data) => {
    sectorName = data.name.toString();
    total = total + 1;
    if (interactionCount[sectorName]) {
      interactionCount[sectorName] = interactionCount[sectorName] + 1;
    } else {
      interactionCount[sectorName] = 1;
    }
  });

  //adding data to ui with sector name, count and its percentage
  for (var key in interactionCount) {
    ui.push(
      <tr key={key}>
        <td>{key}</td>
        <td style={{ textAlign: "center" }}>{interactionCount[key]}</td>
        <td style={{ textAlign: "center" }}>
          {((interactionCount[key] / total) * 100).toFixed(2)}
        </td>
      </tr>
    );
    //pushing data to create a pie chart
    highchartData.push({
      name: key,
      y: parseFloat(((interactionCount[key] / total) * 100).toFixed(2)),
    });
  }
  ui.push(
    <tr key="total" className="totalvalue">
      <td>Total Interactions</td>
      <td colSpan={2}>{total}</td>
    </tr>
  );

  // Making data for Highcharts
  series.push({
    type: "pie",
    name: "interactionPercentage",
    colorByPoint: true,
    data: highchartData,
  });

  options["series"] = series;
  options["title"] = {
    text: "Interaction percentage Piechart",
  };
  options["plotOptions"] = {
    pie: {
      dataLabels: {
        enabled: true,
        format: "<b>{key}</b>: {y:.1f} %",
      },
    },
  };

  return (
    <div className="main">
      <div className="stats">
        <table>
          <thead>
            <tr>
              <th>Sector Name</th>
              <th>Interaction Count</th>
              <th>Interaction Percentage</th>
            </tr>
          </thead>
          <tbody>{ui}</tbody>
        </table>
      </div>
      <div className="stats">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        ></HighchartsReact>
      </div>
    </div>
  );
};

export default InteractionStatistics;
