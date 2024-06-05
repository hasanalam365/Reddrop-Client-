import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const DonorDashboard = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()

    const { data = [] } = useQuery({
        queryKey: ['my-donation-request'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/recentThreeData/${user.email}`)
            return data
        }
    })

    if (data.length == []) {
        return <span className="loading loading-ring loading-lg"></span>
    }

    return (
        <div>
            <h1 className="text-3xl font-semibold mb-8">Welcome to <span className="text-orange-600">{user.displayName}</span></h1>
            <div>

                <div className="overflow-x-auto">

                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Recipient Name</th>
                                <th>Recipient Location</th>
                                <th>Blood Group</th>
                                <th>Donation Date</th>
                                <th>Donation Time</th>
                                <th>Donation Status</th>
                                <th>Update</th>
                                <th>Delete</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data.map((singleData, idx) => <tr key={singleData._id}>
                                    <th>{idx + 1}</th>
                                    <td>{singleData.recipientName}</td>
                                    <td className="flex flex-col">
                                        <span>{singleData.district}</span>
                                        <span>{singleData.upazila}</span>
                                    </td>
                                    <td>{singleData.bloodGroup}</td>
                                    <td>{singleData.donateDate.split(',')[0]}</td>
                                    <td>{singleData.donateTime.split(',')[1]}</td>
                                    <td>{singleData.status}</td>
                                    <td>
                                        <Link to={`/dashboard/updated-donation-request/${singleData._id}`}>
                                            <FaEdit className="text-xl text-green-600 hover:scale-110"></FaEdit>
                                        </Link>

                                    </td>
                                    <td>
                                        <MdDeleteForever className="text-2xl text-red-600 hover:scale-110"></MdDeleteForever>
                                    </td>

                                    <td>
                                        <Link>View</Link>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DonorDashboard;