import TokenError from 'errors/TokenError';

export function checkAuthorization(
  authorization: unknown,
): asserts authorization is `Bearer ${string}` {
  if (!authorization || typeof authorization !== 'string') {
    throw new TokenError('Access token is missing');
  }

  const [tokenType, accessToken] = authorization.split(' ');
  if (tokenType !== 'Bearer') {
    throw new TokenError('Access token type is not supported');
  }
  if (!accessToken) {
    throw new TokenError('Access token is missing');
  }
}
