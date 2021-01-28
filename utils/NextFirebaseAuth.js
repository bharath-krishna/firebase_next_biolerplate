// proxy for intelisense and autocomplete in vscode
import {
  useAuthUser as useModuleAuthUser,
  AuthAction as ModuleAuthAction,
  whenUnauthed as ModuleWhenUnauthed,
  withAuthUser as ModuleWithAuthUser,
  withAuthUserTokenSSR as ModuleWithAuthUserTokenSSR,
  withAuthUserSSR as ModuleWithAuthUserSSR,
  setAuthCookies as ModuleSetAuthCookies,
  unsetAuthCookies as ModuleUnsetAuthCookies,
  verifyIdToken as ModuleVerifyIdToken,
} from "next-firebase-auth";

export const useAuthUser = useModuleAuthUser;
export const authAction = ModuleAuthAction;
export const whenUnauthed = ModuleWhenUnauthed;
export const withAuthUser = ModuleWithAuthUser;
export const withAuthUserTokenSSR = ModuleWithAuthUserTokenSSR;
export const withAuthUserSSR = ModuleWithAuthUserSSR;
export const setAuthCookies = ModuleSetAuthCookies;
export const unsetAuthCookies = ModuleUnsetAuthCookies;
export const verifyIdToken = ModuleVerifyIdToken;
