import NavbarWithCookies from '@/components/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Form = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [invoice_no, setInvoice_no] = useState('');
    const [invoice_amt, setInvoice_amt] = useState('');
    const [invoice_date, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10))
    const [DrawDate, setDrawDate] = useState('');
    const [isChecked, setIsChecked] = useState(true); 

    const router = useRouter();

    const resetForm = () => {
        document.getElementById("my-form").reset();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!name || !mobile || !invoice_no || !invoice_amt || new Date(DrawDate) < new Date(invoice_date)) {
            if (!name || !mobile || !invoice_no || !invoice_amt) {
                toast.error("All fields are required", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })

                return;
            }

            if (new Date(DrawDate) < new Date(invoice_date)) {
                toast.error("Kindely change the Draw date. It should be more than Invoice date.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })

                return;
            }
        }



        try {
            const res = await axios.post('http://127.0.0.1:8000/api/form/', {
                Name: name,
                Mobile_No: mobile,
                Invoice_no: invoice_no,
                Invoice_date: invoice_date,
                Amount: invoice_amt,
                dr_date: DrawDate
            }, {

                headers: {
                    Authorization: `Token ${Cookies.get('token')}`,
                },


            });


            if (res.status === 201) {
                resetForm();
                toast.success('Form submitted successfully ', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            if (isChecked) { // Check if checkbox is checked
                router.push(`/coupon?id=${res.data.id}`); // Redirect to coupon page with data ID
                return;
            }



                return;
            }
            // if (err.response.status === 400) {
            //     toast.error(err.response.data.non_field_errors, {
            //       position: "top-center",
            //       autoClose: 5000,
            //       hideProgressBar: false,
            //       closeOnClick: true,
            //       pauseOnHover: true,
            //       draggable: true,
            //       progress: undefined,
            //       theme: "light",
            //   });
            //   }



        } catch (err) {

            toast.error("An error occurred while submitting form data.", {
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
            //   }

        }
    };



    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/date/drdate/1/', {

            headers: {
                Authorization: `Token ${Cookies.get('token')}`,
            },


        }).then(res => {
            setDrawDate(res.data.dr_date);
        })


    }, []);


    const handleSaveDrawDate = async () => {
        try {
            await axios.put('http://127.0.0.1:8000/api/date/drdate/1/', {
                dr_date: DrawDate,
            }, {
                headers: {
                    Authorization: `Token ${Cookies.get('token')}`,
                }
            })
                .then(res => {
                    toast.success("Draw date updated successfully", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })

        } catch (err) {
            console.error("Error saving Draw Date:", err);
            toast.error("An error occurred while saving Draw Date", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return <>
        <NavbarWithCookies />
        <ToastContainer />
        <div className="sm:px-5 lg:px-0 max-w-xl mt-32 mb-3 text-left max-h-screen mx-auto">
            <label htmlFor="example7" className="mb-1 block text-sm font-medium text-gray-700">Draw Date</label>
            <div className='flex gap-4'>

                <input type="date" name='DrawDate'
                    className="block w-xs sm:text-sm rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3 border border-slate-500"
                    placeholder="01/01/1991"
                    value={DrawDate}
                    onChange={(e) => setDrawDate(e.target.value)}
                />
                <button
                    className="rounded-md border border-green-600 bg-green-600 px-8 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-green-800 hover:bg-green-800 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300"
                    onClick={handleSaveDrawDate}
                >Save</button>
            </div>
        </div>





        <div className="sm:px-5 lg:px-0 mx-auto  max-w-xl ">
            <form onSubmit={handleSubmit} id="my-form" className="space-y-5 rounded-md border-t-4 border-green-500 p-4">
                <div>
                    <h1 className="text-[30px] font-semibold">Form</h1>
                </div>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-6 mb-3">
                        <label htmlFor="example7" className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="example7"
                            className="block sm:text-sm w-full rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3 border border-slate-500"
                            placeholder="John Doe"
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>
                    <div className="col-span-6 mb-3">
                        <label htmlFor="example8" className="mb-1 block text-sm font-medium text-gray-700">Mobile No.</label>
                        <input type="text" pattern="[1-9]{1}[0-9]{9}" id="example8"
                            className="block sm:text-sm w-full rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3 border border-slate-500"
                            placeholder="1234567890"
                            onChange={(e) => { setMobile(e.target.value) }}
                        />
                    </div>
                    <div className="col-span-12">
                        <label htmlFor="example9" className="mb-1 block text-sm font-medium text-gray-700">Invoice No.</label>
                        <input type="number" id="example9"
                            className="block sm:text-sm w-full rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3 border border-slate-500"
                            placeholder="2024-02/22/001"
                            onChange={(e) => { setInvoice_no(e.target.value) }}
                        />
                    </div>
                    <div className="col-span-6 mb-3">
                        <label htmlFor="example10" className="mb-1 block text-sm font-medium text-gray-700">Invoice Amount</label>
                        <input type="number" id="example10"
                            className="block sm:text-sm w-full rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3 border border-slate-500"
                            placeholder="5000"
                            onChange={(e) => { setInvoice_amt(e.target.value) }}
                        />
                    </div>

                    <div className="col-span-6 mb-3">
                        <label htmlFor="example10" className="mb-1 block text-sm font-medium text-gray-700">Invoice Date</label>
                        <input type="date" id="example10"
                            className="block sm:text-sm w-full rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-3 border border-slate-500"
                            placeholder="01/01/1991"
                            value={invoice_date}
                            onChange={(e) => setInvoiceDate(e.target.value)}
                        />
                    </div>

                    <div className="w-80">
                        <div className=" flex items-center space-x-2 rounded p-2 hover:bg-gray-100">
                            <input type="checkbox" id="example11" name="checkGroup1" className="h-4 w-4 rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400" 
                             checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)} // Toggle isChecked state
                            />
                            <label htmlFor="example10" className="mb-1 text-sm font-medium text-gray-700"> Print Coupon</label>
                        </div>
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

export default Form