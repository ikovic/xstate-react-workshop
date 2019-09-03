import React from "react";
import { useMachine } from "@xstate/react";

import feedbackMachine from "./feedbackMachine";

function Screen({ children, onSubmit = undefined }) {
  if (onSubmit) {
    return (
      <form onSubmit={onSubmit} className="screen">
        {children}
      </form>
    );
  }

  return <section className="screen">{children}</section>;
}

function QuestionScreen({ onClickGood, onClickBad, onClose }) {
  return (
    <Screen>
      <header>How was your experience?</header>
      <button onClick={onClickGood} data-variant="good">
        Good
      </button>
      <button onClick={onClickBad} data-variant="bad">
        Bad
      </button>
      <button title="close" onClick={onClose} />
    </Screen>
  );
}

function FormScreen({ onSubmit, onClose }) {
  return (
    <Screen
      onSubmit={e => {
        e.preventDefault();
        const { response } = e.target.elements;

        onSubmit({
          value: response
        });
      }}
    >
      <header>Care to tell us why?</header>
      <textarea
        name="response"
        placeholder="Complain here"
        onKeyDown={e => {
          if (e.key === "Escape") {
            e.stopPropagation();
          }
        }}
      />
      <button>Submit</button>
      <button title="close" type="button" onClick={onClose} />
    </Screen>
  );
}

function ThanksScreen({ onClose }) {
  return (
    <Screen>
      <header>Thanks for your feedback.</header>
      <button title="close" onClick={onClose} />
    </Screen>
  );
}

export function Feedback() {
  const [current, send] = useMachine(feedbackMachine);

  console.log(current);

  if (current.matches("question")) {
    return (
      <QuestionScreen
        onClickGood={() => {
          send("GOOD");
        }}
        onClickBad={() => {
          send("BAD");
        }}
        onClose={() => {
          send("CLOSE");
        }}
      />
    );
  }

  if (current.matches("form")) {
    return (
      <FormScreen
        onSubmit={value => {
          send({
            type: "SUBMIT",
            value
          });
        }}
        onClose={() => {
          send("CLOSE");
        }}
      />
    );
  }

  if (current.matches("thanks")) {
    return (
      <ThanksScreen
        onClose={() => {
          send("CLOSE");
        }}
      />
    );
  }

  return null;
}

export function App() {
  return (
    <main className="app">
      <Feedback />
    </main>
  );
}

export default App;
