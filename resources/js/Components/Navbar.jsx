import { Link } from "@inertiajs/react";
import Profile from "@/images/profile.png";

const Navbar = ({ user }) => {
    return (
        <div className="navbar bg-custom-primary px-8 py-3 fixed z-50">
            <div className="flex-1">
                <p className="text-xl p-0 font-extrabold text-white">CINETIX</p>
            </div>
            <div className="flex-none">
                {user ? (
                    <>
                        <p className="mx-2">{user.name}</p>
                        <div class="dropdown dropdown-end">
                            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                                <div class="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={Profile} />
                                </div>
                            </div>
                            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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