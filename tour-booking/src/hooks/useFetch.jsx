import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setrror] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        await axios
          .get(url)
          .then((res) => {
            setData(res.data);
            setLoading(false);
          })

          .catch((err) => {
            setrror(err.message);
            setLoading(false);
            alert("failed to fetch");
          });
      } catch (error) {
        setrror(error.message);
        setLoading(false);
        console.log(error.message);
      }
    };

    fetchData();
  }, [url]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setLoading(true);

  //       try {
  //         const res = await fetch(url);

  //         if (!res.ok) {
  //           setrror("Failed to fetch");
  //           alert("Failed to fetch");
  //         }

  //         const result = await res.json();
  //         setData(result.data);
  //         console.log(result.data);
  //       } catch (error) {
  //         setrror(error);
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, [url]);

  return { data, loading, error };
};

export default useFetch;
