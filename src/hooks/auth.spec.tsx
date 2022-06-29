import { renderHook, act } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';

import { AuthProvider, useAuth } from './auth';

fetchMock.enableMocks();

const userTest = {
  id: 'any id',
  email: 'example@email.com',
  name: 'Any Name',
  photo: 'any_photo.png'
}

jest.mock('expo-auth-session', () => {
  return {
    startAsync: () => ({
      type: 'success',
      params: {
        access_token: 'any_token',
      }
    }),
  }
});

describe('Auth Hook', () => {

  it('Should be able to sign in with Google account existing', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email)
      .toBe(userTest.email);

  });
});