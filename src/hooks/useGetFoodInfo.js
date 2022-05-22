import useQuery from "./useQuery";

const endpointUrl = (barcode) =>
  `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

const fetcher = async ({ variables: { barcode } }) => {
  if (!barcode) return Promise.reject("Invalid barcode.");
  const result = await fetch(endpointUrl(barcode));
  if (result) return result.json();
  return Promise.reject("No response body from api.");
};

const useGetFoodInfo = () => useQuery({ fetcher });

export default useGetFoodInfo;
