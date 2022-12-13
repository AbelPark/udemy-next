import { useRef, useState } from "react";
import axios from "axios";

export default function Home() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);
  async function submitFormHandler(event: any) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    const enteredFeedback = feedbackInputRef.current?.value;
    const reqBody = { email: enteredEmail, text: enteredFeedback };
    const result = await axios.post("/api/feedback", reqBody);
    return result;
  }

  async function loadFeedbackHandler() {
    const { data } = await axios.get("api/feedback");
    setFeedbackItems(data.feedback);
    return data;
  }

  return (
    <>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea id="feedback" rows={5} ref={feedbackInputRef} />
        </div>
        <button type="submit">submit</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>

      <ul>
        {feedbackItems.map((item: any) => {
          return <li key={item.id}>{item.text}</li>;
        })}
      </ul>
    </>
  );
}
