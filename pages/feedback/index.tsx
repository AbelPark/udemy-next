import { buildFeedbackPath, extractFeedback } from "../api/feedback.js";

export default function FeedbackPage(props: any) {
  console.log(props.feedbackItems);

  return (
    <ul>
      {props.feedbackItems.map((item: any) => {
        return <li key={item.id}>{item.email}</li>;
      })}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  console.log(data);

  return {
    props: {
      feedbackItems: data,
    },
  };
}
