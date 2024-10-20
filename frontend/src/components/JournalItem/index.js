import { Link } from "react-router-dom";
import { Gauge } from "@mui/x-charts/Gauge";

import "./index.css";

function JournalItem({ details }) {
  const { date, dayType, emotions, _id } = details;
  const { positive, negative, neutral, summary } = emotions;

  const newDate = new Date(date);

  return (
    <li className="card mb-3">
      <div className="card-body d-flex align-items-center flex-column flex-md-row">
        <div className="date-container p-2 me-3">
          <p className="mb-0 text-center p-3 rounded-circle border border-secondary">
            <small>
              {newDate.toLocaleString("default", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </p>
        </div>
        <div className="journal-label-mood-container me-3 me-md-0">
          <div className="d-flex flex-column flex-md-row ">
            <div className="d-flex align-items-center justify-content-center order-2 order-md-1">
              <div className="mb-0 d-flex flex-column align-items-center positive">
                <small>
                  <b>Positive</b>
                </small>{" "}
                <span>
                  <Gauge
                    width={45}
                    height={45}
                    value={(positive * 100).toFixed()}
                    color="#00ff00"
                    className="custom-gauge"
                  />
                </span>
              </div>
              <div className="d-flex flex-column align-items-center mx-4 neutral ">
                <small>
                  <b>Neutral</b>
                </small>{" "}
                <span>
                  <Gauge
                    width={45}
                    height={45}
                    value={(neutral * 100).toFixed()}
                  />
                </span>
              </div>
              <div className=" d-flex flex-column align-items-center negative">
                <small>
                  <b>Negative</b>
                </small>{" "}
                <span>
                  <Gauge
                    width={45}
                    height={45}
                    value={(negative * 100).toFixed()}
                  />
                </span>
              </div>
            </div>
            <p className="mb-1 text-center ms-md-5 order-1 order-md-2">
              <b>Day Type </b>
              <br />
              {dayType}
            </p>
          </div>
          <p className="journal-summary mb-0">
            <b>Summary: </b>
            {summary}
          </p>
        </div>
        <Link
          to={`/journal/${_id}`}
          className="btn btn-warning ms-md-auto mt-3 mt-md-0 align-self-stretch align-self-md-center"
        >
          View
        </Link>
      </div>
    </li>
  );
}

export default JournalItem;
