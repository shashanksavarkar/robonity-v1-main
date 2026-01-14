import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';

// This is our procedural robot arm model
function RobotArm() {
  const armColor = "#f0f0f0"; // A light gray
  
  return (
    <group rotation={[0, 0, 0]}>
      {/* Base */}
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.5, 32]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Arm Segment 1 */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.4, 1.5, 0.4]} />
        <meshStandardMaterial color={armColor} />
      </mesh>

      {/* Joint 1 */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="var(--primary-color)" />
      </mesh>

      {/* Arm Segment 2 (Forearm) */}
      <mesh position={[0, 1.9, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color={armColor} />
      </mesh>

      {/* Gripper Base */}
      <mesh position={[0, 2.55, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      
      {/* Gripper - Claw 1 */}
      <mesh position={[-0.15, 2.85, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshStandardMaterial color="var(--primary-color)" />
      </mesh>
      
      {/* Gripper - Claw 2 */}
      <mesh position={[0.15, 2.85, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshStandardMaterial color="var(--primary-color)" />
      </mesh>
    </group>
  );
}

// This is the main component to export
function RobotModel() {
  return (
    <Canvas 
      dpr={[1, 2]} // Sets pixel density
      camera={{ fov: 45, position: [3, 2, 5] }} // Camera setup
      shadows // Enable shadows
    >
      {/* <Stage> gives us nice studio lighting and centers the model.
        environment="city" gives it reflections.
        intensity={0.6} dims the lights a bit.
      */}
      <Stage environment="city" intensity={0.6}>
        <RobotArm />
      </Stage>
      
      {/* <OrbitControls> is what makes it interactive!
        enableZoom={false} stops the scroll wheel from zooming.
        autoRotate adds a slow, continuous spin.
      */}
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  );
}

export default RobotModel;