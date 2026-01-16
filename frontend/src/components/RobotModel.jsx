import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';

function RobotArm() {
  return (
    <group rotation={[0, 0, 0]}>
      <mesh position={[0, -0.75, 0]}><cylinderGeometry args={[0.7, 0.7, 0.5, 32]} /><meshStandardMaterial color="#333" /></mesh>
      <mesh position={[0, 0.25, 0]}><boxGeometry args={[0.4, 1.5, 0.4]} /><meshStandardMaterial color="#f0f0f0" /></mesh>
      <mesh position={[0, 1.1, 0]}><sphereGeometry args={[0.3, 32, 32]} /><meshStandardMaterial color="var(--primary-color)" /></mesh>
      <mesh position={[0, 1.9, 0]}><boxGeometry args={[0.3, 1.2, 0.3]} /><meshStandardMaterial color="#f0f0f0" /></mesh>
      <mesh position={[0, 2.55, 0]}><boxGeometry args={[0.5, 0.1, 0.5]} /><meshStandardMaterial color="#555" /></mesh>
      <mesh position={[-0.15, 2.85, 0]} rotation={[0, 0, 0.3]}><boxGeometry args={[0.1, 0.6, 0.1]} /><meshStandardMaterial color="var(--primary-color)" /></mesh>
      <mesh position={[0.15, 2.85, 0]} rotation={[0, 0, -0.3]}><boxGeometry args={[0.1, 0.6, 0.1]} /><meshStandardMaterial color="var(--primary-color)" /></mesh>
    </group>
  );
}

export default function RobotModel() {
  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 45, position: [3, 2, 5] }} shadows>
      <Stage environment="city" intensity={0.6}><RobotArm /></Stage>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  );
}