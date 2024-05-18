import axios from "axios";
import { useEffect, useState } from "react";

type Product = {
  productId: string;
  sku: string;
  title: string;
  price: number;
  image: string;
};

export const useFetch = (url: string) => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Product[]>(url);
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
};
