"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdConstruction } from "react-icons/Md";
import classNames from "classnames";
import ProjectSelector from "./ProjectSelector";

const Navbar = () => {
    const currentPath = usePathname();

    const links = [
        { label: "Dashboard", href: "/" },
        // { label: "Projects", href: "/projects" },
    ];
    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-20 items-center">
            <Link href="/">
                <MdConstruction size={30} />
            </Link>
            <ul className="flex space-x-6 items-center">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            key={link.href}
                            className={classNames({
                                "text-white": link.href === currentPath,
                                "text-gray-400 hover:text-white transition-colors":
                                    true,
                            })}
                            href={link.href}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
                <ProjectSelector />
            </ul>
        </nav>
    );
};

export default Navbar;
