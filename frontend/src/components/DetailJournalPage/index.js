import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import Cookie from "js-cookie";
import axios from "axios";

import "./index.css";

const status = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failed: "Failed",
};

function DetailJournalPage() {
  const [details, setDetails] = useState({});
  const [journalStatus, setJournalStatus] = useState(status.initial);
  const { id } = useParams();
  const navigate = useNavigate();

  const newJournalDate = new Date(details.date);
  const newCreatedDate = new Date(details.createdAt);

  useEffect(() => {
    setJournalStatus(status.loading);
    axios
      .get(`http://localhost:3001/journal/${id}`, {
        headers: {
          "auth-token": Cookie.get("reviva-token"),
        },
      })
      .then((res) => {
        setDetails(res.data.journal);
        setJournalStatus(status.success);
      })
      .catch((err) => {
        setJournalStatus(status.failed);
        console.error(err?.res?.data?.message);
      });
  }, [id]);
  return (
    journalStatus === status.success && (
      <div className="container">
        <div className="row mb-3">
          <div className="col-12">
            <button onClick={() => navigate(-1)} className="btn btn-warning">
              Back
            </button>
          </div>
        </div>
        <div className="bg-light text-dark rounded p-2">
          <div className="row mt-3 mb-4">
            <div className="col-12 col-md-2 d-flex align-items-center justify-content-center">
              <div className="date-container text-center border rounded-circle p-3">
                {newJournalDate.getDate()}
                <br />
                {newJournalDate.toLocaleString("default", { month: "short" }) +
                  ", " +
                  newJournalDate.getFullYear()}
                <br />
                <small>
                  {newJournalDate.toLocaleString("default", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>
            </div>
            <div className="col-12 col-md-8 d-flex flex-column justify-content-center">
              <div className="score-container ">
                <div className="mt-1 mb-0 d-flex align-items-center">
                  <small>
                    <b>Positive</b>
                  </small>{" "}
                  <ProgressBar
                    bgColor="#2b8600"
                    height="12px"
                    completed={(details.emotions.positive * 100).toFixed()}
                    className="flex-grow-1 ms-2"
                  />
                </div>
                <div className="mb-0 d-flex align-items-center">
                  <small>
                    <b>Neutral</b>
                  </small>{" "}
                  <ProgressBar
                    bgColor="#e0a91e"
                    height="12px"
                    completed={(details.emotions.neutral * 100).toFixed()}
                    className="flex-grow-1 ms-2"
                  />
                </div>
                <div className="mb-2 d-flex align-items-center">
                  <small>
                    <b>Negative</b>
                  </small>{" "}
                  <ProgressBar
                    bgColor="#f00808"
                    height="12px"
                    completed={(details.emotions.negative * 100).toFixed()}
                    className="flex-grow-1 ms-2"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-2 d-flex flex-column justify-content-center">
              <div className="type-created-container">
                <small className="mb-1">
                  <b>Day Type: </b>
                  {details.dayType}
                </small>
                <br />
                <small>
                  <b>Created on: </b>
                  {newCreatedDate.toDateString()}
                </small>
              </div>
            </div>
          </div>
          <div className="row p-4">
            <div className="col-12">
              <div className="summary-container ">
                <p className="alert alert-primary">
                  <b>Summary: </b>
                  {details.emotions.summary}
                </p>
              </div>
            </div>
            <div className="col-12">
              <div className="journal-detail-container">
                <p className="alert alert-info">
                  <b>Journal: </b>
                  {details.journal}
                </p>
              </div>
            </div>
            <div className="col-12">
              <div className="feedback-container">
                <p className="alert alert-warning">
                  <b>Feedback: </b>
                  {details.emotions.aiFeedback}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default DetailJournalPage;
