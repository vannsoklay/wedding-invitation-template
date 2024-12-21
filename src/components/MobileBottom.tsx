import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { NavLink, useLocation } from "react-router";
import { useRef } from 'react';
import { useAutoScroll } from '../hooks/useAutoScroll';

const navItems = [
    { name: 'ពិធីមង្គលការ', not_active_icon: "solar:confetti-outline", active_icon: "solar:confetti-bold", href: '/' },  // Home
    { name: 'ទីតាំង', not_active_icon: "solar:map-point-wave-outline", active_icon: "solar:map-point-wave-bold", href: '/#location' },
    { name: 'វិចិត្រសាល', not_active_icon: "solar:gallery-circle-outline", active_icon: "solar:gallery-circle-bold", href: '/#gallery' },
    { name: 'ទំនាក់ទំនង', not_active_icon: "solar:phone-calling-rounded-outline", active_icon: "solar:phone-calling-rounded-bold", href: '/#contact' },
];

export default function MobileBottom() {
    const location = useLocation(); // Use useLocation hook to get current URL
    const sectionRef = useRef<HTMLElement>(null);
    // Extract hash from the current location (e.g., #location, #gallery)
    const { hash } = location;

    
    return (
        <nav className={`fixed bottom-0 left-0 right-0 z-50 bg-white backdrop-blur-sm shadow-lg ${hash === "" && 'hidden'}`}>
            <ul className="flex justify-around items-center h-20 px-4 md:px-8 max-w-3xl mx-auto">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <NavLink to={item.href} onClick={() => {
                            useAutoScroll({
                                targetRef: sectionRef,
                                options: { behavior: 'smooth', block: 'start' }
                            })
                        }} className="relative flex flex-col items-center group">
                            <span className="sr-only">{item.name}</span>
                            <motion.div
                                className="absolute -inset-2 rounded-full z-0"
                                initial={false}
                                animate={{ scale: hash === item.href.split('/')[1] ? 1 : 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className="relative z-10"
                            >
                                <Icon
                                    icon={hash === item.href.split('/')[1] ? item.active_icon : item.not_active_icon}
                                    fontSize={24}
                                    className={`transition-colors duration-200 ${hash === item.href.split('/')[1] ? 'text-red-600' : 'text-gray-500'}`}
                                />
                            </motion.div>
                            <span
                                className={`text-xs mt-1 ${hash === item.href.split('/')[1] ? 'text-red-600' : 'text-gray-500'} transition-colors duration-200`}
                            >
                                {item.name}
                            </span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
