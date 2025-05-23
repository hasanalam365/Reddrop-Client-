import useAuth from "../../../Hooks/useAuth";
import useDataLoad from "../../../Hooks/useDataLoad";
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useRoleCheckFetch from "../../../Hooks/useRoleCheckFetch";
import { Helmet } from "react-helmet-async";

const CreateDonationRequest = () => {

    const { user } = useAuth()
    const [donationRequests, districts, upazilas] = useDataLoad()
    const [startDate, setStartDate] = useState(new Date());
    const [time, setStartTime] = useState(new Date());
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const [roleChecked] = useRoleCheckFetch()

    const handleDonateRequest = async (e) => {
        e.preventDefault()

        if (roleChecked.status === 'block') {
            return toast.error(`Dear ${user.displayName}, you are a block user. cannot create blood request`)
        }

        const form = e.target;
        const recipientName = form.recipientName.value;
        const hospitalName = form.hospitalName.value;
        const requesterName = user.displayName
        const requesterEmail = user.email
        const district = form.district.value;
        const upazila = form.upazila.value;
        const bloodGroup = form.bloodGroup.value;
        const donateDate = startDate.toLocaleString()
        const donateTime = time.toLocaleString()
        const requestMessage = form.requestMessage.value
        const fullAddress = form.fullAddress.value
        const status = "pending"

        const donationDetails = { recipientName, hospitalName, district, upazila, bloodGroup, requestMessage, fullAddress, donateDate, donateTime, requesterName, requesterEmail, status }

        try {

            const res = await axiosPublic.post('/create-donation-request', donationDetails)

            if (res.data.insertedId) {
                toast.success('Your request succussfully done')
                navigate('/dashboard/my-donation-requests')
            }
        } catch (err) {
            toast.err('something is wrong please try again later')
        }


    }

    return (
        <div>
            <Helmet>
                <title>Dashboard | Create Donation</title>

            </Helmet>
            <section className="p-6 bg-gray-100 dark:text-gray-900">
                <form onSubmit={handleDonateRequest} noValidate="" action="" className="container flex flex-col mx-auto space-y-4">
                    <div className="col-span-full lg:col-span-1 mx-auto">
                        <p className="text-3xl ml-5  md:text-4xl lg:text-4xl font-semibold">Donation Request Information</p>

                    </div>
                    <fieldset className=" p-6 rounded-md shadow-sm dark:bg-gray-50">

                        <div className="grid grid-cols-6  gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label className="text-lg  ">Recipient Name</label>
                                <input id="Recipient Name" type="text" placeholder="Recipient Name"
                                    name="recipientName" className="w-full rounded-md
                                    p-2 focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="hospitalName" className="text-lg  ">Hospital Name</label>
                                <input id="lastname" type="text" name="hospitalName" placeholder="exp: Dhaka Medical College Hospital" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600
                                p-2 dark:border-gray-300" />
                            </div>

                            <div className="col-span-full grid grid-cols-6 lg:flex-row  gap-5 ">
                                <div className="flex flex-col col-span-full md:col-span-2  lg:col-span-2 ">
                                    {/* <label className="text-lg  " htmlFor="">Select Blood Group</label> */}
                                    <select name="bloodGroup" className="select select-success">
                                        <option selected disabled>Choose a Blood Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>

                                    </select>
                                </div>
                                <div className="flex flex-col col-span-full md:col-span-2  lg:col-span-2 ">
                                    {/* <label className="text-lg  " htmlFor="">Select District</label> */}
                                    <select name="district" className="select select-success">
                                        <option selected disabled>Choose a District</option>
                                        {/* districts map */}
                                        {

                                            districts.map(district => <option key={district.id}>
                                                {district.name}
                                            </option>)
                                        }

                                    </select>
                                </div>
                                <div className="flex flex-col col-span-full md:col-span-2 lg:col-span-2">
                                    {/* <label className="text-lg  " htmlFor="">Select Upazila</label> */}
                                    <select name="upazila" className="select select-success">
                                        <option selected disabled>Choose a Upazila</option>
                                        {/* districts map */}
                                        {
                                            upazilas.map(upazila => <option key={upazila.id}>
                                                {upazila.name}
                                            </option>)
                                        }

                                    </select>
                                </div>

                            </div>
                            <div className=" col-span-6">
                                <label className="text-lg  ">Full Address</label>
                                <input id="Recipient Name" type="text" placeholder="exp: Zahir Raihan Rd, Dhaka"
                                    name="fullAddress" className="w-full rounded-md
                                    p-2 focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300" />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="Request Message" className="text-lg">Request Message</label>
                                <textarea id="requestMessage" name="requestMessage" placeholder="why you need blood?" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2"></textarea>
                            </div>

                            <div className="col-span-3 flex flex-col">
                                <label htmlFor="Select Date" className="text-lg">Donation Date</label>
                                <DatePicker
                                    showIcon
                                    selected={startDate}
                                    onSelect={(date) => setStartDate(date)}
                                    className="w-full "
                                />
                            </div>
                            <div className="col-span-3 flex flex-col md:col-span-3 lg:col-span-3">
                                <label htmlFor="Select Date" className="text-lg">Donation Time</label>
                                <DatePicker
                                    selected={time}
                                    onChange={(time) => setStartTime(time)}
                                    className="p-1 w-full"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"

                                />
                            </div>

                            <div className="col-span-full sm:col-span-3">
                                <label className="text-lg ">Requester Name</label>
                                <input id="Requester Name" type="text" value={user.displayName}
                                    name="requesterName" className="w-full rounded-md
                                    p-2 focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="Requester Email" className="text-lg">Requester Email</label>
                                <input id="lastname" type="text" name="requesterEmail" value={user.email} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600
                                p-2 dark:border-gray-300" />
                            </div>
                            <div className="form-control col-span-full mt-6">
                                <button className="btn btn-secondary">Request</button>
                            </div>
                        </div>
                    </fieldset>

                </form>
            </section>
        </div>
    );
};

export default CreateDonationRequest;