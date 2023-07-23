import { faHashtag, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import {
  Key,
  useRef,
  useState
} from "react";

const CustomizeTab = (props: any) => {
  const { hooks } = props;
  const { description, setDescription, setFile, tags, setTags, setLoading } = hooks;
  const [currDrop, setCurrDrop] = useState<string|undefined>();
  let fileInputRef = useRef<HTMLInputElement>(null);
  let tagInputRef = useRef<HTMLInputElement>(null);

  const uploading = async (e: any) => {
    const storage = new ThirdwebStorage();
    const url = await storage.upload(e);
    setFile(url?.split("//")[1]);
    setLoading(false);
    console.log(url);
  };

  return (
    <div className="w-full h-max flex flex-col justify-between items-start gap-5">
      <div className="w-full h-fit flex flex-col justify-start gap-3 items-start">
        <h2 className="text-xl font-bold">Brief Description</h2>
        <div className="relative w-full">
          <textarea
            id="item_name"
            rows={5}
            className="w-full sm:w-2/3 xl:w-1/2 rounded-md px-5 py-3 shadow-md shadow-accent border-2 border-black/50 border-t-accent border-l-accent focus:border-black/50 focus:border-b-accent focus:border-r-accent focus:outline-none text-light-font transition-all peer"
            value={description}
            required
            onInput={(event) =>
              setDescription((event.target as HTMLInputElement).value)
            }
          />
          <label
            htmlFor="item_name"
            className="absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 left-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-800 peer-focus:dark:text-blue-800 peer- peer-focus:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-valid:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 backdrop-blur-sm"
          >
            Product Description
          </label>
        </div>
      </div>

      {/* TODO: Description Editor Widget */}

      <div className="flex flex-col justify-start gap-3 w-full sm:w-2/3 xl:w-1/2">
        <label className="label">
          <h2 className="text-xl font-bold">Upload</h2>
        </label>
        <div className="w-full h-fit bg-white shadow-md shadow-accent flex justify-center items-center relative divide-y-2 divide-dashed">
          <label className="flex flex-col justify-center items-center w-full h-40 px-4 transition border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
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
              <span className="font-medium text-gray-600">
                Drop files to Attach, or{" "}
                <span className="text-blue-600 underline">browse</span>
              </span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              name="file_upload"
              className="hidden"
              onChange={(ev) => {
                setLoading(true);
                setCurrDrop(ev.target.files?.[0]?.name);
                uploading(ev.target.files?.[0]);
                console.log(ev.target.files?.[0]);
              }}
            />
          </label>
          {currDrop && (
            <div className="w-full absolute bottom-0 px-4 py-2 flex flex-row justify-center items-center gap-2">
              <FontAwesomeIcon
                icon={faXmark}
                size="2x"
                className="h-6 w-6"
                onClick={() => {
                  setFile(undefined);
                  setCurrDrop(undefined);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              />
              <span className="font-medium text-gray-600 truncate">
                {currDrop}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tags Input */}
      <div className="w-full h-fit flex flex-col justify-start gap-3 items-start">
        <h2 className="text-xl font-bold">Tag your Product</h2>
        <div className="flex flex-row flex-wrap gap-2">
          {tags.map(
            (
              item: any,
              i: Key | null | undefined
            ) => {
              return (
                <div
                  key={item}
                  className="flex flex-start gap-3 w-fit px-3 py-2 rounded-full border-2 border-black/50 bg-white hover:bg-accent"
                >
                  <div className="flex flex-row justify-start items-center">
                    <FontAwesomeIcon icon={faHashtag} className="w-4 h-4" />
                    <h1 className="font-bold">{item}</h1>
                  </div>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="w-6 h-6"
                    onClick={() =>
                      setTags(
                        tags.filter((val: any, idx: Key | null | undefined) => {
                          return idx !== i;
                        })
                      )
                    }
                  />
                </div>
              );
            }
          )}
          <div className="flex flex-row flex-start items-center w-fit px-3 py-2 rounded-full border-2 border-black/50 bg-white hover:bg-accent">
            <FontAwesomeIcon icon={faHashtag} className="w-4 h-4" />
            <input
              type="text"
              ref={tagInputRef}
              className="bg-transparent focus:outline-none font-semibold"
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  setTags([...tags, (event.target as HTMLInputElement).value]);
                  (event.target as HTMLInputElement).value = "";
                }
              }}
            />
          </div>
          <div
            className="p-2 rounded-full border-2 border-black/50 bg-white hover:bg-accent"
            onClick={() => {
              setTags([...tags, tagInputRef.current?.value!]);
              tagInputRef.current!.value = "";
              console.log(tags);
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeTab;
