import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import HamsterLoader from "../HamsterLoader";
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});
const SplineObject = (props:any) => {
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 550) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 550) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);
  return (
    <Suspense fallback={<HamsterLoader loaderTitle='3D Scene Loading'/>}>
      {isDesktop?(<Spline className="" scene={props.scene} />):<></>}
    </Suspense>
  );
};

Spline.propTypes = {};

export default SplineObject;