import React from 'react';

type IsWallDraw = boolean;

type WallDrawProviderContext = [
  state: IsWallDraw,
  dispatch: React.Dispatch<IsWallDraw>
];

const WallDrawContext = React.createContext<WallDrawProviderContext>(
  null as unknown as WallDrawProviderContext
);

export const WallDrawProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = React.useReducer(
    (state: IsWallDraw, action: IsWallDraw) => action,
    false
  );

  return (
    <WallDrawContext.Provider value={value}>
      {children}
    </WallDrawContext.Provider>
  );
};

export const useIsWallDraw = () => {
  const value = React.useContext(WallDrawContext);
  if (!value) {
    throw new Error('useIsWallDraw must be used within an WallDrawContext');
  }
  return value;
};
