import React, { useState, useEffect } from 'react';
import { useTable, useFilters, useGlobalFilter } from 'react-table'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Donors.css';
import APIService from '../APIService';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import im1 from '../images/sign.png';
import im2 from '../images/logo.png';
// import im1 from '/home/mittooji/Desktop/Frontend/Team_7_SEF_Frontend/src/images/sign.png';
// import im2 from '/home/mittooji/Desktop/Frontend/Team_7_SEF_Frontend/src/images/logo.png';


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

function editBtn(props, transaction, aproval, donor) {

    const editDonorBtn = (transaction) => {
        props.editBtn(transaction)
    }
    const file_name = "transaction_" + donor.First_Name + "_" + transaction.Receipt_Number + ".pdf";
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const date_today = mm + '/' + dd + '/' + yyyy;
    const numWords = require('num-words')
    const amountInWords = numWords(transaction.Amount)

    return (<div>
        {aproval ?
            <div>
                {transaction && <PDFDownloadLink document={<MyDoc transaction={transaction} donor={donor} date={date_today} amountInWords={amountInWords} />} fileName={file_name}>
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <button className="btn btn-primary" >PDF</button>)}
                </PDFDownloadLink>}
            </div> :
            <button className="btn btn-primary" onClick={() => editDonorBtn(transaction)}>Edit</button>}
    </div>
    )

}

function approveBtn(props, transaction, approval, Receipt_Number, Donor, Currency, Amount, Date, Mode_of_Payment) {
    const Is_Approved = true;
    const approveDonorBtn = (transaction) => {
        APIService.UpdateTransaction(transaction.id, {
            Receipt_Number,
            Donor,
            Currency,
            Amount,
            Date,
            Mode_of_Payment,
            Is_Approved
        }).then(resp => console.log(resp))
        props.approveBtn();
    }
    return (<div>
        {approval ?
            <div style={{ color: '#66FF99' }}>Approved</div> :
            <div>
                <button className="btn btn-primary" onClick={() => approveDonorBtn(transaction)}>Approve</button>
            </div>}
    </div>
    )

}

const styles = StyleSheet.create({
    page_style: {
        margin: 10
    },
    section: {
        padding: 10,
        margin: 10,
        flexGrow: 1
    },
    image: {
        width: "30%",
        padding: 2
    },
    text: {
        fontSize: 11,
        textAlign: 'center'
    },
    text_right: {
        fontSize: 11,
        textAlign: 'left'
    }
});


const MyDoc = (props) => (
    <Document>
        <Page size="LETTER" orientation="landscape" style={styles.page_style} wrap>
            <View>
                <Image style={styles.image} src={im2} />
            </View>
            <View style={styles.section}>
                <Text style={styles.text_right}>
                    Donations are exempt under Section 80G of the IT Act 1961:{"\n"}
                    No. {props.transaction.id}{"\n"}
                    Pan No: {props.donor.PAN} {/*convert to pan number when defined*/}
                </Text>
            </View>
            <View>
                <Text style={styles.text_right}>
                    Receipt Date: {props.date}{"\n"}
                    Receipt No: {props.transaction.Receipt_Number}{"\n"}
                    Donation Date: {props.transaction.Date}{"\n"}
                    Received with thanks from: {props.donor.First_Name}{"\n"}
                    Address/Email of Donor: {props.donor.Email}{"\n"}
                    Pan of Donor: {props.donor.PAN}{"\n"}
                    Sum of Rupees (in words): {props.amountInWords}{"\n"}
                    By Cash/Online/Cheque*: {props.transaction.Mode_of_Payment}{"\n"}
                </Text>
            </View>

            <View style={styles.section} wrap={false}>
                <Text style={styles.text_right}>
                    For Simple Education Foundation
                </Text>
                <Image style={styles.image} src={im1} />
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
            <View style={styles.section}>
                <Text style={styles.text}>
                    H-1, Bandhu Vihar, CGHS, Sector – 10, Plot No. – 11, Dwarka, New Delhi – 110075{"\n"}
                    +91-9810704035 | www.simpleeducationfoundation.org | connect@simpleeducationfoundation.org
                </Text>
            </View>
        </Page>
    </Document>
)

function getDonor(transaction, donors) {
    var d = null;
    donors.forEach(donor => {
        if (donor.id === transaction) {
            d = donor;
        }
    });
    if (d === null) {
        console.log(transaction)
    }
    return d;
}

function TransactionList(props) {

    const getItems = () => APIService.GetDonor();
    const [donors, setDonors] = useState([]);
    useEffect(() => {
        getItems().then(data => setDonors(data));
    }, []);

    const transactions = props.transactions;
    const newData = [];
    transactions.forEach(transaction => {
        const donor_out = getDonor(transaction.Donor, donors)
        if (donor_out){
            newData.push({
                Receipt_Number: transaction.Receipt_Number,
                Donor: donor_out.PAN,
                Currency: transaction.Currency, 
                Amount: transaction.Amount,
                Date: transaction.Date,
                Mode_of_Payment: transaction.Mode_of_Payment,
                Approve_Transaction: approveBtn(props, transaction, transaction.Is_Approved, transaction.Receipt_Number, transaction.Donor, transaction.Currency, transaction.Amount, transaction.Date, transaction.Mode_of_Payment),
                Edit_Transaction: editBtn(props, transaction, transaction.Is_Approved, donor_out)
            });
        }
    });

    const columns = React.useMemo(
        () => [
            {
                Header: 'Receipt Number',
                accessor: 'Receipt_Number',
            },
            {
                Header: 'Donor PAN',
                accessor: 'Donor',
            },
            {
                Header: 'Currency',
                accessor: 'Currency',
            },
            {
                Header: 'Amount',
                accessor: 'Amount',
            },
            {
                Header: 'Date',
                accessor: 'Date',
            },
            {
                Header: 'Mode of Payment',
                accessor: 'Mode_of_Payment',
            },
            {
                Header: '',
                disableFilters: true,
                accessor: 'Approve_Transaction',
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
