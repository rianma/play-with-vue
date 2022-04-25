interface ClientPrincipal {
  identityProvider: 'github';
  userDetails: string;
  userId: string;
  userRoles: string[];
}

interface DotAuthMeResult {
  clientPrincipal: ClientPrincipal;
}

export const fetchLoggedInUser = async () => {
  try {
    const result = await fetch('/.auth/me').then((response) => response.json()) as DotAuthMeResult;
    const cp = result.clientPrincipal;
    return {
      provider: cp.identityProvider === 'github' ? 'github' : '',
      userId: cp.userId,
      userName: cp.userDetails,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const logout = () => {
  window.location.href = '/.auth/logout';
};

export const login = () => {
  window.location.href = '/.auth/login/github';
};
