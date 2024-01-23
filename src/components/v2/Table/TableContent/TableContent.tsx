import React from 'react'
import { useMobileMediaQuery } from '../../../Media'
import { Table } from '../../../Table/Table'
import { Loader } from '../../../Loader/Loader'
import { Pagination } from '../../../Pagination/Pagination'
import { Props } from './TableContent.types'
import './TableContent.css'

const TABLE_SIBLINGS_RANGE_MOBILE = 0
const TABLE_SIBLINGS_RANGE_DESKTOP = 1
export const ROWS_PER_PAGE = 10

const TableContent = (props: Props) => {
  const {
    empty,
    data,
    isLoading,
    totalPages,
    activePage = 1,
    setPage,
    total,
    rowsPerPage = ROWS_PER_PAGE,
    hasHeaders = false,
    customHeaders = {},
    i18n
  } = props

  const isMobile = useMobileMediaQuery()
  const attributes = data.length > 0 ? Object.keys(data[0]) : null
  const hasPagination = totalPages && totalPages > 1

  return (
    <div
      className={`dui-table-content ${
        !hasPagination ? 'dui-table-content--radius-ending' : ''
      } ${!hasHeaders ? 'dui-table-content__headers--empty' : ''}`}
    >
      {isLoading ? (
        <div className="dui-table-content__table--empty">
          <Loader active data-testid="loader" />
        </div>
      ) : attributes ? (
        <Table basic="very" data-testid="table-content">
          <Table.Body
            className={isLoading ? 'dui-table-content__table--loading' : ''}
          >
            <Table.Row>
              {attributes.map((attr) => (
                <Table.HeaderCell key={attr}>
                  <span>
                    {customHeaders[attr] ? customHeaders[attr] : attr}
                  </span>
                </Table.HeaderCell>
              ))}
            </Table.Row>
            {data?.map((data: unknown, index) => (
              <Table.Row key={index}>
                {attributes.map((attr: string) => (
                  <Table.Cell
                    style={{
                      width: `${100 / attributes.length}%`
                    }}
                    key={attr}
                  >
                    {data[attr]}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        empty()
      )}
      {hasPagination && total && props.activePage !== undefined ? (
        <div className="dui-table-content__pagination">
          {`${i18n.sortBy.showing} ${
            (activePage - 1) * rowsPerPage + 1
          }-${Math.min(activePage * rowsPerPage, total)}  ${
            i18n.sortBy.of
          } ${total}`}
          <Pagination
            siblingRange={
              isMobile
                ? TABLE_SIBLINGS_RANGE_MOBILE
                : TABLE_SIBLINGS_RANGE_DESKTOP
            }
            activePage={activePage}
            totalPages={totalPages}
            onPageChange={(_event, props) =>
              setPage && setPage(+props.activePage)
            }
            firstItem={null}
            lastItem={null}
          />
        </div>
      ) : null}
    </div>
  )
}

TableContent.defaultProps = {
  i18n: {
    sortBy: {
      showing: 'Showing',
      of: 'of'
    }
  }
}

export default React.memo(TableContent)
