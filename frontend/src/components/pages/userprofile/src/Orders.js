import React from 'react';
import Order from "../../../universal/order/src/Order";


class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCompleted: false,
            activeOrders: [
                {
                    orderId: "47878",
                    orderTitle: "дипломная работа по программированию",
                    orderPrice: "1583.52"
                },
                {
                    orderId: "43",
                    orderTitle: "лабораторная работа  по мат анализу",
                    orderPrice: "5673"
                },
                {
                    orderId: "75647",
                    orderTitle: "зачет по мат. моделированию",
                    orderPrice: "600"
                },
            ],
            completedOrders: [
                {
                    orderId: "57482",
                    orderTitle: "контрольная работа по алгебре",
                    orderPrice: "462.43"
                },
                {
                    orderId: "567",
                    orderTitle: "проект на Java",
                    orderPrice: "1000.50"
                },
                {
                    orderId: "548324",
                    orderTitle: "курсовая работа по экономике",
                    orderPrice: "5740"
                },
            ],
        }
        this.handlerCompletedOrdersClick = this.handlerCompletedOrdersClick.bind(this);
        this.handlerActiveOrdersClick = this.handlerActiveOrdersClick.bind(this);
    }

    handlerActiveOrdersClick(event) {
        this.setState({showCompleted: false});
    }

    handlerCompletedOrdersClick(event) {
        this.setState({showCompleted: true});
    }

    render() {
        const showCompleted = this.state.showCompleted;
        const completedOrders = this.state.completedOrders;
        const activeOrders = this.state.activeOrders;
        return (
            <div class="orders">
                <h2>Заказы</h2>
                <div className="profile_buttons">
                    <button id="active" onClick={this.handlerActiveOrdersClick}>Активные</button>
                    <button id="completed" onClick={this.handlerCompletedOrdersClick}>Завершенные</button>
                </div>
                <ShowOrders showCompleted={showCompleted} completedOrders={completedOrders}
                            activeOrders={activeOrders}></ShowOrders>
            </div>
        )

    }
}

function ShowOrders(props) {
    const showCompleted = props.showCompleted;
    const completedOrders = props.completedOrders;
    const activeOrders = props.activeOrders;
    if (showCompleted) {
        return <ShowCompleted orders={completedOrders}/>
    } else {
        return <ShowActive orders={activeOrders}/>
    }
}

function ShowCompleted(props) {
    const orders = props.orders;
    return (
        <div class="order">
            <h3>Выполненные заказы</h3>
            {orders.map((order, index) => (<Order key={index} order={order}/>))}
        </div>
    )
}

function ShowActive(props) {
    const orders = props.orders;
    return (
        <div class="order">
            <h3>Активные заказы</h3>
            {orders.map((order, index) => (<Order key={index} order={order}/>))}
        </div>
    )
}

export default Orders;