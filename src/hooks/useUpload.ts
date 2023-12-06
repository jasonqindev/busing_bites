import { FileWithPath } from "@mantine/dropzone";
import { useRequest } from "ahooks";
import { uploadImg, uploadRecipe } from "services/recipe";
import { UploadProps, UploadRecipeProps } from "types/recipeAjax";

export const useUploadImg = (onSuccess?: (res: UploadProps) => void) => {
  const pack = async (file: FileWithPath) => {
    return await uploadImg(file);
  };
  const { loading, error, data, run } = useRequest(pack, {
    manual: true,
    onSuccess: (res) => {
      onSuccess && onSuccess(res);
    },
  });

  return { loading, error, data, run };
};

export const useUploadRecipe = (onSuccess?: () => void) => {
  const pack = async (data: UploadRecipeProps) => {
    return await uploadRecipe(data);
  };
  const { loading, error, data, run } = useRequest(pack, {
    manual: true,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
  });

  return { loading, error, data, run };
};
