const razorpay=require('razorpay');
const Order=require('../models/order');

const RAZORPAY_KEY_ID='rzp_test_7EozIfQ8l31Aai'
const RAZORPAY_KEY_SECRET='SiiyZJJlLoy4lFY40vjleAGm'

const purchasepremium =async (req, res) => {
    try {
        var rzp = new razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET
        })
        const amount = 2500;

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) {
                throw new Error(err);
            }
            req.user.createOrder({ orderId: order.id, status: 'PENDING'}).then(() => {
                return res.status(201).json({ order, key_id : rzp.key_id});

            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch(err){
        console.log(err);
        res.status(403).json({ message: 'Something went wrong', error: err})
    }
}

 const updateTransactionStatus = (req, res ) => {
    try {
        const { payment_id, order_id} = req.body;
        Order.findOne({where : {orderId : order_id}}).then(order => {
            order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}).then(() => {
                req.user.update({premiumUser: true})
                return res.status(202).json({sucess: true, message: "Transaction Successful"});
            }).catch((err)=> {
                throw new Error(err);
            })
        }).catch(err => {
            throw new Error(err);
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: err, message: 'Something went wrong' })

    }
}

module.exports = {
    purchasepremium,
    updateTransactionStatus
}