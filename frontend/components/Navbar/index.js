import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { withCookies } from 'react-cookie';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'



const Navbar = ({ cookies }) => {
    const [user, setUser] = useState({});
    const [isScrolled, setIsScrolled] = useState(false);

    const router = useRouter();
    const isLoginPage = router.pathname === '/';
    const isRegisterPage = router.pathname === '/register';
    const isAdminPage = router.pathname === '/admin'

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    useEffect(() => {
        const handleScroll = () => {
            // Check if the page is scrolled
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Listen to scroll event
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = cookies.get('token');
                if (!token) {
                    return;
                }
                const config = {

                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
                const res = await axios.get('http://127.0.0.1:8000/api/user/', config)
                setUser(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser()

    }, [cookies]);




    const Logout = async () => {
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
            cookies.remove('token')
            router.push('/');

        } catch (err) {
            console.log(err);
        }
    }




    return <>
        <header id="navbar" className={`bg-white fixed top-0 left-0 right-0 z-50 ${isScrolled ? '' : ''}`} >

            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 shadow-md gap-5">
                <div className="flex lg:h-16 items-center justify-between sm:h-24">
                    <div className="md:flex md:items-center md:gap-12">
                        <Link className="block text-teal-600" href="/form">
                            <span className="sr-only">Home</span>
                            <h1 className='text-2xl text-green-500 font-bold sm:text-xl'>Samruddhi Mega</h1>
                        </Link>
                    </div>




                    {!isLoginPage && (
                        <div className="lg:flex-row flex lg:items-center lg:gap-4 sm:flex-col sm:justify-between sm:items-end sm:gap-3 my-4">

                            <Menu as="div" className="relative inline-block text-left ">
                                <div className=''>
                                    <Menu.Button className="sm:truncate inline-flex w-full sm:text-sm justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        {user.email}
                                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">

                                            {router.pathname !== '/deleteRecord' ? (

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href="/deleteRecord"
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            Deleted Record
                                                        </Link>
                                                    )}
                                                </Menu.Item>


                                            ) : (
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href="/form"
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            Generate new coupon
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            )}


                                            { isRegisterPage? (
                                                <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href="/form"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Generate New Coupon
                                                    </Link>
                                                )}
                                                </Menu.Item>
                                            ):(
                                                <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href="/register"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Register
                                                    </Link>
                                                )}
                                                </Menu.Item>
                                            )}
                                        


                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={Logout}
                                                        type="submit"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block w-full px-4 py-2 text-left text-sm text-red-500'
                                                        )}
                                                    >
                                                        Logout
                                                    </button>
                                                )}
                                            </Menu.Item>

                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <div className=" sm:px-2">
                                {!isAdminPage ? (
                                    <Link
                                        className="rounded-md bg-green-600 hover:bg-green-800 px-5 py-2.5 text-sm sm:text-xs font-medium text-white shadow"
                                        href="/admin"
                                    >
                                        Admin
                                    </Link>
                                ) : (
                                    <Link
                                        className="rounded-md bg-green-600 hover:bg-green-800 px-5 py-2.5 text-sm font-medium text-white shadow sm:text-xs"
                                        href="/form"
                                    >
                                        Generate new coupon
                                    </Link>
                                )}
                            </div>


                        </div>
                    )}
                </div>
            </div>
        </header>
    </>
}

const NavbarWithCookies = withCookies(Navbar);

export default NavbarWithCookies;