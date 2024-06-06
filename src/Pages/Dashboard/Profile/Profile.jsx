import { useForm } from "react-hook-form"
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';
import { useState } from 'react';
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDataLoad from "../../../Hooks/useDataLoad";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOST_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`



const Profile = () => {

    const { user } = useAuth()
    const [enableEditBtn, setEnableEditBtn] = useState(true)
    const axiosPublic = useAxiosPublic()
    const [, districts, upazilas] = useDataLoad()
    // const {
    //     register,
    //     handleSubmit,
    // } = useForm()

    // const onSubmit = async (dataInput) => {

    //     const { name, email, bloodGroup, district, upazila, photoURL } = dataInput

    //     const imageFile = { image: photoURL[0] }


    //     const resImg = await axiosPublic.post(image_hosting_api, imageFile, {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     })

    //     console.log('post image', resImg)

    //     const photo = resImg.data.data.display_url
    //     if (resImg.data.success) {
    //         const updatedInfo =
    //         {
    //             name: name,
    //             email: email,
    //             bloodGroup: bloodGroup,
    //             district: district,
    //             upazila: upazila,
    //             photoURL: photo,
    //             id: data._id
    //         }


    //         const res = await axiosPublic.patch(`/users/${data._id}`, updatedInfo)


    //         if (res.data.modifiedCount > 0) {
    //             toast.success('updated successfully')


    //         }
    //     }


    // }

    const handleUpdatedProfile = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const bloodGroup = form.bloodGroup.value;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const photoURL = form.photo.files;

        const allinfo = { name, email, bloodGroup, district, upazila, photoURL }
        console.table(allinfo)

    }

    const { data = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data: userData } = await axiosPublic.get(`/user/${user?.email}`)
            return userData
        }
    })


    return (


        <div className=" min-h-screen bg-base-200 ">

            <div className='flex justify-center items-center h-screen'>

                <div className='bg-white shadow-lg rounded-2xl w-3/5 relative'>
                    <img
                        alt='profile'
                        src='https://wallpapercave.com/wp/wp10784415.jpg'
                        className='w-full mb-4 rounded-t-lg h-36'
                    />
                    <div className="absolute top-5 right-5">
                        <button onClick={() => { setEnableEditBtn(!enableEditBtn) }} className={`bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1 ${!enableEditBtn && 'hidden'}`}>
                            Edit
                        </button>

                    </div>
                    <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                        <a href='#' className='relative block'>
                            <img
                                alt='profile'
                                src={user.photoURL}
                                className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                            />
                        </a>

                        <p className='p-2 px-4 text-xs text-white bg-pink-500 rounded-full'>
                            Admin
                        </p>

                        <form onSubmit={handleUpdatedProfile} className='w-full p-2 mt-4 rounded-lg'>
                            <div className='flex flex-col text-sm text-gray-600 '>
                                <div className="flex gap-5">
                                    <label className='flex flex-col'>
                                        Name:
                                        <input type="text"
                                            {...(enableEditBtn && { value: data.name })}
                                            defaultValue={data.name}
                                            name="name" className="input bg-gray-50 font-medium text-black p-2" />


                                    </label>

                                    <label className='flex flex-col'>
                                        Email:
                                        <input type="email"
                                            {...(enableEditBtn && { value: data.email })}
                                            defaultValue={data.email}
                                            name="email" className="input bg-gray-50 font-medium text-black p-2" />
                                    </label>
                                </div>


                                <div className="flex gap-5">
                                    <div className="form-control">

                                        <label className="form-control w-full my-6">
                                            <div className="label">
                                                <span className="label-text">Blood Group</span>

                                            </div>
                                            <select
                                                name="bloodGroup"
                                                className="select select-bordered w-full " required>
                                                <option

                                                >{data.bloodGroup}</option>
                                                {
                                                    !enableEditBtn && <>
                                                        <option value="A+">A+</option>
                                                        <option value="A-">A-</option>
                                                        <option value="B+">B+</option>
                                                        <option value="B-">B-</option>
                                                        <option value="AB+">AB+</option>
                                                        <option value="AB-">AB-</option>
                                                        <option value="O+">O+</option>
                                                        <option value="O-">O-</option>
                                                    </>
                                                }

                                            </select>

                                        </label>
                                    </div>
                                    <div className="form-control">

                                        <label className="form-control w-full my-6">
                                            <div className="label">
                                                <span className="label-text">District</span>

                                            </div>
                                            <select
                                                name="district"
                                                className="select select-bordered w-full " required>
                                                <option>{data.district}</option>

                                                {
                                                    !enableEditBtn && districts.map(district => <option selected key={district.id} >{district.name}</option>)
                                                }


                                            </select>

                                        </label>
                                    </div>
                                    <div className="form-control">

                                        <label className="form-control w-full my-6">
                                            <div className="label">
                                                <span className="label-text">Upazila</span>

                                            </div>
                                            <select
                                                name="upazila"
                                                className="select select-bordered w-full " required>
                                                <option>{data.upazila}</option>
                                                {
                                                    !enableEditBtn && upazilas.map(upazila => <option selected key={upazila.id}>{upazila.name}</option>)
                                                }


                                            </select>

                                        </label>
                                    </div>

                                </div>
                                {/* image upload */}
                                <div className='flex flex-col w-max  text-center mb-5 border-2 p-2'>
                                    <label>
                                        <input
                                            className='text-sm cursor-pointer w-36 hidden'
                                            type='file'
                                            name='photo'
                                            id='image'
                                            accept='image/*'
                                            hidden
                                        />
                                        <div className='bg-rose-500 text-white border border-gray-300 rounded font-medium cursor-pointer p-1 px-3 hover:bg-rose-500'>
                                            Update Image
                                        </div>
                                    </label>
                                </div>
                                <div className="flex justify-end">
                                    {
                                        !enableEditBtn && <button className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                                            Update Profile
                                        </button>
                                    }

                                </div>

                            </div>
                        </form>
                        {/* uporer ta div silo */}
                    </div>
                </div>
            </div>
        </div >


    );
};

export default Profile;