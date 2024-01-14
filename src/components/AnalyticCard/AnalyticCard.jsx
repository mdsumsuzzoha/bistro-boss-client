
const AnalyticCard = ({ icon, data,info }) => {

    return (
        <div className="max-w-[390px] h-[150px] bg-gradient-to-r from-blue-500 to-green-500 m-4 p-4 rounded-md flex justify-center items-center ">
            <div className="flex items-center gap-4 font-bold ">
                <div className="text-5xl ">
                    {icon}
                </div>
                <div>
                    <h3 className="text-4xl ">{data}</h3>
                    <p className="text-lg ">{info}</p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticCard;

