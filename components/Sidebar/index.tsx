/* eslint-disable @next/next/no-img-element */
import {
    faBoltLightning,
    faBook,
    faBox,
    faChartBar,
    faCog,
    faDollarSign,
    faFile,
    faQuestion,
    faSearch,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Sidebar() {
    const router = useRouter();
    const menu = [
        { label: 'QuickStart', icon: faBoltLightning, disabled: false },
        { label: 'Products', icon: faBox, disabled: false },
        { label: 'Posts', icon: faFile, disabled: true },
        { label: 'Audience', icon: faUsers, disabled: true },
        { label: 'Analytics', icon: faChartBar, disabled: true },
        { label: 'Payouts', icon: faDollarSign, disabled: true },
        { label: 'Discover', icon: faSearch, disabled: true },
        { label: 'Library', icon: faBook, disabled: true },
        { label: 'Help', icon: faQuestion, disabled: true },
        { label: 'Settings', icon: faCog, disabled: true },
    ]
    return (
        <div
            className='flex flex-col transition-all	ease-out duration-1000 w-20 hover:w-60 h-screen bg-black text-white divide-y divide-blue-200 overflow-hidden sticky top-0 left-0 z-10'>
            <div className='flex h-20 w-full justify-start items-center gap-3 py-2 pl-4 transition-none'>
                <img src={'/logo.png'} alt={"logo"} className='h-3/4 object-contain' />
                <h1 className='text-xl font-semibold'>EthCommerce</h1>
            </div>
            {menu.map(item => {
                return (
                    <div onClick={() => !item.disabled && router.push('/' + item.label.toLowerCase())} key={item.label}>
                        <div className={`flex justify-start items-center gap-5 py-4 px-8 ${item.disabled && 'text-light-button-gray/50'}`}>
                            <div className='pr-2'>
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    size='1x'
                                    className="w-5 h-5"
                                    color={`${item.disabled ? 'text-light-button-gray/50' : 'white'}`}
                                />
                            </div>
                            <h1 className='text-lg'>{item.label}</h1>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}