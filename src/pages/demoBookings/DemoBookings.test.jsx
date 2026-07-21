// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { TokenContext } from '../../contexts/TokenContext';
import { UserContext } from '../../contexts/UserContext';
import DemoBookings from './DemoBookings';

vi.mock('../../hooks/useUserBookings', () => ({
  useUserBookings: () => [
    {
      ticket: 'DEMO-MARIA-01',
      title: 'Vuelo demo en globo',
      location: 'A Coruña',
      photo: 'NA.png',
      dateExperience: '2026-01-10T11:00:00.000Z',
      quantity: 2,
      totalPrice: 120,
    },
  ],
}));

describe('Mis reservas demo', () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.scrollTo = vi.fn();
  });
  afterEach(cleanup);

  it('muestra el histórico ficticio a la cuenta pública de María', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <TokenContext.Provider value={['token-demo', vi.fn()]}>
          <UserContext.Provider
            value={[
              {
                name: 'María',
                surname: 'López',
                email: 'maria.lopez@demo.com',
                role: 'user',
              },
              vi.fn(),
            ]}
          >
            <DemoBookings />
          </UserContext.Provider>
        </TokenContext.Provider>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: 'Mis reservas demo' }),
    ).toBeTruthy();
    expect(screen.getByText(/Cuenta maria\.lopez@demo\.com/i)).toBeTruthy();
    expect(screen.getByText('Vuelo demo en globo')).toBeTruthy();
    expect(screen.queryByText('Cancelar')).toBeNull();
  });
});
