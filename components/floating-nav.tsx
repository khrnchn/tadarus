"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Bell, DollarSign, Home, Menu, Settings, User, X } from "lucide-react"
import { useRouter } from "next/navigation"
import * as React from "react"

const menuItems = [
    { icon: Home, label: "home", color: "#FF6B6B", path: "/dashboard" },
    { icon: User, label: "tadarus", color: "#4ECDC4", path: "/dashboard/tadarus" },
    { icon: DollarSign, label: "zakat", color: "#45B7D1", path: "/dashboard/zakat" },
    { icon: Bell, label: "daily planner", color: "#FFA07A", path: "/dashboard/daily-planner" },
    { icon: Settings, label: "settings", color: "#98D8C8",  path: "/dashboard/settings" },
]

export default function FloatingNav() {
    const [isOpen, setIsOpen] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === 'm') {
                setIsOpen(prevState => !prevState)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute bottom-20 right-0 flex flex-wrap justify-end gap-4 w-[300px] pb-4"
                    >
                        {menuItems.map((item, index) => (
                            <motion.button
                                key={item.label}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-center p-4 text-black font-bold rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                                style={{
                                    backgroundColor: item.color,
                                    border: "3px solid black",
                                }}
                                onClick={() => router.push(item.path)}
                            >
                                <item.icon className="w-6 h-6 mr-2" />
                                {item.label}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex items-center justify-center w-20 h-20 bg-yellow-400 text-black rounded-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
                {isOpen ? (
                    <X className="w-10 h-10" />
                ) : (
                    <Menu className="w-10 h-10" />
                )}
                <div className="absolute -top-2 -left-2 bg-black text-white text-xs font-extrabold py-1 px-2 rounded-full">
                    M
                </div>
            </motion.button>
        </div>
    )
}