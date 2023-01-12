import React, { useReducer, useContext, useEffect } from 'react';

const SettingsContext = React.createContext();

const initialState = {
  showCompleted: true,
  sort: 'difficulty',
  difficulty: 4,
  displayNum: 3,
  list: [],
  incomplete: [],
};

const settingsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'TOGGLE_COMPLETED':
      return { ...state, showCompleted: !state.showCompleted };
    case 'TOGGLE_SORT':
      return { ...state, sort: payload };
    case 'DISPLAY_ITEMS':
      return { ...state, displayNum: payload };
    case 'ADD_ITEM':
      return { ...state, list: [...state.list, payload] };
    case 'DELETE_ITEM':
      return {
        ...state,
        list: state.list.filter((item) => item.id !== payload),
      };
    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        list: state.list.map((item) => {
          if (item.id === payload) {
            return { ...item, complete: !item.complete };
          }
          return item;
        }),
      };
    case 'SET_INCOMPLETE':
      return { ...state, incomplete: payload };
    case 'CHANGE_DIFFICULTY':
      return { ...state, difficulty: payload };
    default:
      return state;
  }
};

const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);
  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem('settings'));
    if (storedSettings) {
      dispatch({
        type: 'TOGGLE_COMPLETED',
        payload: storedSettings.showCompleted,
      });
      dispatch({ type: 'DISPLAY_ITEMS', payload: storedSettings.displayNum });
      dispatch({ type: 'TOGGLE_SORT', payload: storedSettings.sort });
    }
  }, []);

  const saveSettings = () => {
    const settings = {
      showCompleted: state.showCompleted,
      displayNum: state.displayNum,
      sort: state.sort,
    };
    localStorage.setItem('settings', JSON.stringify(settings));
  };

  const context = { state, dispatch, saveSettings };
  return (
    <SettingsContext.Provider value={context}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export { SettingsProvider, useSettings };
