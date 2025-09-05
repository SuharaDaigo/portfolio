import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingOverlay() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
    <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          style={{
      position: 'fixed', inset: 0, display: 'grid', placeItems: 'center',
      background: 'linear-gradient(180deg,#f3f8f1,#e8f2e3)',
      zIndex: 10,
      pointerEvents: 'none'
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ textAlign: 'center' }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '180px' }}
              transition={{ duration: 0.8 }}
              style={{
                height: 10, background: '#d6e9cc', borderRadius: 999,
                overflow: 'hidden', marginTop: 12, width: 180, border: '1px solid #0001'
              }}
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8 }}
                style={{ height: '100%', background: '#72a24d' }}
              />
            </motion.div>
            <div style={{ marginTop: 8, color: '#4c7a2e' }}>Now Loading...</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
