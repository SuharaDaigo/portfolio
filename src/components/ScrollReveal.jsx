import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function ScrollReveal({ children, y = 16, delay = 0 }){
  const controls = useAnimation();
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting){
        controls.start({ opacity: 1, y: 0, transition: { duration: .5, delay } });
        io.unobserve(el);
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [controls, delay]);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={controls}>
      {children}
    </motion.div>
  );
}
