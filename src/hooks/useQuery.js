import { useState } from "react";

const useQuery = ({ fetcher, clearDataOnFail }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (variables = undefined) => {
    try {
      setError(null);
      setIsLoading(true);

      const result = await fetcher({
        variables
      });

      setData(result);
      setIsLoading(false);
      return result;
    } catch (e) {
      setError(e);
      clearDataOnFail && setData(undefined);
      setIsLoading(false);
    }
  };

  const state = { data, isLoading, error };
  return {
    state,
    fetchData: fetchData,
    setData
  };
};

export default useQuery;
