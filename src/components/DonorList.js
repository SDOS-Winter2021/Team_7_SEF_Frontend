import React from "react";
import { useTable, useFilters, useGlobalFilter } from 'react-table'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Donors.css';


// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
}) {
    const count = preGlobalFilteredRows.length

    return (
        <span>
            Found: {count} records
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

function editBtn(props,donor) {

    const editDonorBtn = (donor) => {
        props.editBtn(donor)
    }


    return <button className = "btn btn-primary" onClick  = {() => editDonorBtn(donor)}>Update</button>
}



function DonorList(props) {

    const donors = props.donors;

    const newData = [];
    donors.forEach(donor => {
        newData.push({
            PAN:donor.PAN,
            Title:donor.Title,
            First_Name:donor.First_Name,
            Last_Name:donor.Last_Name,
            Current_Address:donor.Current_Address,
            Email:donor.Email,
            Phone:donor.Phone,
            Birth_Date:donor.Birth_Date,
            Recruitment_Source:donor.Recruitment_Source,
            Recruitment_Type:donor.Recruitment_Type,
            Nationality:donor.Nationality,
            Organisation:donor.Organisation,
            Status:donor.Status,
            Update_Donor: editBtn(props,donor)
        });
    });

    const columns = React.useMemo(
        () => [
            {
                Header: 'PAN',
                accessor: 'PAN',
            },
            {
                Header: 'Title',
                accessor: 'Title',
            },
            {
                Header: 'First Name',
                accessor: 'First_Name',
            },
            {
                Header: 'Last Name',
                accessor: 'Last_Name',
            },
            {
                Header: 'Current Address',
                accessor: 'Current_Address',
            },
            {
                Header: 'Email',
                accessor: 'Email',
            },
            {
                Header: 'Phone',
                accessor: 'Phone',
            },
            {
                Header: 'Birth Date',
                accessor: 'Birth_Date',
            },
            {
                Header: 'Recruitment Source',
                accessor: 'Recruitment_Source',
            },
            {
                Header: 'Recruitment Type',
                accessor: 'Recruitment_Type',
            },
            {
                Header: 'Nationality',
                accessor: 'Nationality',
            },
            {
                Header: 'Organisation',
                accessor: 'Organisation',
            },
            {
                Header: 'Status',
                accessor: 'Status',
            },
            {
                Header: '',
                disableFilters: true,
                accessor: 'Update_Donor',
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

export default DonorList;