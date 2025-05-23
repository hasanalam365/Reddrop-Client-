import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const AllUsersPage = () => {

    const axiosSecure = useAxiosSecure()
    const [changeRole, setChangeRole] = useState()
    const [category, setStatusChange] = useState('');
    const [userEmail, setUserEmail] = useState()


    const { data: usersData = [], refetch } = useQuery({
        queryKey: ['all-users-data'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/admin-allUsers', {
                params: { category },
            })
            return res.data
        }
    })

    const handleStatusChange = (user) => {
        Swal.fire({
            title: ` Do you want to change the Status?`,

            showCancelButton: true,
            confirmButtonText: `${user.status === 'active' ? 'block' : 'Active'}`,

        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const updatedStatus = `${user.status === 'active' ? 'block' : 'active'}`

                const res = await axiosSecure.patch(`/statusUpdate/admin/${user.email}`, { updatedStatus })
                if (res.data.modifiedCount) {
                    Swal.fire(`${user.status === 'active' ? 'block' : 'Actived'}`, "", "success");
                    refetch()
                }

            }
        });
    }

    const handleRoleChange = (e) => {
        setChangeRole(e.target.value)


    }
    const handleConfirmChange = async () => {
        const updatedRole = changeRole

        const res = await axiosSecure.patch(`/user/role/admin/${userEmail}`, { updatedRole })

        if (res.data.modifiedCount) {
            toast.success('Role Change Successfully Done')
            refetch()
        }
    }


    const handleSearch = async () => {
        refetch()
    };

    //  (set)
    const handleChange = (e) => {
        setStatusChange(e.target.value);
        refetch()
    };


    return (
        <div className="p-4">
            <Helmet>
                <title>Dashboard | All Users</title>

            </Helmet>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg md:text-3xl lg:text-3xl font-semibold">Total Users: <span className="bg-blue-600 p-2 rounded-lg text-white">{usersData.length}</span></h2>
                </div>
                <div className="mr-1 flex gap-1">
                    <select value={category} name="filterStatus" onChange={handleChange} className="select select-bordered max-w-xs">
                        <option selected value=''>All Status</option>
                        <option value="active">Active</option>
                        <option value="block">Block</option>
                    </select>
                    <button onClick={handleSearch} className="btn bg-orange-600 text-white">filter</button>

                </div>
            </div>
            <div className="overflow-x-auto mr-1 mt-5 ">

                <table className="table table-zebra ">
                    {/* head */}
                    <thead className="bg-orange-600 text-white">
                        <tr>
                            <th>#</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action Role</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            usersData.map((user, idx) => <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>
                                    <img className="w-[45px] h-[45px] rounded-full" src={user.photoURL} alt="" />
                                </td>
                                <td>{user.name}</td>
                                <td>
                                    {user.email}
                                </td>
                                <td className={`${user.role === 'admin' && 'text-orange-600' || user.role === 'volunteer' && 'text-purple-600'} font-medium`}>
                                    {user.role}

                                </td>

                                <td>
                                    <button onClick={() => handleStatusChange(user)} className={` ${user.status === 'active' && 'text-green-600' || user.status === 'block' && 'text-red-600'}`}>
                                        {user.status}
                                    </button>
                                </td>

                                <td>

                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button className={`${user.role === 'admin' && 'text-orange-600' || user.role === 'volunteer' && 'text-purple-600'} text-lg btn`} onClick={() => { document.getElementById('my_modal_1').showModal(); setUserEmail(user.email) }}>{user.role}</button>
                                    <dialog id="my_modal_1" className="modal">
                                        <div className="modal-box text-center">
                                            <div className="w-full ">
                                                <select onChange={handleRoleChange} className="select select-bordered w-1/2">
                                                    <option disabled selected value=''>{user.role}</option>
                                                    <option value="donor">donor</option>
                                                    <option value="volunteer">volunteer</option>
                                                    <option value="admin">admin</option>

                                                </select>
                                            </div>
                                            <div className="modal-action flex items-center justify-between">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn">Cancel</button>
                                                </form>
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button onClick={() => handleConfirmChange()} className="btn bg-orange-600 text-white">confirm</button>
                                                </form>

                                            </div>
                                        </div>
                                    </dialog>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default AllUsersPage;