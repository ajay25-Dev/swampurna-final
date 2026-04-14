import { useEffect, useState } from "react";
import { fetchContentItems } from "../lib/contentApi";

export function useContentItems({ page, section, fallback = [] }) {
  const [items, setItems] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchContentItems({ page, section })
      .then((data) => {
        if (!isMounted) return;
        if (data && data.length > 0) {
          setItems(data);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [page, section]);

  return { items, loading, error };
}
