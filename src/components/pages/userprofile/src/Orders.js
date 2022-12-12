import React from 'react';


class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: false,
            orders: [],
        }
    }

    handlerActiveOrders(event) {
        this.setState({completed: false});
    }

    handlerCompletedOrders(event) {
        this.setState({completed: true});
    }

    render() {
        return (
            <div class="orders">
                <h2>Заказы</h2>
                <div className="profile_buttons">
                    <button id="data" onClick={this.handleFormClick}>Активные</button>
                    <button id="orders" onClick={this.handleOrdersClick}>Завершенные</button>
                </div>
            </div>
        )

    }
}

export default Orders;