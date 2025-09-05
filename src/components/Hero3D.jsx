import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3D() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(2.2, 2.2, 3);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // soft light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(3, 5, 2);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    // simple low-poly like tree (cone + cylinder)
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.16, 0.8, 6),
      new THREE.MeshStandardMaterial({ color: 0x9c6b43, roughness: 0.9 })
    );
    trunk.position.y = 0.4;
    const crown = new THREE.Mesh(
      new THREE.ConeGeometry(0.8, 1.2, 7),
      new THREE.MeshStandardMaterial({ color: 0x72a24d, roughness: 0.8 })
    );
    crown.position.y = 1.4;
    const group = new THREE.Group();
    group.add(trunk); group.add(crown);
    scene.add(group);

    const onResize = () => {
      const w = mount.clientWidth; const h = mount.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize); ro.observe(mount);
    onResize();

    let raf = 0; const tick = () => {
      raf = requestAnimationFrame(tick);
      group.rotation.y += 0.005;
      renderer.render(scene, camera);
    }; tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
  style={{ width: '100%', aspectRatio: '1 / 1', minHeight: 320 }}
      ref={mountRef}
    />
  );
}
