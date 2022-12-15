import axios from "axios";
import { useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

export default function FeedbackPage(props: any) {
  const [feedbackData, setFeedbackData]: any = useState();
  async function loadFeedbackHandler(id: string) {
    const { data } = await axios.get(`/api/feedback/${id}`); // /api/some-feedback-id
    setFeedbackData(data.feedback);
  }

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item: any) => {
          return (
            <li key={item.id}>
              {item.email}
              <button onClick={loadFeedbackHandler.bind(null, item.id)}>
                show Detail
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}
