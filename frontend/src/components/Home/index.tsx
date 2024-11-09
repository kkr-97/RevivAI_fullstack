import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import  RootType from "../../store/types"
import Spinner from "../Spinner";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

import axios from "axios";
import swal from "sweetalert";
import Cookie from "js-cookie";


import "./index.css";

const dayTypes = [
  { type: "Happy", icon: "😊" },
  { type: "Stressed", icon: "🤯" },
  { type: "Boring", icon: "🥱" },
  { type: "Sad", icon: "🥺" },
  { type: "Angry", icon: "😠" },
  { type: "Productive", icon: "💼" },
  { type: "Relaxed", icon: "😌" },
  { type: "Anxious", icon: "😰" },
  { type: "Motivated", icon: "💪" },
  { type: "Confused", icon: "😕" },
];

const status = {
  initial: "INITIAL",
  submitting: "SUBMITTING",
  submitted: "SUBMITTED",
  failed: "FAILED",
};

function Home() {
  const [date, setSelectedDate] = useState<Dayjs | null>();
  const [journal, setJournal] = useState("");
  const [dayType, setVerdict] = useState(dayTypes[0].type);
  const [journalStatus, setJournalStatus] = useState(status.initial);

  const username = useSelector((state : RootType) => state.user.username);
  const userId = useSelector((state : RootType) => state.user.userId);

  const onChangeJournal = (e : React.ChangeEvent<HTMLTextAreaElement>) => setJournal(e.target.value);
  const onChangeVerdict = (e : React.ChangeEvent<HTMLSelectElement>) => setVerdict(e.target.value);

  const submitJournal = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setJournalStatus(status.submitting);

    await axios
      .post(
        "https://revivai-fullstack.onrender.com/create-journal",
        {
          userId,
          date,
          dayType,
          journal,
        },
        {
          headers: {
            "auth-token": Cookie.get("reviva-token"),
          },
        }
      )
      .then((res) => {
        const analysis = res.data.aiFeedback;
        setJournalStatus(status.submitted);
        setSelectedDate(dayjs());
        setJournal("");
        setVerdict(dayTypes[0].type);
        swal("👇Feedback from Reviva👇", analysis, "success");
        // console.log(res.data);
      })
      .catch((err) => {
        swal(
          "Oops!",
          err?.response?.data?.message || "Error while submitting!",
          "error"
        );
        console.error(err?.response?.data?.message);
        setJournalStatus(status.failed);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h4 className="main-head mb-4 mt-2">Hello👋, {username}</h4>
          <h2>Tell the moment, let's capture it...</h2>
          <form
            onSubmit={submitJournal}
            className="journal-container bg-light bg-gradient"
          >
            <div className="header-container pb-2 d-flex flex-column flex-md-row align-items-start align-items-md-center">
              <div className="input-container date-container form-group">
                <label htmlFor="journal_input_date">Date</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      value={date}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock, 
                        seconds: renderTimeViewClock,
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="input-container type-container from-group">
                <label htmlFor="dayType">Verdict of the Moment</label>
                <select
                  id="dayType"
                  className="form-control"
                  onChange={onChangeVerdict}
                  value={dayType}
                >
                  <option disabled>Select type of the day</option>
                  {dayTypes.map((dayType, index) => (
                    <option key={index} value={dayType.type}>
                      {dayType.icon} {dayType.type}{" "}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="journal-input-container flex-grow-1">
              <textarea
                value={journal}
                onChange={onChangeJournal}
                placeholder="Describe about the moment here..."
                className="flex-grow-1 form-control"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-warning submit-btn">
              {journalStatus === status.submitting ? (
                <Spinner color="red" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
