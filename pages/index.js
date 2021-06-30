//Core
import { useState, useEffect } from "react";
//Components
import Day from "components/day";
import FlightItem from "components/flightitem";
//Modules
import PullToRefresh from "react-simple-pull-to-refresh";
//Helpers
import dateParser from "helpers/dateParser";

export default function Home(data) {
  //State declerations
  const [noWifi, setNoWiFi] = useState(false);
  const [flightData, setFlightData] = useState(data);
  const [dates, setDates] = useState();

  //Populate data if offline
  useEffect(() => {
    if (data.data.length === 0) {
      if (flightData.data.length === 0) {
        setFlightData(JSON.parse(window.localStorage.getItem("data")));
      }
    } else {
      window.localStorage.setItem("data", JSON.stringify(data));
    }
    calculateHours(flightData);
    getDates();
  }, [flightData]);

  //No Wifi statement timeout
  useEffect(() => {
    if (noWifi) {
      setTimeout(() => setNoWiFi(false), 3000);
    }
  }, [noWifi]);

  //Get unique dates
  const getDates = () => {
    let dateArray = [];
    flightData.data.map((item) => dateArray.push(item.Date));
    setDates([...new Set(dateArray)]);
  };

  //Calculate the hours between previous and next item (if item is Layover)
  const calculateHours = (flightData) => {
    let prevFlight, nextFlight;
    for (let i = 0; i < flightData.data.length; i++) {
      if (flightData.data[i].DutyID === "OFD") {
        if (i !== 0 && i < flightData.data.length - 1) {
          prevFlight = new Date(dateParser(flightData.data[i - 1].Date));
          for (let j = i + 1; j < flightData.data.length; j++) {
            if (flightData.data[j].DutyID === "FLT") {
              nextFlight = new Date(dateParser(flightData.data[i + 1].Date));
              nextFlight.setHours(
                flightData.data[i + 1].Time_Depart.split(":")[0]
              );
              nextFlight.setMinutes(
                flightData.data[i + 1].Time_Depart.split(":")[1]
              );
              break;
            }
          }
          prevFlight.setHours(flightData.data[i - 1].Time_Arrive.split(":")[0]);
          prevFlight.setMinutes(
            flightData.data[i - 1].Time_Arrive.split(":")[0]
          );

          let difference_in_time = nextFlight.getTime() - prevFlight.getTime();
          let difference_in_days = difference_in_time / (1000 * 3600 * 24);
          flightData.data[i].calculatedHours = Math.floor(
            difference_in_days * 24
          );
        }
      }
    }
  };

  //Try and get new data on pull down
  const getNewData = async () => {
    if (window.navigator.onLine) {
      const res = await fetch(
        "https://rosterbuster.aero/wp-content/uploads/dummy-response.json"
      );
      const data = res.json();
      setFlightData(data);
    } else {
      setNoWiFi(true);
    }
  };

  return (
    <div className={"mobileFrame"}>
      <div className={"mobileContainer"}>
        <PullToRefresh onRefresh={getNewData}>
          {noWifi && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className={"noWifi"}>
                Maak verbinding met het wifi om de laatse data op te halen
              </div>
            </div>
          )}
          <div>
            {dates &&
              dates.map((day, i) => {
                return (
                  <Day key={i} date={day}>
                    {flightData &&
                      flightData.data
                        .filter((flight) => day === flight.Date)
                        .map((flight, j) => {
                          return <FlightItem key={j} info={flight} />;
                        })}
                  </Day>
                );
              })}
          </div>
        </PullToRefresh>
      </div>
    </div>
  );
}

//Get initial data
export async function getServerSideProps() {
  let data;
  try {
    const res = await fetch(
      "https://rosterbuster.aero/wp-content/uploads/dummy-response.json"
    );
    data = await res.json();
  } catch (error) {
    data = [];
  }

  return {
    props: {
      data: data,
    },
  };
}
