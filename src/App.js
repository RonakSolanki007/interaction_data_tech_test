import React, { useEffect, useState } from "react";
import axios from "axios";
import InteractionByMonth from "./components/InteractionByMonth";
import InteractionStatistics from "./components/InteractionStatistics";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const [interactionData, setInteractionData] = useState([]);

  // UseEffect will run only when this component will render for the first time
  useEffect(() => {
    interaction_data();
  }, []);

  //get data from api
  const interaction_data = () => {
    axios
      .get("http://substantiveresearch.pythonanywhere.com/")
      .then((response) => {
        setInteractionData(response.data);
      })
      .catch((error) => console.log(error));
  };

  //main page display when app is loaded
  return (
    <React.Fragment>
      <h1>Interaction Insights</h1>
      <Tabs defaultActiveKey="interaction_statistics" id="interaction_tab">
        <Tab
          eventKey="interaction_statistics"
          title="Interactions Count Statistics "
        >
          <InteractionStatistics data={interactionData} />
        </Tab>
        <Tab
          eventKey="interaction_by_month"
          title="Interactions by Month Statistics"
        >
          <InteractionByMonth data={interactionData} />
        </Tab>
      </Tabs>
    </React.Fragment>
  );
}

export default App;
