import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";
import axios from "axios";

function Comments(props) {
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      callCommentsData();
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }
  function callCommentsData() {
    axios
      .get("/api/comments/" + eventId)
      .then(({ data }) => setComments(data.comments));
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "send your comments",
      message: "Registering for comments",
      status: "pending",
    });
    axios
      .post("/api/comments/" + eventId, commentData)
      .then((response) => {
        if (response.status === 201) {
          return response;
        }
        return response.then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        console.log(data);
        callCommentsData();
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registered for comments!",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
