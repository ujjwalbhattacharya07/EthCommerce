/* eslint-disable @next/next/no-img-element */
import { faCartShopping, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../..";
import {useAccount} from 'wagmi';

const PreviewTab = (props: any) => {
  const { hooks } = props;
  const { address } = useAccount();
  const { product, cover } = hooks;
  return (
    <div className='w-full h-full flex flex-col items-start bg-white'>
      <div className='w-full h-full flex flex-row justify-start items-center outline-dashed rounded-md'>
        {/* <div
          className='h-full w-3/5 block shrink justify-start items-center bg-contain bg-no-repeat border-r-2'
          style={{ backgroundImage: "url(/images/BlueGradient.png)" }}>
        </div> */}
        <img src={`https://ipfs.moralis.io:2053/ipfs/${ cover }`} alt="Product" className="w-1/3 h-full border-r-2 border-dashed object-contain" />
        <div
          className='w-full h-full flex flex-col justify-start items-start gap-5 p-5 text-black overflow-y-scroll'>
          <Button onClick={() => { }} className="w-full h-fit">
            <div className='relative flex flex-col items-start justify-start gap-5'>
              <div className='flex flex-row w-5/6 flex-wrap text-left'>
                <p className='text-4xl lg:text-6xl font-bold'>{product?.title}</p>
              </div>
              <h6 className="text-xl">Author: {address}</h6>
              <h4 className="text-5xl">$ {product?.price?.toFixed(2)}</h4>
            </div>
            <div className='absolute right-2 top-1 text-md font-bold flex flex-row justify-start items-center gap-2'>
              <FontAwesomeIcon icon={faCartShopping} className="w-6 h-6" />
              BUY NOW
            </div>
          </Button>
          <div className='flex flex-row flex-start gap-2 flex-wrap'>
            {
              product?.tags?.map((item: string) => {
                return (
                  <div className='flex flex-row justify-start items-centerflex flex-start gap-3 w-fit px-3 py-2 rounded-full border-2 border-black/50 bg-white hover:bg-accent' key={item}>
                    <FontAwesomeIcon
                      icon={faHashtag}
                      className='w-4 h-4'
                    />
                    <h1 className='font-bold'>{item}</h1>
                  </div>
                )
              })
            }
          </div>
          <h3 className='text-lg'>{product?.description}</h3>
        </div>
      </div>
    </div>
  )
}

export default PreviewTab