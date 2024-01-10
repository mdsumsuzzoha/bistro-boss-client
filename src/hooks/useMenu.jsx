// import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
    const axiosPublic = useAxiosPublic();
    const { refetch, data: menu = [], isPending: loading } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/menu`)
            return res.data;
        }
    });
    // console.log(menu);
    return [menu, loading, refetch]
}
export default useMenu;