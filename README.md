# React Finland Statecharts Workshop

Statecharts are a powerful, well-established formalism that describe even the most complex application behavior and logic in a visual, hierarchical, and deterministic way. In this workshop you will learn about finite state machines and statecharts, and apply them to real-life React applications in ways that will increase productivity and eliminate entire classes of possible bugs from your code. You will also learn how to:

- Refactor React applications of any size to use statecharts, piece by piece
- Auto-generate full integration tests
- Visualize application logic
- Analyze statecharts to determine which user flows can be optimized
- Identify all possible edge cases
- Apply late-breaking changes and requirements methodically
- Auto-generate designs of all possible component states with Storybook
- Use advanced features of XState

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Things to Learn

By forking this my plan was to check out how the Xstate author uses the library. First food takeaway I found is a nice idiom we can use to add more control to reducer functions. By nesting `switch` cases, we can not only describe how the state changes on an action, but we can also limit the change to happen in certain cases only.
```
function feedbackReducer(state, event) {
  switch (state) {
    case "question":
      switch (event.type) {
        case "GOOD":
          return "thanks";
        case "BAD":
          return "form";
        case "CLOSE":
          return "closed";
        default:
          return state;
      }
    case "form":
      switch (event.type) {
        case "SUBMIT":
          return "thanks";
        case "CLOSE":
          return "closed";
        default:
          return state;
      }
    case "thanks":
      switch (event.type) {
        case "CLOSE":
          return "closed";
        default:
          return state;
      }
    default:
      return state;
  }
}
```
This way, we first check for the current state and execute state changes only for specified state. That gives us some security by making impossible states impossible. Xstate takes that a step further and gives us a lot of utility.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
