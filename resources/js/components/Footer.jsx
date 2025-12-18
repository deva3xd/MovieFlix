import { Link, usePage } from "@inertiajs/react";

const Footer = () => {
    const { moviegenres, tvgenres } = usePage().props;

    return (
        <footer className="bg-black">
            <div className="max-w-screen-xl mx-auto">
                <div className="footer px-4 py-8 text-base-content">
                    <nav>
                        <h6 className="footer-title">Movie Genres</h6>
                        <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
                            {moviegenres.map((m) => (
                                <Link
                                    href={route("genre", {
                                        id: m.id,
                                    })}
                                    key={m.id} className="link link-hover"
                                >
                                    {m.name}
                                </Link>
                            ))}
                        </div>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Tv Genres</h6>
                        <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
                            {tvgenres.map((t) => (
                                <a key={t.id} className="link link-hover">{t.name}</a>
                            ))}
                        </div>
                    </nav>
                </div>
                <div className="border-t border-background w-full flex justify-center">
                    <span className="text-xs py-2">Complete in 2025</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;