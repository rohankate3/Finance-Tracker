import React from 'react'
import { Line, Pie } from '@ant-design/charts'
import { Divider } from 'antd';
function ChartComponent({ sortedTransaction }) {

    const data = sortedTransaction.map((item) => {
        return { date: item.date, amount: item.amount }
    })

    const props = {
        data: data,
        xField: 'date',
        yField: 'amount',
        width:850
    };

    const spendingData = sortedTransaction.filter((transaction) => {
        if (transaction.type === 'expense')

            return { tag: transaction.tag, amount: transaction.amount }
    });

    let newSpendings = [
        { tag: 'food', amount: 0 },
        { tag: 'office', amount: 0 }
        , { tag: 'education', amount: 0 }];

    spendingData.forEach((item) => {

        if (item.tag == 'food') {
           newSpendings[0].amount += item.amount
           
           
        }
        else if(item.tag=='office')
        {
            newSpendings[1].amount += item.amount
        }
        else
        {
            newSpendings[2].amount += item.amount
        }
        // console.log(newSpendings);
    })
    const propsforpie = {
        data: newSpendings,
        angleField: 'amount',
        colorField: 'tag',
        width:500
    }


    return (
        <div className='charts-wrapper'>
            <div>
                <h2 style={{ marginTop: 0 }}>Your Analytics</h2>
                <Line {...props} />
            </div>
            <div>
                <h2>Your Spendings</h2>
                <Pie{...propsforpie} />
            </div>

        </div>

    )
}

export default ChartComponent