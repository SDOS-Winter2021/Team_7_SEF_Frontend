import React from "react";
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Donors.css';


// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            Search:{' '}
            <input
                className="form-control"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search`}
        />
    )
}

function Table({ columns, data }) {

    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn
        },
        useFilters,
        useGlobalFilter
    )

    return (
        <div>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <br/>
            <br/>
            <table className="table table-dark" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br />
            <div>Showing the first 20 results of {rows.length} rows</div>
            {/* <div>
                <pre className="temp">
                    <code>{JSON.stringify(state.filters, null, 2)}</code>
                </pre>
            </div> */}
        </div>
    )
}

function editBtn(props,transaction) {

    const editDonorBtn = (transaction) => {
        props.editBtn(transaction)
    }


    return <button className = "btn btn-primary" onClick  = {() => editDonorBtn(transaction)}>Update</button>
}



function TransactionList(props) {

    const transactions = props.transactions;

    const newData = [];
    transactions.forEach(transaction => {
        newData.push({
            Poc: transaction.Poc,
            Donor: transaction.Donor,
            Amount: transaction.Amount,
            Currency: transaction.Currency,
            Date: transaction.Date,
            Edit_Transaction: editBtn(props,transaction)
        });
    });

    const columns = React.useMemo(
        () => [
            {
                Header: 'Poc',
                accessor: 'Poc',
            },
            {
                Header: 'Donor',
                accessor: 'Donor',
            },
            {
                Header: 'Amount',
                accessor: 'Amount',
            },
            {
                Header: 'Currency',
                accessor: 'Currency',
            },
            {
                Header: 'Date',
                accessor: 'Date',
            },
            {
                Header: '',
                disableFilters: true,
                accessor: 'Edit_Transaction',
            },
        ],
        []
    )

    const data = newData

    return (
        <div className="Donors">  
        <Table columns={columns} data={data} />
        </div>
    )
}

export default TransactionList;