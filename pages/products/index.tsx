import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';
import absoluteUrl from 'next-absolute-url';
import { useState } from 'react';
import NewPdtBtn from '../../components/Products/NewPdtBtn/index';
import ProductRow from '../../components/Products/ProductRow';
import StatCard from '../../components/Products/StatCard';
import { statsData } from '../api/stats';

const MyProducts: NextPage = ({ productsData }: any) => {
    const [products] = useState(productsData);
    const [stats] = useState(statsData);
    const [baseIdx, setBaseIdx] = useState(0);
    const columns = [
        { id: "position", label: "Sl No." },
        { id: "title", label: "Title" },
        { id: "price", label: "Price" },
        { id: "status", label: "Status" },
    ];
    return (
        <div className='w-full h-full flex flex-col justify-evenly items-center gap-10 p-10 relative'>
            <div className='w-full h-fit flex flex-col justify-start gap-10 items-center sticky top-6 z-20'>
                <h1 className='w-full text-5xl font-bold'>
                    My Products
                </h1>
            </div>
            <div className='w-full h-full flex flex-col sm:flex-row justify-end items-center'>
                <NewPdtBtn />
            </div>
            <div className='w-full h-40 flex justify-evenly items-center gap-5'>
                {
                    stats.map(item => {
                        return <StatCard key={item.label} {...item} />
                    })
                }
            </div>
            <div className='w-full h-full flex flex-col justify-start items-center gap-0 divide-y-2 divide-slate-300 relative shadow-md sm:rounded-lg'>
                <table className='w-full h-full table overflow-auto table-auto text-sm text-left bg-white text-black'>
                    <thead className="table-header-group text-xl">
                        <tr className='table-row'>
                            {columns.map((column) => (
                                <th
                                    scope="col"
                                    className="table-cell text-left px-6 py-3 bg-black text-white font-semibold tracking-wider"
                                    key={column.id}
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {products.slice(baseIdx, baseIdx + 5).map((item: any, idx: any) => {
                            return <ProductRow key={item._id} idx={baseIdx + idx} {...item} />
                        })}
                    </tbody>
                </table>
                <div className='w-full flex flex-row justify-between items-center px-10 py-2 gap-5 bg-white'>
                    <div className='w-fit h-full flex flex-row justify-start items-center'>
                        <h3 className='text-base'>Showing {baseIdx} to {Math.min(baseIdx + 5, products.length)} of {products.length} entries</h3>
                    </div>
                    <div className='w-fit h-full flex flex-row justify-end items-center divide-x-2'>
                        <div
                            className='w-fit h-full flex flex-row justify-around gap-2 items-center px-4'
                            onClick={() => baseIdx >= 5 && setBaseIdx(baseIdx - 5)}>
                            <FontAwesomeIcon icon={faChevronCircleLeft} className='h-6 w-6' />
                            <h5 className='text-base'>Newer</h5>
                        </div>
                        <div
                            className='w-fit h-full flex flex-row justify-around gap-2 items-center px-4'
                            onClick={() => baseIdx < products.length - 5 && setBaseIdx(baseIdx + 5)}>
                            <h5 className='text-base'>Older</h5>
                            <FontAwesomeIcon icon={faChevronCircleRight} className='h-6 w-6' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({req}:any) {
    const {origin} = absoluteUrl(req);
    try {
        let res = await fetch(`${ origin }/api/products`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        let products = await res.json();

        return {
            props: { productsData: JSON.parse(JSON.stringify(products.data))},
        };
    } catch (e) {
        console.error(e);
    }
}

export default MyProducts;