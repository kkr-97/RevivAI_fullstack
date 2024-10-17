import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const obj = {
  emotions: {
    positive: 0.383,
    neutral: 0.617,
    negative: 0,
    aiFeedback:
      "You're crushing it!  Keep up the momentum and that positive attitude. \n",
    summary:
      "I'm so proud of myself for successfully deploying my full-stack app today!  Even though I hit a few snags, I feel like I've made incredible progress and that little victory, combined with some quality time with friends, has left me feeling energized and optimistic about the future. \n",
  },
  _id: "670fc643eabc1797e2a2ecb6",
  userId: "66fbdfdcedf54cf004298f12",
  date: "2024-10-11",
  dayType: "Happy",
  journal:
    "Today was a great day! I woke up feeling energized and ready to tackle everything on my list. The biggest win of the day was finally getting my full stack app deployed, and even though there were some hiccups with response times, I feel proud of the progress I’ve made so far. Each step forward is a reminder of how much I’ve learned, and I’m excited to keep improving.\n\nOn top of that, I had a really good balance between work and personal time. I spent the afternoon catching up with friends, and it gave me a fresh perspective on how important it is to step away and recharge. Overall, feeling optimistic about where things are headed!",
  createdAt: "2024-10-16T13:57:23.885Z",
  __v: 0,
};

function DetailJournalPage() {
  const [details, setDetails] = useState(obj);
  const { id } = useParams();

  //   useEffect(() => {
  //     axios
  //       .get(`http://localhost:3001/journal/${id}`)
  //       .then((res) => {
  //         console.log(res.data.journal);
  //       })
  //       .catch((err) => {
  //         console.error(err?.res?.data?.message);
  //       });
  //   }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12"></div>
      </div>
    </div>
  );
}

export default DetailJournalPage;
