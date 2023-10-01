import { LocalLandmark } from '@autotoor/tour-common';
import { createContext, useContext, useState } from 'react';

const LandmarkCtx = createContext<LandmarkState>({
  visitedLandmarks: [],
});
const LandmarkCtxDispatch = createContext<React.Dispatch<
  React.SetStateAction<LandmarkState>
> | null>(null);

export interface LandmarkState {
  visitedLandmarks: LocalLandmark[];
}

type Props = {
  children: any;
};

export function LandmarkContext({ children }: Props) {
  const [landmarkState, setLandmarkState] = useState<LandmarkState>({
    visitedLandmarks: [],
  });
  return (
    <LandmarkCtx.Provider value={landmarkState}>
      <LandmarkCtxDispatch.Provider value={setLandmarkState}>
        {children}
      </LandmarkCtxDispatch.Provider>
    </LandmarkCtx.Provider>
  );
}

export function useLandmarkContext(): [
  LandmarkState,
  React.Dispatch<React.SetStateAction<LandmarkState>> | null
] {
  const state = useContext(LandmarkCtx);
  const setter = useContext(LandmarkCtxDispatch);
  return [state, setter];
}
