import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import image from '../../public/coupon.svg'

import NavbarWithCookies from '@/components/Navbar'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useRouter } from 'next/router'
import { format, parseISO } from 'date-fns';


const Coupon = () => {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState('');
  const [formattedDrDate, setFormattedDrDate] = useState('');
  const [formattedInvoiceDate, setFormattedInvoiceDate] = useState('');



  useEffect(() => {
    if (id) {
      // fetch the record with the specified id from your server-side API endpoint
      axios.get('http://127.0.0.1:8000/api/form/' + id + '/', {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
        },
      })
        .then(res => {
          setData(res.data);

        });
    }
  }, [id]);

  useEffect(() => {
    if (id && data.dr_date) {
      const drDate = parseISO(data.dr_date);
      const formattedDrDate = format(drDate, 'dd-MM-yyyy')
      setFormattedDrDate(formattedDrDate);
    }

    if (id && data.Invoice_date) {
      const invoiceDate = parseISO(data.Invoice_date);
      const formattedInvoiceDate = format(invoiceDate, 'dd-MM-yyyy')
      setFormattedInvoiceDate(formattedInvoiceDate);
    }

  }, [id, data.dr_date, data.Invoice_date]);


  const handlePrint = () => {
    window.print();
    router.push("/form")
  };




  return <>

    <div className="no-print">
      <NavbarWithCookies />
    </div>


    <div className="table-container overflow-x-auto">
      <div id="printable-image" className=' mx-auto  w-[40rem] h-[30rem] mt-40 flex flex-col relative items-center justify-center '>
        <Image className='-rotate-90 w-[30rem] ' src={image} width={0} height={0} alt="coupon"/>
        <div className='absolute bottom-6 left-[4.5rem] text-center'>
          <div className=''>

            <h1 className='text-[#ff2e2d] text-xl font-bold'>{data.Token_id}</h1>
            <p className='text-[#ff2e2d] font-bold'>ड्रा दिनांक : {formattedDrDate}</p>
          </div>
        </div>

        <div className='absolute bottom-10 right-[4rem] text-center'>
          <div className='text-left'>
          
            <p className='text-[#ff2e2d] font-bold'>नाम: {data.Name}</p>
            <p className='text-[#ff2e2d] font-bold'>मो.नं.: {data.Mobile_No}</p>
            <p className='text-[#ff2e2d] font-bold'>इंवोईस नं.: {data.Invoice_no}</p>
            <p className='text-[#ff2e2d] font-bold'>इंवोईस दिनांक : {formattedInvoiceDate}</p>
            <p className='text-[#ff2e2d] font-bold'>ड्रा दिनांक : {formattedDrDate}</p>
          </div><br></br>
          <div className=''>
            <h1 className='text-[#ff2e2d] text-xl font-bold'>{data.Token_id}</h1> 
          </div>
        </div>

      </div>


    </div>

    <div className='flex items-center justify-center w-full mt-5 '>
      <button className="print-btn rounded-md bg-green-600 hover:bg-green-800 px-8 py-2.5 text-sm font-medium text-white shadow"
        onClick={handlePrint}
      >
        Print
      </button>

    </div>

  </>
}

export default Coupon