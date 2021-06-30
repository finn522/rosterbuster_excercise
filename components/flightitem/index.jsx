//Core
import React, { useState, useEffect } from "react";
//Styles
import styles from "./styles.module.scss";
//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faSuitcase,
  faPaste,
  faGlassMartini,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";

const FlightItem = ({ info }) => {
  //State decleration
  const [extended, setExtended] = useState(false);

  return (
    <div className={styles.background}>
      <div className={styles.container} onClick={() => setExtended(!extended)}>
        {info.DutyID === "FLT" ? (
          <div className={styles.infoBar}>
            <FontAwesomeIcon icon={faPlane} />
            <div className={styles.infoBlock}>
              <div className={styles.topRow}>
                <span className={styles.title}>
                  {info.Departure} - {info.Destination}
                </span>
              </div>
              <div className={styles.bottomRow}>
                <span className={styles.time}>
                  {info.Time_Depart} - {info.Time_Arrive}
                </span>
              </div>
            </div>
          </div>
        ) : info.DutyID === "DO" ? (
          <div className={styles.infoBar}>
            <FontAwesomeIcon icon={faGlassMartini} />
            <div className={styles.infoBlock}>
              <div className={styles.topRow}>
                <span className={styles.title}>Off</span>
              </div>
              <div className={styles.bottomRow}>
                <span className={styles.location}>
                  {info.DutyID}({info.Departure})
                </span>
              </div>
            </div>
          </div>
        ) : info.DutyID === "POS" ? (
          <div className={styles.infoBar}>
            <FontAwesomeIcon icon={faWindowMinimize} />
            <div className={styles.infoBlock}>
              <div className={styles.topRow}>
                <span className={styles.title}>Positioning</span>
              </div>
              <div className={styles.bottomRow}>
                <span className={styles.location}>
                  {info.DutyID}({info.Departure})
                </span>
              </div>
            </div>
          </div>
        ) : info.DutyID === "SBY" ? (
          <div className={styles.infoBar}>
            <FontAwesomeIcon icon={faPaste} />
            <div className={styles.infoBlock}>
              <div className={styles.topRow}>
                <span className={styles.title}>Standby</span>
                <span className={styles.status}>Match crew</span>
              </div>
              <div className={styles.bottomRow}>
                <span className={styles.location}>
                  {info.DutyID}({info.Departure})
                </span>
              </div>
            </div>
          </div>
        ) : info.DutyID === "OFD" ? (
          <div className={styles.infoBar}>
            <FontAwesomeIcon icon={faSuitcase} />
            <div className={styles.infoBlock}>
              <div className={styles.topRow}>
                <span className={styles.title}>Layover</span>
              </div>
              <div className={styles.bottomRow}>
                <span className={styles.location}>{info.Departure}</span>
                <span className={styles.time}>{info.calculatedHours} uur</span>
              </div>
            </div>
          </div>
        ) : null}
        <div
          className={[styles.moreInfo, extended ? styles.extended : null].join(
            " "
          )}
        >
          {info.DutyID === "OFD" ? (
            <ul>
              <li>
                Vertrek van {info.Departure} om {info.Time_Arrive}.
              </li>
            </ul>
          ) : info.Flightnr === "" &&
            info["Aircraft Type"] === "" &&
            info.Tail === "" &&
            info.Captain === "" &&
            info["First Officer"] === "" &&
            info["Flight Attendant"] === "" ? (
            <p>Er is nog geen informatie over dit item beschikbaar.</p>
          ) : (
            <ul>
              {info.Flightnr && <li>Vluchtnummer: {info.Flightnr}</li>}
              {info["Aircraft Type"] && (
                <li>Vliegtuig type: {info["Aircraft Type"]}</li>
              )}
              {info.Tail && <li>Staart: {info.Tail}</li>}
              {info.Captain && <li>Kaptein: {info.Captain}</li>}
              {info["First Officer"] && (
                <li>Eerste officier: {info["First Officer"]}</li>
              )}
              {info["Flight Attendant"] && (
                <li>Stewardess: {info["Flight Attendant"]}</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightItem;
