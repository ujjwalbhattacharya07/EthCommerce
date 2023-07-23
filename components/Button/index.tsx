import { Loader } from "..";

interface Props {
  children: any;
  width?: number;
  color?: string;
  loading?: boolean;
  [x: string]: any;
  className?: string;
}

export default function Button(props: Props) {
  const { children, width, color = "accent", loading = false, className = "", ...rest } = props;

  return (
    <div
      className={`items-center justify-center h-fit font-semibold relative inline-block p-4 z-1 group ${width && `w-${width}`} ${loading && "cursor-not-allowed opacity-50"} ${className}`}
      {...rest}>
      <span className={`absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-${color} border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0`}></span>
      <span className={"absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-"+color}></span>
      <span className="relative text-black flex flex-row justify-start gap-5 px-5 items-center">{children} {loading && <Loader size={5} />}</span>

    </div>
  );
}