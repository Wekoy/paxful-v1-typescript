import useSWR from 'swr';
import { DataFromServer, ErrorData } from 'entries/dataFromServer';

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) throw new Error(response.statusText);

  const result: DataFromServer = await response.json();

  return result;
};

const useGetInformation = (url: string) => {
  return useSWR<DataFromServer, ErrorData>(url, fetcher, {
    revalidateOnFocus: false,
  });
};

export default useGetInformation;
