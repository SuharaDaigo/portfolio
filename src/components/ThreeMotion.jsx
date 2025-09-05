import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeMotion() {
    const ref = useRef(null);

    useEffect(() => {
        // lightweight use of three.js to ensure package is included and works client-side
        const v = new THREE.Vector3(1, 2, 3);
        // no heavy rendering here; real projects should attach a WebGL renderer to the DOM
        return () => {
            // cleanup if needed
        };
    }, []);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ padding: '1rem', fontFamily: 'system-ui, sans-serif' }}
        >
            React component (three.js and framer-motion available)
        </motion.div>
    );
}
