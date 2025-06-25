import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDocs } from "../../services/addDoc";

export function useAddMessage() {
  const queryClient = useQueryClient();
  const { mutate: AddDocs, isLoading } = useMutation({
    mutationFn: addDocs,
    onSuccess: () => {
      queryClient.invalidateQueries(["data"]);
    },
  });

  return { AddDocs, isLoading };
}
