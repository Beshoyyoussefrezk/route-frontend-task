import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Bar } from 'react-chartjs-2';

import { ArcElement, Chart as ChartJS } from 'chart.js/auto';

ChartJS.register(

    ArcElement,

);



export default function CustomersWithTransactions() {
    let [customers, setCustomers] = useState([]);
    let [transactions, setTransactions] = useState([]);
    let [datesInPivotData, setDatesInPivotData] = useState([]);
    let [search, setSearch] = useState('');


    // let [loading , useLoading] = useState([]);

    async function getCustomers() {
        let { data } = await axios.get(`http://localhost:4000/customers`)
        setCustomers(data)
    }

    async function getTransactions() {
        let { data } = await axios.get(`http://localhost:4000/transactions`)
        setTransactions(data)
        let dates = [...new Set(data.map(transaction => transaction.date))]
        setDatesInPivotData(dates)
    }

    function getDataChart(date) {
        let dataChart = [];
        customers.forEach(customer => {
            let transaction = transactions.find(trans => trans.customer_id === customer.id && trans.date === date);
            if (transaction) {
                dataChart.push(transaction.amount);
            } else {
                dataChart.push(0);
            }
        });
        return dataChart
    }


    useEffect(() => {
        getCustomers()
        getTransactions()
    }, [])


    return <>
        <h1 style={{color:'#468585'}} className='my-3 text-center'>Customers With Transactions</h1>
        <input
            type="text"
            placeholder="Search here"
            className='inp form-control w-75 my-4 mx-auto text-white'
            onChange={e => setSearch(e.target.value)}
        />
        <table className="table table-success  table-hover mx-auto w-75 my-3" style={{backgroundColor: ' !important#50B498 '}}>
            <thead>
                <tr>
                    <th scope="col">Names/Dates</th>
                    {datesInPivotData.map(dateInPivotData => <th key={dateInPivotData} scope="col">{dateInPivotData}</th>)}
                </tr>
            </thead>
            <tbody>
                {customers.filter(term => {
                    return search.toLocaleLowerCase() === '' ? term : term.name.toLocaleLowerCase().includes(search)
                }).map(customer => (
                    <tr key={customer.id}>
                        <th scope="row">{customer.name}</th>
                        {datesInPivotData.map((dateInPivotData, i) => {
                            let amountForEveryCustomerWithSpecificDate = transactions.find(transaction => customer.id === transaction.customer_id && dateInPivotData === transaction.date);
                            return <td key={i}>{amountForEveryCustomerWithSpecificDate ? amountForEveryCustomerWithSpecificDate.amount : 'No Transaction'}</td>
                        })}
                    </tr>)
                )}
            </tbody>
        </table>

        <div className="container w-50 mx-auto py-5">
            <Bar data={{
                labels: customers.map(customer => customer.name),
                datasets: [
                    {
                        label: "2022-01-01",
                        data: getDataChart("2022-01-01").map(t=>t),
                        backgroundColor: '#DEF9C4'

                    },
                    {
                        label: "2022-01-02",
                        data: getDataChart("2022-01-02").map(t=>t),
                        backgroundColor: '#9CDBA6'

                    }
                ]
            }}>

            </Bar>

        </div>
    </>
}
