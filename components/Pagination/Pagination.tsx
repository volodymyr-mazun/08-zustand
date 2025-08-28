
// ----------КОМПОНЕНТ, НАЛАШТУВАННЯ БІБЛІОТЕКИ REACT PAGINATION----------

import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;          
  currentPage: number;       
  onPageChange: (page: number) => void; 
}

const Pagination = ({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const zeroBasedCurrent = Math.max(0, (currentPage || 1) - 1);

  return (
    <ReactPaginate
      previousLabel={"← Назад"}
      nextLabel={"Вперед →"}
      pageCount={pageCount}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={zeroBasedCurrent}
      renderOnZeroPageCount={null}
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousClassName={css.previous}
      nextClassName={css.next}
      disabledClassName={css.disabled}
    />
  );
};

export default Pagination;
