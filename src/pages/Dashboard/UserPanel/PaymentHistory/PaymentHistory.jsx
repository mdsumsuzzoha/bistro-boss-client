// import { useEffect, useState } from "react";
import DataLoading from "../../../../components/Loading/DataLoading";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const { isPending: loading, data: payments, } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        }
    })
    // console.log(payments);

    if (loading) {
        return <DataLoading></DataLoading>

    }

    return (
        <div className="w-[992px] mx-auto p-4">
            <h3 className="text-3xl uppercase">Total Payments: {payments.length}</h3>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Total Price</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, idx) =>
                            <tr key={payment._id}>
                                <th>{idx + 1}</th>
                                <td>{payment.email}</td>
                                <td>{payment.status}</td>
                                <td>{payment.price}</td>
                                <td>{payment.date}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PaymentHistory;