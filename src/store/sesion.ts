import {StoreonModule} from 'storeon';

const sliceName = 'sesion';

export interface SessionModuleState {
  token: string;
}

export interface SessionModuleEvents {
  setToken: string;
}

export const sessionModule: StoreonModule<
  SessionModuleState,
  SessionModuleEvents
> = store => {
  store.on('@init', () => ({token: ''}));
  store.on('setToken', (state, event) => ({token: event}));
};
