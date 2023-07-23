import Head from "next/head";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { Button, MenuDropdown, WalletOptionsModal } from "..";
import Sidebar from "../Sidebar";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const { address, isConnected } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })
  const { disconnect } = useDisconnect()

  const renderLabel = () => {
    if (ensAvatar) {
      return (
        <>
          <div className="relative w-8 h-8 mr-2">
            {ensAvatar ? (
              <Image
                src={ensAvatar}
                alt="ENS Avatar"
                fill
                className="rounded-full"
              />
            ) : (
              <Image
                src="/images/black-gradient.png"
                alt="ENS Avatar"
                fill
                className="rounded-full"
              />
            )}
          </div>
          <span className="truncate max-w-[100px]">
            {ensName}
          </span>
        </>
      );
    }

    return (
      <span className="truncate max-w-[108px]">{address}</span>
    );
  };

  const renderButton = () => {
    if (isConnected) {
      return (
        <MenuDropdown
          label={renderLabel()}
          options={[{ label: "Disconnect", onClick: disconnect }]}
        />
      );
    }

    return (
      <Button
        loading={showWalletOptions}
        onClick={() => setShowWalletOptions(true)}
      >
        Connect
      </Button>
    );
  };

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>NextJS wagmi</title>
        <meta name="description" content="NextJS and wagmi template" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WalletOptionsModal
        open={showWalletOptions}
        setOpen={setShowWalletOptions}
      />

      <div className="absolute w-full z-50">
        <div className="flex items-center justify-end px-10 py-5">
          {renderButton()}
        </div>
      </div>

      <div className='w-full h-full flex flex-row justify-start items-center relative overflow-x-hidden'>
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
