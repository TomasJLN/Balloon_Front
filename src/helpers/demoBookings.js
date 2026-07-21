export const DEMO_BOOKINGS_KEY = 'balloon-demo-bookings';

export const getDemoBookings = () => {
  try {
    const bookings = JSON.parse(sessionStorage.getItem(DEMO_BOOKINGS_KEY));
    return Array.isArray(bookings) ? bookings : [];
  } catch {
    return [];
  }
};

export const addDemoBooking = (booking) => {
  const ticket = `DEMO-${Date.now().toString(36).toUpperCase()}`;
  const demoBooking = {
    ...booking,
    ticket,
    createdAt: new Date().toISOString(),
  };

  sessionStorage.setItem(
    DEMO_BOOKINGS_KEY,
    JSON.stringify([demoBooking, ...getDemoBookings()]),
  );

  return demoBooking;
};

export const removeDemoBooking = (ticket) => {
  const bookings = getDemoBookings().filter(
    (booking) => booking.ticket !== ticket,
  );
  sessionStorage.setItem(DEMO_BOOKINGS_KEY, JSON.stringify(bookings));
  return bookings;
};
