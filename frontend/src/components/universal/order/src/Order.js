import './Order.css';

import React from 'react';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: props.order,
        }
    }
    cutText(text, maxLength){
        if(text.length > maxLength){
            let result = text.slice(0, maxLength-3)+ '...';
            return result;
        }
        return text;
    }
    render() {
        const order = this.state.order;
        return (
            <div class="order_items">
                <div class="order_item">
                    <div class="order_id">
                        <p class="title">Заказ</p>
                        <p class="data">{"№ " + order.orderId}</p>
                    </div>
                    <div className="order_title">
                        <p className="title">Название работы:</p>
                        <p className="data">{this.cutText(order.orderTitle, 25)}</p>
                    </div>
                    <div className="order_price">
                        <p className="title">Цена работы:</p>
                        <p className="data">{order.orderPrice + " р."}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Order;