import React, { useContext, useReducer} from 'react';
import PropTypes from 'prop-types';

const LoginContext = React.createContext();
export const useLogin = () => useContext(LoginContext);

const SHOW_LOGIN = 'show';
const HIDE_LOGIN = 'hide';
const USER_LOGIN = 'user';

const reducer = (state, action) => {
  switch (action.type) {
    case SHOW_LOGIN: 
      return { 
        ...state,
        visible: true,
      };
    case HIDE_LOGIN: return { ...state, visible: false };
    case USER_LOGIN: return { ...state, user: action.user};
    default: return state;
  }
}

export const LoginProvider = ({ children }) => {  
  const [state, dispatch] = useReducer(reducer, {
    visible: true,
    user: ''
  })

  const show = () => dispatch({ type: SHOW_LOGIN })
  const hide = () => dispatch({ type: HIDE_LOGIN })
  const userLogin = user => dispatch({ type: USER_LOGIN, user })

  return(
    <LoginContext.Provider value={{
      visible: state.visible,
      user: state.user,
      show,
      hide,
      userLogin
    }}>
        { children }
    </LoginContext.Provider>
  );
};

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired
}