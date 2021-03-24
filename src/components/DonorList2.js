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



function DonorList2(props) {

    const donors = props.donors;

    const editBtn = (donor) => {
        props.editBtn(donor)
    }

    const newData = [];
    donors.forEach(donor => {
        newData.push({
            Title: donor.Title,
            Family_Name: donor.Family_Name,
            First_Name: donor.First_Name,
            Current_Address: donor.Current_Address,
            Email: donor.Email,
            Phone: donor.Phone,
            Birth_Date: donor.Birth_Date,
            First_Donation_Date: donor.First_Donation_Date,
            Recruitment_Source: donor.Recruitment_Source,
            Recruitment_Reason: donor.Recruitment_Reason,
            Number_of_Donations: donor.Number_of_Donations,
            Cumulative_Donation_Amount: donor.Cumulative_Donation_Amount,
            Last_Donation_Amount: donor.Last_Donation_Amount,
            Date_of_Last_Donation: donor.Date_of_Last_Donation,
            Preferred_Communication: donor.Preferred_Communication,
            Date_of_Last_Communication: donor.Date_of_Last_Communication,
            Last_communication: donor.Last_communication,
            SEF_POC: donor.SEF_POC,
            Notes: donor.Notes,
            Email_Communication_Rate: donor.Email_Communication_Rate,
            Update_Donor: editBtn
        });
    });

    const columns = React.useMemo(
        () => [
            {
                Header: 'Title',
                accessor: 'Title',
            },
            {
                Header: 'Family Name',
                accessor: 'Family_Name',
            },
            {
                Header: 'First Name',
                accessor: 'First_Name',
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
                Header: 'First Donation Date',
                accessor: 'First_Donation_Date',
            },
            {
                Header: 'Recruitment Source',
                accessor: 'Recruitment_Source',
            },
            {
                Header: 'Recruitment Reason',
                accessor: 'Recruitment_Reason',
            },
            {
                Header: 'Number of Donations',
                accessor: 'Number_of_Donations',
            },
            {
                Header: 'Cumulative Donation Amount',
                accessor: 'Cumulative_Donation_Amount',
            },
            {
                Header: 'Last Donation Amount',
                accessor: 'Last_Donation_Amount',
            },
            {
                Header: 'Date of Last Donation',
                accessor: 'Date_of_Last_Donation',
            },
            {
                Header: 'Preferred Communication',
                accessor: 'Preferred_Communication',
            },
            {
                Header: 'Date of Last Communication',
                accessor: 'Date_of_Last_Communication',
            },
            {
                Header: 'Last communication',
                accessor: 'Last_communication',
            },
            {
                Header: 'SEF POC',
                accessor: 'SEF_POC',
            },
            {
                Header: 'Notes',
                accessor: 'Notes',
            },
            {
                Header: 'Email Communication Rate',
                accessor: 'Email_Communication_Rate',
            },
            {
                Header: 'Update_Donor',
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

export default DonorList2;