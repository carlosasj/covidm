import { useReducer, Reducer } from 'react';

const toggleReducer = (state: boolean, nextValue?: any) => (typeof nextValue === 'boolean' ? nextValue : !state);

export const useToggle = (initialValue: boolean): [boolean, (nextValue?: any) => void] => {
  return useReducer<Reducer<boolean, any>>(toggleReducer, initialValue);
};

const toggleCheckboxReducer = (state: boolean, e?: { target: { checked: any } }) =>
  typeof e?.target.checked === 'boolean' ? e.target.checked : !state;

export const useToggleCheckbox = (initialValue: boolean): [boolean, (nextValue?: any) => void] => {
  return useReducer<Reducer<boolean, any>>(toggleCheckboxReducer, initialValue);
};
