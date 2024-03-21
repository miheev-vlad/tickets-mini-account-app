import { createAction, props } from '@ngrx/store';

export const SHOW_ALERT = '[common] show alert';
export const EMPTY_ACTION = '[common] empty';
export const CLEAR_STATE = '[common] clear state';

export const showAlert = createAction(
  SHOW_ALERT,
  props<{ message: string; resultType: string }>()
);
export const emptyAction = createAction(EMPTY_ACTION);

export const clearAction = createAction(CLEAR_STATE);
