import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import {  FaTruck, FaUserAlt, FaUsers, FaWallet } from "react-icons/fa";
import AnalyticCard from "../../../../components/AnalyticCard/AnalyticCard";
import CusBarChart from "../../../../components/Chart/CusBarChart";
import CusPieChart from "../../../../components/Chart/CusPieChart";


const AdminHome = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: data = [] } = useQuery({
        queryKey: ['admin-stats'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            return res.data;
        }
    })

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats')
            return res.data
        }
    })


    return (
        <div>
            <SectionTitle Heading={`Hi, Welcome ${user.email ? user.displayName : 'Back'}`} />
            <div className="grid grid-cols-2 md:grid-cols-4">
                <AnalyticCard icon={<FaWallet />} data={data.totalRevenue} info='Revenue' />
                <AnalyticCard icon={<FaUsers />} data={data.users} info='Customers' />
                <AnalyticCard icon={<FaUserAlt />} data={data.menuItems} info='Products' />
                <AnalyticCard icon={<FaTruck />} data={data.orders} info='Orders' />
            </div>
            <div className="flex justify-around items-center bg-base-200">
                <div>
                    <CusBarChart chartData={chartData}></CusBarChart>
                </div>
                <div>
                    <CusPieChart chartData={chartData}></CusPieChart>
                </div>
            </div>

        </div>
    );
};

export default AdminHome;