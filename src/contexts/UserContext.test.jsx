// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, waitFor } from '@testing-library/react';
import { miniFetcher } from '../helpers/fetcher';
import { TokenContext } from './TokenContext';
import { UserContextProvider } from './UserContext';

vi.mock('../helpers/fetcher', () => ({
  miniFetcher: vi.fn(),
}));

describe('UserContextProvider', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('elimina una sesión cuyo token ya no es válido', async () => {
    const setToken = vi.fn();
    miniFetcher.mockResolvedValueOnce('Token inválido');

    render(
      <TokenContext.Provider value={['token-caducado', setToken]}>
        <UserContextProvider>
          <div>Aplicación</div>
        </UserContextProvider>
      </TokenContext.Provider>,
    );

    await waitFor(() => expect(setToken).toHaveBeenCalledWith(''));
  });
});
