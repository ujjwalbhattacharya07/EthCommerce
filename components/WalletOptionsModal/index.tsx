import Image from "next/image";
import { useEffect } from "react";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";
import Button from "../Button";

interface Props {
  open: boolean;
  setOpen: (showWalletOptions: boolean) => void;
}

export default function WalletOptionsModal(props: Props) {
  const { open, setOpen } = props;

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { isConnected } = useAccount({});
  const { chain } = useNetwork();
  const { chains, pendingChainId, switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    isConnected && setOpen(false);
  }, [isConnected, setOpen]);

  return open ? (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          <div className="relative flex flex-col bg-white border-0 rounded-lg shadow-lg">
            <div className="flex items-center justify-around p-5 mb-4">
              <MdOutlineAccountBalanceWallet className="flex m-1 text-4xl" />
              <h3 className="text-3xl font-semibold text-left">
                Choose a Wallet
              </h3>
            </div>

            {connectors.map((connector) => (
              <div key={connector.id} className="mb-2 ml-2 mr-2 w-80">
                <Button
                  disabled={!connector.ready}
                  width={80}
                  onClick={() => {
                    connect({ connector });
                    switchNetwork?.(137);
                  }}
                >
                  <>
                    <div className="mr-3">
                      <Image
                        src={`/images/${connector.id}.svg`}
                        alt={connector.name}
                        height={32}
                        width={32}
                      />
                    </div>
                    {connector.name}
                    {!connector.ready && " (unsupported)"}
                    {isLoading &&
                      connector.id === pendingConnector?.id &&
                      " (connecting)"}
                  </>
                </Button>
              </div>
            ))}
            {error && (
              <div className="ml-2 text-red-500">
                {error?.message ?? "Failed to connect"}
              </div>
            )}
            <div className="flex items-center justify-end p-3 mt-1">
              <button
                className="px-6 py-2 mb-1 text-sm font-semibold text-red-500 uppercase"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  ) : null;
}
