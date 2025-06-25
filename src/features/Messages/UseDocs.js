import { useQuery } from "@tanstack/react-query";
import { readDocs } from "../../services/addDoc";

export function useDocs() {
  const { data, isLoading } = useQuery({
    queryFn: readDocs,
    queryKey: ["data"],
  });

  return { data, isLoading };
}
