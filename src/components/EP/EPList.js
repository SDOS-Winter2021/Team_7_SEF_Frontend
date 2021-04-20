import React from 'react'
import { useTable, useFilters, useGlobalFilter } from 'react-table'
import './Donors.css';


// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
}) {
    const count = preGlobalFilteredRows.length

    return (
        <span>
            Found: {count} Notifications
        </span>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
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
            <br />
            <br />
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

function doneBtn() {

    // const editNoteBtn = (note) => {
    //     props.editBtn(note)
    // }


    return <button className="btn btn-primary">Done</button>
    // return <button className = "btn btn-primary" onClick  = {() => editNoteBtn(note)}>Update</button>
}


function EPList(props) {

    const filterTransaction = props.transactions;

    var newData = [];
    const taskList = ['Donation Reciept + 80 G',
        'Thank you Phone Call',
        '"month since" Thank you email with update',
        'Quarter Program Updates',
        '6 month Update',
        'Satisfction Survey (Coffee Chat/Meetup)',
        'Pledge (Email/Coffee Chat - Messages of Hope - count on support again)',
        'Donorversery Email'];
    if (filterTransaction.length > 0) {

        var oldest_transaction = filterTransaction.reduce(function (a, b) {
            return a < b ? a : b;
        });
        var newest_transaction = filterTransaction.reduce(function (a, b) {
            return a > b ? a : b;
        });
        var date1 = new Date(newest_transaction);
        const date2 = new Date();
        var diffTime = Math.abs(date2 - date1);
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        var date3 = new Date(oldest_transaction);
        var diffTime2 = Math.abs(date2 - date3);
        var diffDays2 = Math.ceil(diffTime2 / (1000 * 60 * 60 * 24));
        if (diffDays <= 3) {
            newData.push({
                Task: taskList[0],
                Date: 3 - diffDays,
                Done: doneBtn()
            })
        }
        if (diffDays <= 7) {
            newData.push({
                Task: taskList[1],
                Date: 7 - diffDays,
                Done: doneBtn()
            })
        }
        if (diffDays <= 30) {
            newData.push({
                Task: taskList[2],
                Date: 30 - diffDays,
                Done: doneBtn()
            })
        }
        if (diffDays <= 180) {
            newData.push({
                Task: taskList[4],
                Date: 180 - diffDays,
                Done: doneBtn()
            })
        }
        if (diffDays <= 240) {
            newData.push({
                Task: taskList[5],
                Date: 240 - diffDays,
                Done: doneBtn()
            })
        }
        if (diffDays <= 270) {
            newData.push({
                Task: taskList[6],
                Date: 270 - diffDays,
                Done: doneBtn()
            })
        }
        if (diffDays2 <= 365) {
            newData.push({
                Task: taskList[7],
                Date: 365 - diffDays,
                Done: doneBtn()
            })
        }
    }


    const columns = React.useMemo(
        () => [
            {
                Header: 'Task',
                accessor: 'Task',
            },
            {
                Header: 'Due Date',
                accessor: 'Date',
            },
            {
                Header: '',
                disableFilters: true,
                accessor: 'Done',
            },
        ],
        []
    )
    return (
        <EPex columns={columns} data={newData} />
    )
}

export default EPList;

function EPex(props) {
    return (
        <div className="Donors">
            {props.data ? <Table columns={props.columns} data={props.data} />: <Table columns={props.columns} data={[]} />}
        </div>
    )
}