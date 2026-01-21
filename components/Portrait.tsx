
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  MeshDistortMaterial, 
  Sphere, 
  Float, 
  MeshWobbleMaterial, 
  Text,
  Environment,
  PresentationControls,
  ContactShadows,
  PerspectiveCamera,
  useCursor
} from '@react-three/drei';
import * as THREE from 'three';

interface PortraitProps {
  scrollProgress: number; // 0 to 10
}

const Portrait: React.FC<PortraitProps> = ({ scrollProgress }) => {
  const meshRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();
  const [hovered, setHovered] = React.useState(false);
  useCursor(hovered);

  // Smooth lerp values for scroll-based transformation
  useFrame((state) => {
    if (!meshRef.current) return;

    // SCROLL-DRIVEN TRANSFORMATIONS
    // Section 0-1: Hero (Centered)
    // Section 1-2: About (Right)
    // Section 2-4: Experience (Zigzag)
    // Section 4-6: Projects (Up/Small)
    // Section 6-10: Terminal/Skills/Final (Dimmed/Background)

    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetScale = 1.3;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let wireframe = false;
    let opacity = 1;

    if (scrollProgress < 1) {
      // Hero
      targetX = 0;
      targetScale = 1.5;
      targetRotationY = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    } else if (scrollProgress < 2) {
      // About
      targetX = viewport.width * 0.2;
      targetScale = 1.2;
      targetRotationY = -0.4;
    } else if (scrollProgress < 4) {
      // Experience
      const mod = Math.floor(scrollProgress) % 2;
      targetX = mod === 0 ? viewport.width * -0.2 : viewport.width * 0.2;
      targetScale = 1.0;
      targetRotationY = mod === 0 ? 0.4 : -0.4;
    } else if (scrollProgress < 6) {
      // Projects / Logic
      targetX = 0;
      targetY = viewport.height * 0.1;
      targetScale = 0.8;
      wireframe = scrollProgress > 4.5;
      opacity = wireframe ? 0.4 : 1;
    } else {
      // Skills / Terminal / Contact
      targetX = 0;
      targetY = -viewport.height * 0.1;
      targetScale = 0.7;
      targetZ = -2;
      opacity = 0.3;
    }

    // Apply eye tracking (cursor look) when in Hero or Contact
    if (scrollProgress < 1 || scrollProgress > 9) {
      const lookX = mouse.x * 0.3;
      const lookY = mouse.y * 0.2;
      targetRotationY += lookX;
      targetRotationX -= lookY;
    }

    // Lerp smooth movement
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.05);
    
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.05));
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.05);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.05);

    // Subtle breathing animation
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.02;

    if (headRef.current && headRef.current.material instanceof THREE.MeshStandardMaterial) {
      headRef.current.material.wireframe = wireframe;
      headRef.current.material.opacity = THREE.MathUtils.lerp(headRef.current.material.opacity, opacity, 0.05);
      headRef.current.material.transparent = true;
    }
  });

  return (
    <group ref={meshRef}>
      {/* 3D PORTRAIT BUST PLACEHOLDER - Stylized as a futuristic head */}
      <mesh 
        ref={headRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#00f2ff"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.9}
            emissive="#0066ff"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </mesh>
      
      {/* Decorative Rim Light Glow Rings */}
      <group scale={[1.1, 1.1, 1.1]} rotation={[0, 0, Math.PI / 4]}>
        <mesh>
          <torusGeometry args={[1.2, 0.01, 16, 100]} />
          <meshBasicMaterial color="#00f2ff" transparent opacity={0.3} />
        </mesh>
      </group>

      <ContactShadows
        opacity={0.4}
        scale={10}
        blur={2.4}
        far={10}
        resolution={256}
        color="#000000"
      />
    </group>
  );
};

export default Portrait;
