import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarWithCookies from '@/components/Navbar'

const Edit = () => {
    const router = useRouter()
    const { id } = router.query

    const [formState, setFormState] = useState({
        Name: '',
        Mobile_No: '',
        Invoice_no: '',
        Invoice_date: '',
        Amount: '',
    });


    useEffect(() => {
        if (id) {
            // fetch the record with the specified id from your server-side API endpoint
            axios.get('http://127.0.0.1:8000/api/form/' + id + '/', {
                headers: {
                    Authorization: `Token ${Cookies.get('token')}`,
                },
            })
                .then(res => {
                    setFormState({
                        Name: res.data.Name,
                        Mobile_No: res.data.Mobile_No,
                        Invoice_no: res.data.Invoice_no,
                        Invoice_date: res.data.Invoice_date,
                        Amount: res.data.Amount,
                    });
                    
                    
                })
                .catch(err => console.log(err))
        }
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const token = Cookies.get('token');

            if (!token) {
                return;
            }
            const config = {

                headers: {
                    Authorization: `Token ${token}`
                }
            };

            const response = await axios.put('http://127.0.0.1:8000/api/form/'+ id + '/', formState, config);


            if (response.status === 200) {
                router.push('/admin?success=true')
            } else {
                toast.error("Failed to update record.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                });
            }
        } catch (err) {
            console.log(err);
        }



    }

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        })
    }

    return <>
        <NavbarWithCookies />
        <ToastContainer />
        <div className="sm:px-5 lg:px-0 mx-auto  max-w-xl mt-40">
            <form onSubmit={handleSubmit} id="my-form"  className="space-y-5 rounded-md border-t-4 border-green-500 p-4 ">
                <div>
                    <h1 className="text-[30px] font-semibold">Edit Form</h1>
                </div>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-6 mb-3">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name='Name'
                            className="block sm:text-sm w-full rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3 border border-slate-500"
                            placeholder="John Doe"
                            value={formState.Name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-6 mb-3">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Mobile No.</label>
                        <input type="text" name='Mobile_No' pattern="[1-9]{1}[0-9]{9}" 
                            className="block sm:text-sm w-full rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3 border border-slate-500"
                            placeholder="1234567890"
                            value={formState.Mobile_No}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-12">
                        <label  className="mb-1 block text-sm font-medium text-gray-700">Invoice No.</label>
                        <input type="number" name='Invoice_no'
                            className="block sm:text-sm w-full rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3 border border-slate-500"
                            placeholder="2024-02/22/001"
                            value={formState.Invoice_no}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-6 mb-3">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Invoice Amount</label>
                        <input type="number" name='Amount'
                            className="block sm:text-sm w-full rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3 border border-slate-500"
                            placeholder="5000"
                            value={formState.Amount}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-span-6 mb-3">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Invoice Date</label>
                        <input type="date" name='Invoice_date'
                            className="block sm:text-sm w-full rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3 border border-slate-500"
                            placeholder="01/01/1991"
                            value={formState.Invoice_date}
                            readOnly
                            // onChange={handleChange}
                        />
                    </div>

                    <div className="col-span-12">
                        <button type="submit"
                            className="rounded-md border border-green-600 bg-green-600 px-8 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-green-800 hover:bg-green-800 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300">Submit</button>
                    </div>
                </div>
            </form>
        </div>
        </>
}

export default Edit