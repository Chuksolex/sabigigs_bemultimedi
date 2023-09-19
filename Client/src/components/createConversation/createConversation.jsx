// CreateConversationForm.js

import React, { useState } from "react";
import "./createConversation.scss"
import newRequest from "../../utils/newRequest.js";

const CreateConversation = ({ onConversationCreated, existingConversationId }) => {
  const [to, setTo] = useState(""); // Input for recipient's username or ID
  // You can add more fields as needed

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if (existingConversationId) {
          // Redirect to the messaging page for the existing conversation
          onConversationCreated(existingConversationId);
        } else {
          const response = await newRequest.post("/conversations", {
            to: to,
            // other data needed for creating a conversation
          });
          if (response.status === 201) {
            onConversationCreated(); // Notify the parent component about the new conversation
          }
        }
    } catch (error) {
      console.log(error);
    }
  };

  return (
   
        <form className="create-conversation-form" onSubmit={handleSubmit}>
          {existingConversationId ? (
            <p>
              You already have a conversation with this recipient. Click "Send" to continue.
            </p>
          ) : (
            <>
              <input
                type="text"
                placeholder="Write your message"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
              <button type="submit">Send</button>
            </>
          )}
        </form>
      );
    };
    

export default CreateConversation;
