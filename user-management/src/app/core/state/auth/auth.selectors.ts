import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../models/auth.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, state => state.user);
export const selectAuthLoading = createSelector(selectAuthState, state => state.loading);
export const selectAuthError = createSelector(selectAuthState, state => state.error);
export const isAuthenticated = createSelector(selectAuthState, state => !!state.user);
