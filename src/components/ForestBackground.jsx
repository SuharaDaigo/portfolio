import { useEffect, useRef } from 'react';

export default function ForestBackground(){
  const ref = useRef(null);
  useEffect(()=>{
    // parallax on scroll (very light)
    const root = ref.current;
    const onScroll = () => {
      const y = window.scrollY;
      root.style.setProperty('--parallax', String(y * 0.03));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  },[]);
  return (
    <div ref={ref} aria-hidden
      style={{
        position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden'
      }}
    >
      <style>{`
        .fb-layer{position:absolute; inset:auto 0 0 0}
        .fb-mountains{height:40vh; background:
          radial-gradient(120px 60px at 10% 100%, #7fb07a, #6aa069 50%, transparent 52%),
          radial-gradient(160px 70px at 40% 100%, #78aa73, #629762 55%, transparent 57%),
          radial-gradient(140px 60px at 70% 100%, #7fb07a, #6aa069 50%, transparent 52%),
          radial-gradient(200px 80px at 95% 100%, #78aa73, #629762 55%, transparent 57%);
          filter: blur(0.4px);
          transform: translateY(calc(var(--parallax, 0px) * -1));
        }
        .fb-ground{height:18vh; background: linear-gradient(180deg,#b9d7a8,#95c389); box-shadow: 0 -8px 16px #00000014 inset}
        .fb-clouds{position:absolute; inset:0; top:5vh}
        .cloud{position:absolute; width:200px; height:70px; background:#fff8; border-radius:50px; filter: blur(0.5px); animation: drift 40s linear infinite}
        .cloud:before,.cloud:after{content:''; position:absolute; background:#fff8; border-radius:50px}
        .cloud:before{width:120px; height:90px; left:20px; top:-30px}
        .cloud:after{width:90px; height:60px; left:100px; top:-10px}
        .c1{left:-220px; animation-duration: 45s}
        .c2{left:-420px; top:8vh; animation-duration: 55s}
        .c3{left:-320px; top:14vh; animation-duration: 65s}
        @keyframes drift{from{transform:translateX(-10vw)} to{transform:translateX(110vw)}}
      `}</style>
      <div className="fb-layer fb-mountains"></div>
      <div className="fb-layer fb-ground"></div>
      <div className="fb-clouds">
        <div className="cloud c1"></div>
        <div className="cloud c2"></div>
        <div className="cloud c3"></div>
      </div>
    </div>
  );
}
