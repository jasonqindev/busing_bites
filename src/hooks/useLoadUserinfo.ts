import { useRequest } from "ahooks";
import { createUser, getUserinfo, updateUserinfo } from "services/user";
import { UserinfoType } from "types/userAjax";

export const useGetUserinfo = (onSuccess?: () => void) => {
  const pack = async (id: string) => {
    return await getUserinfo(id);
  };
  const { loading, error, data, run } = useRequest(pack, {
    manual: true,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
  });

  return { loading, error, data, run };
};

export const useCreateUser = () => {
  const pack = async (id: string, data: Partial<UserinfoType>) => {
    return await createUser(id, data);
  };
  const { loading, error, data, run } = useRequest(pack, {
    manual: true,
  });
  return { loading, error, data, run };
};

export const useUpdateUserinfo = (onSuccess?: () => void) => {
  const pack = async (id: string, data: Partial<UserinfoType>) => {
    return await updateUserinfo(id, data);
  };
  const { loading, error, data, run } = useRequest(pack, {
    manual: true,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
  });
  return { loading, error, data, run };
};
