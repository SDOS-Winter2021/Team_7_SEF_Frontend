import React from 'react'
import { useTable, useFilters, useGlobalFilter } from 'react-table'
import APIService from '../../APIService';
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

function doneBtn(props, ep, Donor, Transaction, Task, Due_Date, done) {

    const Is_Complete = true;
    const DoneBtn = (ep) => {
        APIService.UpdateEP(ep.id, {
            Donor,
            Transaction,
            Task,
            Due_Date,
            Is_Complete
        }).then(resp => console.log(resp))
        props.taskDoneBtn()
    }

    return (<div>
        {done ?
            <div style={{ color: '#66FF99' }}>Done</div> :
            <div>
                <button className="btn btn-primary" onClick={() => DoneBtn(ep)}>Done</button>
            </div>}
    </div>
    )
    // return <button className = "btn btn-primary" onClick  = {() => editNoteBtn(note)}>Update</button>
}


function EPList(props) {

    const filterEP = props.EP;

    const newData = [];
    filterEP.forEach(ep => {
        newData.push({
            Task: ep.Task,
            Due_Date: ep.Due_Date,
            Done: doneBtn(props, ep, ep.Donor, ep.Transaction, ep.Task, ep.Due_Date, ep.Is_Complete)
        });
    });


    const columns = React.useMemo(
        () => [
            {
                Header: 'Task',
                accessor: 'Task',
            },
            {
                Header: 'Due Date',
                accessor: 'Due_Date',
            },
            {
                Header: '',
                disableFilters: true,
                accessor: 'Done',
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

export default EPList;