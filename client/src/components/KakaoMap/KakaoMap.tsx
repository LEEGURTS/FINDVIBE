import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap: React.FunctionComponent = () => {
  useEffect(() => {
    let script: HTMLScriptElement | null = document.querySelector(
      'script[src= "//dapi.kakao.com/v2/maps/sdk.js?appkey=862e79b778411e9f2faccefffd350d80&autoload=false"]'
    );

    if (!script) {
      script = document.createElement("script");
      script.async = true;
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=862e79b778411e9f2faccefffd350d80&autoload=false";

      document.head.appendChild(script);
    }

    const handleLoad = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("kakaomap");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 5,
        };
        new window.kakao.maps.Map(container, options);
      });
    };
    script.addEventListener("load", handleLoad);
    return () => script!.removeEventListener("load", handleLoad);
  }, []);

  return <div id="kakaomap" className="col-start-7 col-end-13 h-[50vh]"></div>;
};

export default KakaoMap;
