import React, { useState } from "react";
import "./FaqForm.scss";

const FaqForm = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new FAQ object
    const newFAQ = {
      question: question,
      answer: answer,
    };
    // Call the onSubmit function passed from the parent component
    onSubmit(newFAQ);
    // Clear the form fields
    setQuestion("");
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="inputItem">
        <label htmlFor="question">Question</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>
      <div className="inputItem">
        <label htmlFor="answer">Answer</label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Add FAQ</button>
    </form>
  );
};

export default FaqForm;
