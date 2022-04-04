import moment from 'moment';

class Order {
    constructor(id, items, totAmt, date) {
        this.id = id;
        this.items = items;
        this.totAmt = totAmt;
        this.date = moment(date).format('MMMM Do YYYY, hh:mm');
    };
};

export default Order;