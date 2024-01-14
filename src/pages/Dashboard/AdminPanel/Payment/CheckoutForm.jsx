import { CardElement, useElements, useStripe, } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useCart from "../../../../hooks/useCart";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {

    const [error, setError] = useState();
    const [clientSecret, setClientSecret] = useState();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart] = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                    // console.log(res.data.clientSecret);
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = (event) => {
        event.preventDefault();
        Swal.fire({
            title: "Are you sure to payment?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {

                if (!stripe || !elements) {
                    // Stripe.js has not loaded yet. Make sure to disable
                    return;
                }

                // to find your CardElement 
                const card = elements.getElement(CardElement);
                // if not found then return
                if (card == null) {
                    return;
                }

                // create Payment Method / Use your card Element with other Stripe.js APIs
                const { error, paymentMethod } = await stripe.createPaymentMethod({
                    type: 'card',
                    card,
                });

                if (error) {
                    setError(error.message);
                    // console.log('[error]', error);
                } else {
                    setError('');
                    console.log('[PaymentMethod]', paymentMethod);
                }

                // confirm payment
                const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: card,
                        billing_details: {
                            email: user?.email || 'Anonymous',
                            name: user?.displayName || 'Anonymous',
                        },
                    },
                })
                if (confirmError) {
                    // console.log('confirmError', confirmError);
                } else {
                    // console.log("payment Intant.", paymentIntent);
                    if (paymentIntent.status === "succeeded") {
                        // alert(`Transaction Succeeded. Id-${paymentIntent.id}`)

                        // now save the payment in DB
                        const paymentInfo = {
                            email: user.email,
                            price: totalPrice,
                            transactionId: paymentIntent.id,
                            date: new Date(), //convert time as utc, use MomentJS
                            cartIds: cart.map(item => item._id),
                            menuItemIds: cart.map(item => item.menuId),
                            status: "Delivery Pending"
                        }
                        const res = await axiosSecure.post('/payments', paymentInfo)
                        // console.log('Payment saved', res)
                        if (res.data?.deleteResult.acknowledged == true && res.data?.paymentResult.acknowledged == true) {
                            Swal.fire({
                                title: "Payment Completed",
                                text: `Transaction Id-${paymentIntent.id}`,
                                icon: "success"
                            });
                            navigate('/dashboard/paymentHistory')
                        }
                    }
                }

            }
        });



    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret} className="btn btn-primary">
                    Pay
                </button>
            </form>
            <p className="text-red-400">{error}</p>
        </div>
    );
};

export default CheckoutForm;

