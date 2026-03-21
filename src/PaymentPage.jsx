import { useEffect } from "react";

export const PaymentPage = () => {
  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL || "/";
    window.location.replace(`${baseUrl}#pricing`);
  }, []);

  return null;
};
