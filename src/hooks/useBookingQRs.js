import { useEffect, useState } from "react";
import fetcher from "../helpers/fetcher";

export const useBookingQRs = (ticket, token) => {
  const [bookingQRs, setBookingQRs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetcher(setBookingQRs, setError, setLoading, `booking/view/qr/${ticket}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  }, [ticket, token]);

  return bookingQRs;
};
