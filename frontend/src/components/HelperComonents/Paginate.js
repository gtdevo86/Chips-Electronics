import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const brand = parsed.brand || ''
  const filter1 = parsed.filter1 || ''
  const filter2 = parsed.filter2 || ''
  const filter3 = parsed.filter3 || ''
  const filter4 = parsed.filter4 || ''
  const filter5 = parsed.filter5 || ''
  const minStock = parsed.minStock || ''

  return (
    pages > 1 && (
      <Pagination className='justify-content-center'>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              isAdmin
                ? `/admin/productlist?page=${x + 1}`
                : parsed.q
                ? `/search?q=${parsed.q}&page=${x + 1}`
                : parsed.c
                ? `/component?c=${
                    parsed.c
                  }&brand=${brand}&filter1=${filter1}&filter2=${filter2}&filter3=${filter3}&filter4=${filter4}&filter5=${filter5}&minStock=${minStock}&page=${
                    x + 1
                  }`
                : `/?page=${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
