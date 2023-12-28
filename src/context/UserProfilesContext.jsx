import React, { createContext, useContext, useReducer } from 'react';

const UserProfilesContext = createContext();

export const useUserProfiles = () => useContext(UserProfilesContext);

const userProfilesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER_PROFILE':
      return {
        ...state,
        [action.payload.userId]: action.payload.profile,
      };
    default:
      return state;
  }
};

export const UserProfilesProvider = ({ children }) => {
  const [userProfiles, dispatch] = useReducer(userProfilesReducer, {});

  const updateUserProfile = (userId, profile) => {
    dispatch({
      type: 'UPDATE_USER_PROFILE',
      payload: { userId, profile },
    });
  };

  const userProfilesContextValue = {
    userProfiles,
    updateUserProfile,
  };

  return (
    <UserProfilesContext.Provider value={userProfilesContextValue}>
      {children}
    </UserProfilesContext.Provider>
  );
};