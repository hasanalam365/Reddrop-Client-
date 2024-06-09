import { FaArrowDown } from "react-icons/fa";
import useAllUsers from "../../../../Hooks/useAllUsers";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-toastify";


const AllUsersPage = () => {
    const [users, refetch] = useAllUsers()

    const axiosSecure = useAxiosSecure()
    const [changeRole, setChangeRole] = useState()

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
    const hangleConfirmChange = async (user) => {
        const updatedRole = changeRole
        console.log(updatedRole)
        console.log(user)
        const res = await axiosSecure.patch(`/user/role/admin/${user.email}`, { updatedRole })
        console.log(res.data)
        if (res.data.modifiedCount) {
            toast.success('Role Change Successfully Done')
            refetch()
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-semibold">Total Users: {users.length}</h2>
                </div>
                <div className="">
                    <select className="select select-bordered max-w-xs">
                        <option disabled selected value=''>Filter</option>
                        <option value="active">Active</option>
                        <option value="block">Block</option>


                    </select>
                    <button className="btn bg-orange-600 text-white">Search</button>

                </div>
            </div>
            <div className="overflow-x-auto mr-5 mt-5 ">

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
                            users.map((user, idx) => <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>
                                    <img className="w-[45px] h-[45px] rounded-full" src={user.photoURL} alt="" />
                                </td>
                                <td>{user.name}</td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.role}

                                </td>


                                <td>
                                    <button onClick={() => handleStatusChange(user)} className={`btn ${user.status === 'active' && 'text-green-600' || user.status === 'block' && 'text-red-600'}`}>
                                        {user.status}
                                    </button>
                                </td>


                                <td>

                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>{user.email}<FaArrowDown /></button>
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
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button onClick={() => hangleConfirmChange(user)} className="btn bg-orange-600 text-white">confirm</button>
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
        </div>
    );
};

export default AllUsersPage;