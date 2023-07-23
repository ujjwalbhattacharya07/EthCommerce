import React, { ReactNode } from 'react';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface StatProps {
    children?: ReactNode;
    label?: string;
    desc?: string;
    value?: string | number;
}
const StatCard = (props: StatProps) => {
    const { label, desc, value } = props;
    const [isInfo, setIsInfo] = useState(false);
    return (
        <div className='w-full h-full relative flex flex-col justify-start items-start bg-white border-black border-2 rounded-md p-5 sm:px-10'>
            <div className='w-full h-full flex flex-col sm:flex-row justify-between items-center'>
                <h3 className='text-xl font-semibold'>{label}</h3>
                <FontAwesomeIcon
                    icon={faCircleInfo}
                    size='2x'
                    className='h-6 w-6'
                    onMouseEnter={() => setIsInfo(true)}
                    onMouseLeave={() => setIsInfo(false)} />
                {isInfo && <div className="w-2/3 max-w-full h-fit absolute -top-12 -right-6 z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-dark rounded-lg shadow-sm">
                    {desc}
                </div>}
            </div>
            <h1 className='text-7xl'>{value}</h1>
        </div>
    );
};

export default StatCard;