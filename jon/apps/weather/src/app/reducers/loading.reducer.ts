import { Action } from '@ngrx/store';

export interface State {
  [actionType: string]: boolean;
}

export const loading = (
  state: { [actionType: string]: boolean } = {},
  action: Action
): { [actionType: string]: boolean } => {
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(action.type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'REQUEST',
  };
};

export const getIsLoading =
  (actionTypes: string[]) =>
  (state: State): boolean =>
    actionTypes.some((actionType) => state[actionType]);

export const getAllLoading = (state: State): boolean =>
  Object.keys(state).some((k) => state[k]);
