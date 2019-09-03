import { Machine, interpret } from "xstate";

const feedbackMachine = Machine({
  id: "feedback",
  initial: "question",
  states: {
    question: {
      on: {
        GOOD: "thanks",
        BAD: "form",
        CLOSE: "closed",
        ESC: "closed"
      }
    },
    form: {
      on: {
        SUBMIT: "thanks",
        CLOSE: "closed",
        ESC: "closed"
      }
    },
    thanks: {
      on: {
        CLOSE: "closed",
        ESC: "closed"
      }
    },
    closed: {}
  }
});

export const feedbackService = interpret(feedbackMachine)
  .onTransition(state => {
    console.log(state);
  })
  .start();

export default feedbackMachine;
