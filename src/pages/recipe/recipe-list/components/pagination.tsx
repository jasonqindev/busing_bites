import { Pagination as Pages } from "@mantine/core";
import { recipes_pageSize } from "const";
import { FC } from "react";
import styles from "./components.module.scss";

interface PropsType {
  totalResults: number;
  page: number;
  pageSize: number;
  pageChange: (page: number) => void;
}

const Pagination: FC<PropsType> = ({
  totalResults,
  page,
  pageChange,
  pageSize = recipes_pageSize,
}) => {
  const totalPage = Math.ceil(totalResults / pageSize);

  const handlePage = (page: number) => {
    pageChange(page);
  };

  return (
    <Pages
      className={styles.pagination}
      withEdges
      total={totalPage}
      value={page}
      onChange={handlePage}
    />
  );
};

export default Pagination;
