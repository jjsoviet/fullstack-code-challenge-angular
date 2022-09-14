import { Action } from '@ngrx/store';

export interface State {
  [actionType: string]: boolean;
}

export const error = (
  state: { [actionType: string]: boolean } = {},
  action: Action
): { [actionType: string]: boolean } => {
  const matches = /(.*)_(REQUEST|FAILURE|SUCCESS)/.exec(action.type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'FAILURE',
  };
};

export const getHasError =
  (actionTypes: string[]) =>
  (state: State): boolean =>
    actionTypes.some((actionType) => state[actionType]);
