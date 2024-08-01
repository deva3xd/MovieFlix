import Profile from "@/images/profile.png";
import { Link } from "@inertiajs/react";

const Navbar = ({ user }) => {
    return (
        <div className="navbar bg-custom-primary px-8 py-3 fixed z-50">
            <div className="flex-1">
                <Link href={route('home')} className="text-xl p-0 font-extrabold text-white">CINETIX</Link>
            </div>
            <div className="flex-none">
                {user ? (
                    <>
                        <p className="mx-2">{user.name}</p>
                        <div className="dropdown dropdown-end">
                            <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={Profile} />
                                </div>
                            </div>
                            <ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <a href={route('profile.edit')}>Profile</a>
                                </li>
                                <li>
                                    <Link href={route('logout')} method="post" as="button">Logout</Link> {/* not recommended */}
                                </li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <a href={route('login')} className="btn btn-outline text-white rounded-full px-5 border-2">Sign In</a>
                )}
            </div>
        </div>
    )
}

export default Navbar;