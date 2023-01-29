import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import drilldown from "highcharts/modules/drilldown";
import React, { useState } from "react";
import MonthData from "./MonthData";
import "./InteractionByMonth.scss";

drilldown(Highcharts);

const InteractionByMonth = (props) => {
  const interactionData = props.data;
  const [month, setMonth] = useState(1);

  // This will run when a new value of month is selected from dropdown.
  const onMonthSelect = (e) => {
    console.log(e.target.value);
    setMonth(e.target.value);
  };

  let dataByMonth = {
    1: {
      month: "Jan",
      total: 0,
    },
    2: {
      month: "Feb",
      total: 0,
    },
    3: {
      month: "Mar",
      total: 0,
    },
    4: {
      month: "Apr",
      total: 0,
    },
    5: {
      month: "May",
      total: 0,
    },
    6: {
      month: "Jun",
      total: 0,
    },
    7: {
      month: "Jul",
      total: 0,
    },
    8: {
      month: "Aug",
      total: 0,
    },
    9: {
      month: "Sep",
      total: 0,
    },
    10: {
      month: "Oct",
      total: 0,
    },
    11: {
      month: "Nov",
      total: 0,
    },
    12: {
      month: "Dec",
      total: 0,
    },
  };

  //to calculate sector wise count of interactions for each month
  interactionData.map((data) => {
    const month = data["date"].toString().split("-")[1].replace(/^0+/, "");
    if (dataByMonth[month][data["name"]]) {
      dataByMonth[month][data["name"]] = dataByMonth[month][data["name"]] + 1;
    } else {
      dataByMonth[month][data["name"]] = 1;
    }
    dataByMonth[month]["total"] = dataByMonth[month]["total"] + 1;
  });

  //for generating column graph
  const options = {};
  const series = [];
  const seriesData = [];

  const drillDown = {};
  const drillDownSeries = [];

  for (var key in dataByMonth) {
    const drillDownData = [];
    seriesData.push({
      name: dataByMonth[key]["month"],
      y: dataByMonth[key]["total"],
      drilldown: dataByMonth[key]["month"],
    });
    for (var sectorname in dataByMonth[key]) {
      if (sectorname !== "total" && sectorname !== "month") {
        drillDownData.push([sectorname, dataByMonth[key][sectorname]]);
      }
    }
    drillDownSeries.push({
      name: dataByMonth[key]["month"],
      id: dataByMonth[key]["month"],
      data: drillDownData,
    });
  }

  drillDown["series"] = drillDownSeries;
  series.push({
    colorByPoint: true,
    data: seriesData,
  });
  options["chart"] = {
    type: "column",
  };
  options["xAxis"] = {
    type: "category",
  };
  options["yAxis"] = {
    title: { text: "Number of Interactions" },
  };

  options["title"] = {
    align: "left",
    text: "Interaction by Month",
  };
  options["subtitle"] = {
    align: "left",
    text: "Click the columns to view more drilldown - Interaction by month for each sector ",
  };
  options["plotOptions"] = {
    column: {
      dataLabels: {
        enabled: true,
        format: "{y}",
      },
    },
  };
  options["series"] = series;

  options["drilldown"] = drillDown;

  return (
    <React.Fragment>
      <div className="container">
        <div className="dropdowndiv">
          <span>
            Select a month to see Interactions of all sectors for that selected
            month:
          </span>
          <select onChange={onMonthSelect}>
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>
        </div>
        <table className="monthDataTable">
          <thead>
            <th className="monthcount">Sector Name</th>
            <th className="monthcount">
              Interaction for Selected Month: Month Number {month}
            </th>
          </thead>
          <MonthData dataByMonth={dataByMonth} month={month}></MonthData>
        </table>
      </div>
      <hr></hr>
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        ></HighchartsReact>
      </div>
    </React.Fragment>
  );
};

export default InteractionByMonth;
