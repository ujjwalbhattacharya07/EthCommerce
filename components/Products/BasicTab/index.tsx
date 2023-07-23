import { useEffect, useState } from 'react';
import { categoryData } from '../../../pages/api/category';
import CategoryCard from '../../CategoryCard';
import { productsData } from '../../../pages/api/pdts';
import { ThirdwebStorage } from '@thirdweb-dev/storage';

const BasicTab = (props: any) => {
  const [categories] = useState(categoryData);
  const { hooks } = props;
  const { name, setName, cover, setCover, category, setCategory, price, setPrice, supply, setSupply, setLoading } = hooks;

  const uploading = async (e: any) => {
    console.log(e);
    const storage = new ThirdwebStorage();
    const url = await storage.upload(e);
    setCover(url?.split("//")[1]);
    setLoading(false);
    console.log(url);
  };

  return (
    <div className='w-full h-max flex flex-col justify-between items-start gap-5'>
      <div className='w-full h-full flex flex-col sm:flex-row justify-start gap-5 items-center'>
        <div className='w-fit h-fit flex flex-col justify-start gap-3 items-start'>
          <h2 className='text-xl font-bold'>Product Name</h2>
          <div className='relative'>
            <input
              id='item_name'
              type='text'
              className='w-full sm:w-80 h-20 rounded-md px-5 py-3 shadow-md shadow-accent border-2 border-black/50 border-t-accent border-l-accent focus:border-black/50 focus:border-b-accent focus:border-r-accent focus:outline-none text-light-font transition-all peer'
              required
              onInput={(event) => setName((event.target as HTMLInputElement).value)} value={name} />
            <label
              htmlFor="item_name"
              className="absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 left-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-800 peer-focus:dark:text-blue-800 peer- peer-focus:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-valid:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 backdrop-blur-sm">
              Name
            </label>
          </div>
        </div>
        <div className='w-fit h-fit flex flex-col justify-start gap-3 items-start'>
          <h2 className='text-xl font-bold'>Cover Picture</h2>
          <div className='relative'>
            <div className="w-full h-fit bg-white shadow-md shadow-accent flex justify-center items-center relative divide-y-2 divide-dashed">
              <label className="flex flex-col justify-center items-center w-full h-20 px-4 transition border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <div className="w-full h-full flex flex-row justify-center items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  {!cover ?
                    <span className="font-medium text-gray-600">
                      Drop files, or{" "}
                      <span className="text-blue-600 underline">browse</span>
                    </span>
                    :
                    <span>
                      Drop/<span className="text-blue-600 underline">Browse</span> to Replace
                    </span>
                  }
                </div>
                <input
                  type='file'
                  className='hidden'
                  accept="image/*"
                  required
                  onChange={(event) => {
                    setLoading(true);
                    uploading(event.target.files?.[0]);
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-full flex flex-col justify-start gap-3 items-start'>
        <h2 className='text-xl font-bold'>Type</h2>
        <fieldset className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
          {categories.map(item => {
            return (
              <CategoryCard key={item.id} {...item} category={category} setCategory={setCategory} />
            )
          })}
        </fieldset>
      </div>
      <div className='w-full h-full flex flex-col sm:flex-row justify-start gap-5 items-center'>
        <div className='w-fit h-full flex flex-col justify-start gap-3 items-start'>
          <h2 className='text-xl font-bold'>Price</h2>
          <div className='w-full'>
            <div
              id='item_name'
              className='w-full bg-white sm:w-80 h-12 rounded-md px-5 py-3 shadow-md shadow-accent border-2 border-black/50 border-t-accent border-l-accent focus-within:border-black/50 focus-within:border-b-accent focus-within:border-r-accent focus-within:outline-none text-light-font transition-all flex justify-start items-center gap-3'>
              <span className='text-xl font-bold'>$</span>
              <input
                type='number'
                min={0.00}
                step={0.01}
                className='w-full outline-none'
                placeholder='Amount'
                required
                onInput={(event) => setPrice(parseFloat((event.target as HTMLInputElement).value))}
                value={price} />
            </div>
          </div>
        </div>
        <div className='w-fit h-full flex flex-col justify-start gap-3 items-start'>
          <h2 className='text-xl font-bold'>Supply</h2>
          <div className='w-full'>
            <div
              id='item_name'
              className='w-full sm:w-80 h-12 bg-white rounded-md px-5 py-3 shadow-md shadow-accent border-2 border-black/50 border-t-accent border-l-accent focus-within:border-black/50 focus-within:border-b-accent focus-within:border-r-accent focus-within:outline-none text-light-font transition-all flex justify-start gap-3'>
              <input
                type='number'
                className='w-full outline-none'
                placeholder='Supply'
                required
                onInput={(event) => setSupply(parseInt((event.target as HTMLInputElement).value))}
                value={supply} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicTab