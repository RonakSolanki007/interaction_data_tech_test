import "./InteractionByMonth.scss";
const MonthData = (props) => {
  const ui = [];
  const dataByMonth = props.dataByMonth;
  console.log(dataByMonth);
  const month = props.month;

  //calculating and pushing data, month wise for each sector
  if (dataByMonth[month]["total"] === 0) {
    ui.push(
      <div>
        <h3>No Data Found</h3>
      </div>
    );
  } else {
    for (var sector_name in dataByMonth[month]) {
      if (sector_name !== "month" && sector_name !== "total") {
        ui.push(
          <tr className="monthdataRow">
            <td className="monthcount"> {sector_name} </td>
            <td className="monthcount">{dataByMonth[month][sector_name]} </td>
          </tr>
        );
      }
    }
  }

  return ui;
};
export default MonthData;
