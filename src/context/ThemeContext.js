import { createContext, useReducer } from 'react';

export const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, color: action.payload };
    case 'CHANGE_MODE': 
      return {...state, mode: action.payload}
    default:
      return state;
  }
};

//  in a file, initialize a createContext() to a specific name i.e ThemeContext
// Define a function that takes in {children} prop (to wrap around wherever you need this),
// This function returns the context name.provider wrapped around the children i.e <ThemeContext.Provider>
//This name.provider takes in a VALUE prop, that you can pass your state in.. so your children can access it.

//meanwhile export the above function that returns <Contextname.Provider> i.e <ThemeContext.Provider> to probably index.js and make sure it wraps around the intended children

// you can then import the actual createContext() name anywhere, pass it to useContext() anywhere then destructure it out to use to make a toggle for example.

//You can also pass a state to it, MAKE SURE YOU PASS to a value prop!

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    color: '#58249c',
    mode: 'dark',
  });

  // initialized to [state, dispatch], useReducer (takes in the the permanent reducer state function and initial state)
  // the permanent reducer i.e themeReducer, takes in initial state from useReducer and a custom action
  // and uses the switch statement
  // then we have a custom function that takes in a payload, that fires a dispatch with our action object
  // i.e type and payload properties

  const changeColor = (color) => {
    dispatch({ type: 'CHANGE_COLOR', payload: color });
  };
  const changeMode = (mode) => {
    dispatch({ type: 'CHANGE_MODE', payload: mode });
  };

  return <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>{children}</ThemeContext.Provider>;
}
