import { Pagination as Pages } from "@mantine/core";
import { recipes_pageSize } from "const";
import { useUrlQueryParam } from "utils";
import { PageToOffset, offsetToPage } from "../utils";

const Pagination = ({ totalResults }: { totalResults: number }) => {
  const [{ offset }, setSearchParams] = useUrlQueryParam(["offset"]);
  const totalPage = Math.ceil(totalResults / recipes_pageSize);

  const handlePage = (page: number) => {
    setSearchParams({
      offset: PageToOffset(page),
    });
  };

  return (
    <Pages
      total={totalPage}
      value={offset ? offsetToPage(parseInt(offset)) : 1}
      onChange={handlePage}
    />
  );
};

export default Pagination;
