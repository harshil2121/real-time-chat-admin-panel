import ReactTableWrapper from '../../ui-component/ReactTable/reacttbl.style';
import Pagination from '../../ui-component/ReactTable/Pagination';
import { useFilters, usePagination, useSortBy, useTable } from 'react-table';
import { Edit3, Trash2 } from 'react-feather';
import { useMemo, useState } from 'react';

function User(props) {
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  // eslint-disable-next-line
  const [pageCount, setPageCount] = useState(1);
  // eslint-disable-next-line
  const [pageCng, setPageCng] = useState(1);

  const HeaderComponent = ({ title, renderSortArrow }) => {
    return (
      <div>
        {title} <span>{renderSortArrow && renderSortArrow()}</span>
      </div>
    );
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      // toggleRefresh(true);
    } else {
      setSortBy(field);
      setSortOrder('asc');
      // toggleRefresh(true);
    }
  };

  const renderSortArrow = (column) => {
    if (column !== sortBy) {
      return null; // no arrow for non-sorting columns
    }

    if (sortOrder === 'asc') {
      return <i className="fa fa-sort-up ml-1"></i>; // ascending arrow
    } else {
      return <i className="fa fa-sort-down ml-1"></i>; // descending arrow
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: (tableInstance) => {
          return <HeaderComponent title="Allergies" renderSortArrow={() => renderSortArrow(tableInstance.column.id)} />;
        },
        placeholder: 'Allergies',
        disableFilters: true,
        accessor: 'allergy',
        Cell: (tableInstance) => (
          <span className="text-capitalize">
            {/* {console.log(typeof deleteIds, deleteIds, "check208")} */}
            <input
              className="mr-2"
              type="checkbox"
              value={tableInstance.row.original._id}
              checked={deleteIds.includes(tableInstance.row.original._id)}
              onChange={(val) => {
                if (deleteIds.includes(val.target.value)) {
                  setDeleteIds(deleteIds.filter((value) => value !== val.target.value));
                } else {
                  setDeleteIds([...deleteIds, val.target.value]);
                }
              }}
            />
            {tableInstance.row.values.allergy}
          </span>
        )
      },

      {
        Header: (tableInstance) => {
          return <HeaderComponent title="Created At" renderSortArrow={() => renderSortArrow(tableInstance.column.id)} />;
        },
        // Filter: FilterComponent,
        placeholder: 'Created At',
        disableFilters: true,
        accessor: 'createdAt',
        Cell: (tableInstance) => <span className="text-capitalize">{moment(tableInstance.row.values.createdAt).format('YYYY/MM/DD')}</span>
      },

      {
        Header: (tableInstance) => {
          return <HeaderComponent isSortedDesc={tableInstance.column.isSortedDesc} title={'Action'} />;
        },
        accessor: 'id',
        disableSortBy: true,
        disableFilters: true,
        Cell: (tableInstance) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'center' }} className="react-action-class">
              <button
                className="btn btn-table btn-table-edit"
                style={{ padding: '5px' }}
                onClick={() => {
                  console.log('rerere', tableInstance);
                  // navigate(`/allergies/edit/${tableInstance?.row?.values?.id}`);
                }}
              >
                <Edit3 className="edit-icon" />
              </button>
              &ensp;
              <button
                className="btn btn-table"
                style={{ padding: '5px' }}
                onClick={() => {
                  // setDeleteModal(true);
                  // setDeleteModalData(tableInstance?.row?.values);
                }}
              >
                <Trash2 className="delete-icon" />
              </button>
            </div>
          );
        }
      }
    ],
    // eslint-disable-next-line
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    page,
    headerGroups
    // pageCount,
    // gotoPage,
    // state: { pageIndex },
  } = useTable(
    {
      data: [],
      columns: columns,
      initialState: {
        pageSize: 10,
        pageIndex: 0
      }
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      <ReactTableWrapper {...props}>
        <div className="table-responsive common-table">
          <table className="table border-0" {...getTableProps()}>
            <thead className="thead-blue">
              {headerGroups.map((headerGroup, h) => (
                <tr key={h} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((header, g) => (
                    <th key={g} {...header.getHeaderProps(header.getSortByToggleProps())} onClick={() => handleSort(header.id)}>
                      <div>{header.render('Header')}</div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr key={i} {...row.getRowProps()}>
                    {row.cells.map((cell, g) => (
                      <td key={g} className="text-left" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="table-pagin-main-div">
          <div className="pagin-sub-div">
            <Pagination
              count={pageCount}
              page={pageCng}
              // color="secondary"
              // className='my-3'P
              // onChange={(e, val) => {
              //   setPageCng(val);
              //   toggleRefresh(true);
              // }}
            />
          </div>
        </div>
      </ReactTableWrapper>
    </>
  );
}

export default User;
