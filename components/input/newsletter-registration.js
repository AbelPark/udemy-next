import { useRef } from "react";
import axios from "axios";

import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();

  async function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    // fetch('/api/newsletter', {
    //   method: 'POST',
    // body: JSON.stringify({ email: enteredEmail }),
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));

    const result = await axios.post("/api/newsletter", { email: enteredEmail });
    console.log(result);
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
