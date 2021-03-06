require('dotenv').config();
const express = require('express')
const Razorpay = require('razorpay')


const router = express.Router();

router.post("/orders", async (req, res) => {
    const { amount } = req.body
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: amount, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.post('/success', async (req, res) => {
    console.log("inside success")
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        console.log(req.body)
        const generated_signature = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, process.env.RAZORPAY_SECRET);
        console.log(generated_signature)

        if (generated_signature !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });


        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
})


module.exports = router;
