import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setPaginationFilterAndFetchProducts } from "../../Redux/Action/ProductAction";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const ProductsPagination = () => {

  const dispatch = useDispatch();

  const totalProducts = useSelector(state => state.products.products_count);
  const currentPage = useSelector(state => state.products.product_filters.page);

  const productsPerPage = 15;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  };

  const firstItem = pageNumbers[0];
  const lastItem = pageNumbers[pageNumbers.length - 1];

  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <Pagination aria-label="Page navigation" size="sm">
      <PaginationItem>
        <PaginationLink first onClick={() => dispatch(setPaginationFilterAndFetchProducts(firstItem, productsPerPage))} />
      </PaginationItem>
      {currentPage === firstItem ?
        <PaginationItem>
          <PaginationLink previous />
        </PaginationItem>
        :
        <PaginationItem>
          <PaginationLink previous onClick={() => dispatch(setPaginationFilterAndFetchProducts(previousPage, productsPerPage))} />
        </PaginationItem>
      }
      {pageNumbers.map(number =>
        <PaginationItem key={number}>
          <PaginationLink onClick={() => dispatch(setPaginationFilterAndFetchProducts(number, productsPerPage))}>
            {number}
          </PaginationLink>
        </PaginationItem>
      )}
      {currentPage === lastItem ?
        <PaginationItem>
          <PaginationLink next />
        </PaginationItem>
        :
        <PaginationItem>
          <PaginationLink next onClick={() => dispatch(setPaginationFilterAndFetchProducts(nextPage, productsPerPage))} />
        </PaginationItem>
      }
      <PaginationItem>
        <PaginationLink last onClick={() => dispatch(setPaginationFilterAndFetchProducts(lastItem, productsPerPage))} />
      </PaginationItem>
    </Pagination>
  );
};

export default ProductsPagination;
