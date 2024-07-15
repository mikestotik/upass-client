export namespace RoutePaths {
  export const AUTH = '/auth';
  export const AUTH_SIGN_IN = `${AUTH}/sign-in`;
  export const AUTH_SIGN_UP = `${AUTH}/sign-up`;
  export const AUTH_SIGN_UP_CONFIRMATION = `${AUTH_SIGN_UP}/confirmation`;
  export const AUTH_CHANGE_PASSWORD = `${AUTH}/change-password`;

  export const MAIN = '/main';

  export const ITEMS_ALL = `${MAIN}/all`;
  export const ITEMS_FAVORITES = `${MAIN}/favorites`;
  export const ITEMS_TRASH = `${MAIN}/trash`;

  export const LOGIN = `${MAIN}/login`;
  export const LOGIN_NEW = `${MAIN}/login/new`;
  export const LOGIN_DETAILS = `${MAIN}/login/:id`;

  export const CARD = `${MAIN}/card`;
  export const CARD_DETAILS = `${MAIN}/card/:id`;

  export const IDENTITY = `${MAIN}/identity`;
  export const IDENTITY_DETAILS = `${MAIN}/identity/:id`;

  export const NOTE = `${MAIN}/note`;
  export const NOTE_DETAILS = `${MAIN}/note`;
}
