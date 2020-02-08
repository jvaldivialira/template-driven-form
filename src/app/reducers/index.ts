import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { menuReducer } from './menu-reducer';
import { contactsReducer } from './contacts-reducer';

export const reducers = {
  menu: menuReducer,
  contacts: contactsReducer
};



export interface State {

}

export const reducers: ActionReducerMap<State> = {

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
