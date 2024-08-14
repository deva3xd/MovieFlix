import Profile from "@/images/profile.png";
import Cart from "@/images/cart.png";
import { Link } from "@inertiajs/react";

const Navbar = ({ user }) => {
    return (
        <div className="navbar bg-custom-primary px-8 py-3 fixed z-50 text-white container">
            <div className="flex-1">
                <Link href="#" className="text-xl p-0 font-extrabold">CINETIX</Link>
            </div>
            <div className="flex-1 justify-center">
                <Link href={route('home')} className="font-bold me-5 hover:text-gray-500">Home</Link>
            </div>
            <div className="flex-1 justify-end">
                {user ? (
                    <>
                        <Link href={route('cart')}>
                            <img src={Cart} className="w-6 me-2" />
                        </Link>
                        <div className="dropdown dropdown-end">
                            <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={Profile} />
                                </div>
                            </div>
                            <ul tabIndex="0" className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 rounded-tr-none rounded-box w-52">
                                <li>
                                    <Link href={route('profile.edit')}>Profile</Link>
                                </li>
                                <li>
                                    <Link href={route('logout')} method="post" as="button">Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <Link href={route('login')} className="btn btn-outline text-white rounded-full px-5 border-2">Sign In</Link>
                )}
            </div>
        </div>
    )
}

export default Navbar;