import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useState } from 'react';

interface CategoryProps {
    children?: ReactNode;
    id: number;
    name: string;
    description: string;
    category: any;
    setCategory: any;
}
const CategoryCard = (props: CategoryProps) => {
    const { name, description, category, setCategory } = props;
    const [isInfo, setIsInfo] = useState(false);
    return (
        <button className='relative w-full h-full flex flex-col sm:flex-row justify-between items-center p-5 group' onClick={() => setCategory(name)}>
            <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform bg-accent border-[2px] border-black translate-x-1 translate-y-1 group-hover:-translate-x-0 group-hover:-translate-y-0" />
            {
                name !== category &&
                <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-accent" />
            }
            <span className="w-full relative text-black flex flex-row justify-between items-center">

                <h3 className='text-xl font-semibold'>{name}</h3>
                <FontAwesomeIcon
                    icon={faCircleInfo}
                    size='2x'
                    className='h-6 w-6'
                    onMouseEnter={() => setIsInfo(true)}
                    onMouseLeave={() => setIsInfo(false)} />
                {isInfo && <div className="w-full h-max absolute -top-[calc(100%_+_5rem)] -right-6 z-20 inline-block px-3 py-2 text-sm font-medium text-white bg-dark rounded-lg shadow-sm">
                    {description}
                </div>}
            </span>
        </button>
    );
};

export default CategoryCard;