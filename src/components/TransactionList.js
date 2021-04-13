import React, { useState, useEffect } from 'react';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Donors.css';
import APIService from '../APIService';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import im1 from 'src/images/sign.png';
import im2 from 'src/images/logo.png';
// import im1 from '/home/mittooji/Desktop/Frontend/Team_7_SEF_Frontend/src/images/sign.png';
// import im2 from '/home/mittooji/Desktop/Frontend/Team_7_SEF_Frontend/src/images/logo.png';


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

function editBtn(props,transaction,aproval,donor) {

    const editDonorBtn = (transaction) => {
        props.editBtn(transaction)
    }
    const file_name = "transaction_" + donor + "_" + transaction.id + ".pdf"

    return ( <div> 
            {aproval ? 
            <div>
                {transaction && <PDFDownloadLink document={<MyDoc transaction = {transaction} donor = {donor}/>} fileName={file_name}>
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <button className = "btn btn-primary" >PDF</button>)}
              </PDFDownloadLink> }
              </div>: 
                <button className = "btn btn-primary" onClick  = {() => editDonorBtn(transaction)}>Edit</button> }
        </div>
    )
    
}

function approveBtn(props,transaction,approval,Poc,Donor,Amount,Currency,Date) {
    const Is_Approved = true;
    const approveDonorBtn = (transaction) => {
        APIService.UpdateTransaction(transaction.id, {
            Poc,
            Donor,
            Amount,
            Currency,
            Date,
            Is_Approved
        }).then(resp => console.log(resp))
        props.approveBtn();
    }
    return ( <div> 
            {approval ? 
                <div style={{color: '#66FF99'}}>Approved</div> : 
                <div>
                <button className = "btn btn-primary" onClick  = {() => approveDonorBtn(transaction)}>Approve</button> 
                </div>}
        </div>
    )
    
}

const styles = StyleSheet.create({
    section: { 
        padding: 10, 
        margin: 10,
        flexGrow: 1
    },
    header: {
        textAlign: 'center'
    },
    image: {
      width: "50%",
      padding: 10
    },
    centerImage: {
      alignItems: "center"
    },
    table: { 
        display: "table", 
        width: "auto", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderRightWidth: 0, 
        borderBottomWidth: 0 
    }, 
    tableRow: { 
        margin: "auto", 
        flexDirection: "row" 
    }, 
    tableColSmall: { 
        width: "12.5%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
    }, 
    tableColLarge: { 
        width: "25%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
    }, 
    tableCell: { 
        margin: "auto", 
        marginTop: 5, 
        fontSize: 10 
    },
    text: {
      fontSize: 11,
      textAlign: 'center'
    }
  });


const MyDoc = (props) => (
    <Document>
      <Page size="A4" wrap>
            <View style={styles.section} wrap={false}>
                <Image style={styles.image} src={im2} />
                <Text>
                Receipt No: SEF/DON/Serial No./2021-22	Date: {props.transaction.Date}
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>
                TO WHOMSOEVER IT MAY CONCERN
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>
                Simple Education Foundation (SEF) received the below items as a donation from {props.donor}. The
invoice no {props.transaction.Poc} dated {props.transaction.Date} along with good was received on {props.transaction.Date}
                </Text>
            </View>
            <View style={styles.section}>
                <View style={styles.table}> 
                    {/* TableHeader */} 
                    <View style={styles.tableRow}> 
                        <View style={styles.tableColSmall}> 
                            <Text style={styles.tableCell}>
                                S.no 
                            </Text> 
                        </View> 
                        <View style={styles.tableColLarge}> 
                            <Text style={styles.tableCell}>
                                Item Description
                            </Text> 
                        </View> 
                        <View style={styles.tableColSmall}> 
                            <Text style={styles.tableCell}>
                                Unit
                            </Text> 
                        </View> 
                        <View style={styles.tableColSmall}> 
                            <Text style={styles.tableCell}>
                                Qty
                            </Text> 
                        </View> 
                        <View style={styles.tableColSmall}> 
                            <Text style={styles.tableCell}>
                                Rate
                            </Text> 
                        </View> 
                        <View style={styles.tableColLarge}> 
                            <Text style={styles.tableCell}>
                                Amount
                            </Text> 
                        </View> 
                    </View> 
                    {/* TableContent */} 
                    <View style={styles.tableRow}> 
                        <View style={styles.tableColSmall}> 
                            <Text style={styles.tableCell}>
                                1
                            </Text> 
                        </View> 
                        <View style={styles.tableColLarge}> 
                            <Text style={styles.tableCell}>
                                
                            </Text> 
                        </View> 
                        <View style={styles.tableColSmall}> 
                            <Text style={styles.tableCell}>
                                
                            </Text> 
                        </View> 
                        <View style={styles.tableColSmall}> 
                            <Text style={styles.tableCell}>
                                
                            </Text> 
                        </View> 
                        <View style={styles.tableColSmall}> 
                            <Text style={styles.tableCell}>
                                {props.transaction.Currency}
                            </Text> 
                        </View> 
                        <View style={styles.tableColLarge}> 
                            <Text style={styles.tableCell}>
                                {props.transaction.Amount}
                            </Text> 
                        </View> 
                    </View> 
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>
                Thank you for your generous donation! We appreciate your support
                </Text>
            </View>
            <View style={styles.section} wrap={false}>
                <Text style={styles.text}>
                For Simple Education Foundation
                </Text>
                <Image style={styles.image} src={im1} />
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>
                    This confirms that the items given by the donor to Simple Education Foundation (SEF).{"\n"}
                    No goods or services were received in exchange for this/ these donations.{"\n"}
                    SEF is a non-profit registered under section 80G of Income Tax Act, 1961.{"\n"}
                    80G: DEL-SE27729-24042017/8410
                </Text>
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
                />
            <View style={styles.section}>
                <Text style={styles.text}>
                    Registered Address: H-1, Bandhu Vihar, CGHS, Sector – 10, Plot No. – 11, Dwarka, New Delhi – 110075{"\n"}
                    www.simpleeducationfoundation.org | +91-9810704035 | connect@simpleeducationfoundation.org
                </Text>
            </View>
        </Page>
    </Document>
  )

function getDonor(transaction,donors){
    var name = "unknown"
    donors.forEach(donor => {
        if (donor.id == transaction) {
            name = donor.First_Name;
        }
    });
    if (name == "unknown") {
        console.log(transaction)
    }
    return name;
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
        newData.push({
            Poc: transaction.Poc,
            Donor: getDonor(transaction.Donor,donors),
            Amount: transaction.Amount,
            Currency: transaction.Currency,
            Date: transaction.Date,
            Approve_Transaction: approveBtn(props,transaction,transaction.Is_Approved,transaction.Poc,transaction.Donor,transaction.Amount,transaction.Currency,transaction.Date),
            Edit_Transaction: editBtn(props,transaction,transaction.Is_Approved,getDonor(transaction.Donor,donors))
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