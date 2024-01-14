import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_PK);
    // const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
    
    return (
        <div>
            <SectionTitle Heading="Payment" />
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>

        </div>
    );
};

export default Payment;