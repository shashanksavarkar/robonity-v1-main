/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Stars, Tube, Float } from '@react-three/drei';
import * as THREE from 'three';

const SteelMaterial = () => <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />;
const DarkMetalMaterial = () => <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.7} />;
const BrassMaterial = () => <meshStandardMaterial color="#f59e0b" metalness={1.0} roughness={0.15} envMapIntensity={1.5} />;
const ChromeMaterial = () => <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.0} envMapIntensity={2} />;
const TrackMaterial = () => <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.4} side={THREE.DoubleSide} />;
const EmissiveMaterial = ({ color, intensity }) => <meshStandardMaterial color={color} emissive={color} emissiveIntensity={intensity} toneMapped={false} />;

const Gear = ({ teeth = 12, radius = 1, width = 0.2, hole = 0.2, speed = 1, ...props }) => {
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        const step = (Math.PI * 2) / teeth;
        for (let i = 0; i < teeth; i++) {
            const a = i * step;
            const rInner = radius * 0.85;
            const rOuter = radius;
            s.lineTo(Math.cos(a) * rInner, Math.sin(a) * rInner);
            s.lineTo(Math.cos(a + step * 0.2) * rOuter, Math.sin(a + step * 0.2) * rOuter);
            s.lineTo(Math.cos(a + step * 0.8) * rOuter, Math.sin(a + step * 0.8) * rOuter);
        }
        s.lineTo(radius * 0.85, 0);
        const holePath = new THREE.Path();
        holePath.absarc(0, 0, hole, 0, Math.PI * 2, false);
        s.holes.push(holePath);
        return s;
    }, [teeth, radius, hole]);

    const extrudeSettings = { depth: width, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };
    const ref = useRef();
    useFrame((state) => {
        if (ref.current) ref.current.rotation.z = state.clock.getElapsedTime() * speed;
    });

    return (
        <group {...props}>
            <mesh ref={ref}>
                <extrudeGeometry args={[shape, extrudeSettings]} />
                <BrassMaterial />
            </mesh>
            <mesh position={[0, 0, -0.2]}>
                <cylinderGeometry args={[hole * 0.9, hole * 0.9, width + 0.5]} />
                <SteelMaterial />
            </mesh>
        </group>
    );
};

const Flywheel = ({ position, radius = 3, width = 0.5, speed = 0.5, ...props }) => {
    const ref = useRef();
    useFrame((state) => {
        if (ref.current) ref.current.rotation.z = state.clock.getElapsedTime() * speed;
    });
    return (
        <group position={position} {...props}>
            <mesh ref={ref}>
                <boxGeometry args={[radius * 2, 0.5, 0.5]} />
                <SteelMaterial />
            </mesh>
        </group>
    );
};

const Piston = ({ position, speed = 1, ...props }) => {
    const rodRef = useRef();
    useFrame((state) => {
        if (rodRef.current) {
            rodRef.current.position.y = Math.sin(state.clock.getElapsedTime() * speed) * 0.5;
        }
    });

    return (
        <group position={position} {...props}>
            <mesh position={[0, -0.5, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 1.5, 16]} />
                <DarkMetalMaterial />
            </mesh>
            <mesh ref={rodRef}>
                <cylinderGeometry args={[0.2, 0.2, 1.5, 16]} />
                <SteelMaterial />
                <mesh position={[0, 0.8, 0]}>
                    <boxGeometry args={[0.5, 0.1, 0.5]} />
                    <ChromeMaterial />
                </mesh>
            </mesh>
        </group>
    );
};

const Beam = ({ start, end, width = 0.1 }) => {
    const height = start.distanceTo(end);
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    const dir = new THREE.Vector3().subVectors(end, start).normalize();
    quaternion.setFromUnitVectors(up, dir);
    return (
        <mesh position={mid} quaternion={quaternion}>
            <boxGeometry args={[width, height, width]} />
            <DarkMetalMaterial />
        </mesh>
    );
};

const easeInQuad = (t) => t * t;
const easeOutQuad = (t) => t * (2 - t);

const MechanicalScene = () => {
    const ballRef = useRef();
    const screwRef = useRef();
    const liftHeight = 4.5;
    const liftRadius = 0.8;

    const screwCurve = useMemo(() => {
        const points = [];
        for (let i = 0; i <= 100; i++) {
            const t = i / 100;
            const angle = t * Math.PI * 8;
            const y = t * liftHeight - (liftHeight / 2);
            points.push(new THREE.Vector3(Math.cos(angle) * liftRadius, y, Math.sin(angle) * liftRadius));
        }
        return new THREE.CatmullRomCurve3(points);
    }, []);

    const topRailCurve = useMemo(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(-3, 2.3, 0),
        new THREE.Vector3(-1, 2.2, 0),
        new THREE.Vector3(1, 1.2, 0)
    ]), []);

    const bottomRailCurve = useMemo(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(2, -2.2, 0),
        new THREE.Vector3(0, -2.8, 0),
        new THREE.Vector3(-3, -2.2, -0.6)
    ]), []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const loopT = time % 10;
        let pos = new THREE.Vector3();

        if (loopT < 4) {
            const t = loopT / 4;
            const angle = t * Math.PI * 8;
            pos.set(-3 + Math.cos(angle) * 0.7, -2.2 + (t * 4.4), Math.sin(angle) * 0.7);
            if (screwRef.current) screwRef.current.rotation.y = -time * 2;
        } else if (loopT < 5.5) {
            const t = (loopT - 4) / 1.5;
            const easedT = easeInQuad(t);
            topRailCurve.getPointAt(easedT, pos);
        } else if (loopT < 7) {
            const t = (loopT - 5.5) / 1.5;
            if (t < 0.5) {
                const subT = t * 2;
                pos.lerpVectors(new THREE.Vector3(1, 1.2, 0), new THREE.Vector3(2, 0.2, 0), easeInQuad(subT));
            } else {
                const subT = (t - 0.5) * 2;
                pos.lerpVectors(new THREE.Vector3(2, 0.2, 0), new THREE.Vector3(2, -2.2, 0), subT);
                pos.x += Math.sin(subT * 20) * 0.05;
            }
        } else {
            const t = (loopT - 7) / 3;
            bottomRailCurve.getPointAt(easeOutQuad(t), pos);
        }

        if (ballRef.current) {
            ballRef.current.position.copy(pos);
            ballRef.current.rotation.x -= 0.1;
            ballRef.current.rotation.z -= 0.1;
        }
    });

    return (
        <group>
            <Flywheel position={[-5, 0, -4]} radius={5} speed={0.2} />
            <Flywheel position={[-5, 0, -3]} radius={3} speed={-0.3} />
            <Piston position={[-2, -3, -2]} speed={3} rotation={[0, 0, -0.2]} />
            <group position={[3, 0, 0]} scale={[0.85, 0.85, 0.85]}>
                <mesh ref={ballRef} position={[-3, -2, 0]}>
                    <sphereGeometry args={[0.25, 32, 32]} />
                    <ChromeMaterial />
                </mesh>
                <group position={[-3, 0, 0]}>
                    <group ref={screwRef}>
                        <mesh>
                            <cylinderGeometry args={[0.2, 0.2, 4.8, 16]} />
                            <SteelMaterial />
                        </mesh>
                        <Tube args={[screwCurve, 100, 0.05, 8, false]}>
                            <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
                        </Tube>
                    </group>
                    <group position={[0, 0, -0.8]}>
                        <Beam start={new THREE.Vector3(-0.8, -2.5, 0)} end={new THREE.Vector3(-0.8, 2.5, 0)} />
                        <Beam start={new THREE.Vector3(0.8, -2.5, 0)} end={new THREE.Vector3(0.8, 2.5, 0)} />
                        <Beam start={new THREE.Vector3(-0.8, 2.5, 0)} end={new THREE.Vector3(0.8, 2.5, 0)} />
                        <Beam start={new THREE.Vector3(-0.8, -2.5, 0)} end={new THREE.Vector3(0.8, -2.5, 0)} />
                    </group>
                </group>
                <group>
                    <Tube args={[topRailCurve, 30, 0.12, 8, false]}>
                        <TrackMaterial />
                    </Tube>
                    <Beam start={new THREE.Vector3(-1, 2.2, 0)} end={new THREE.Vector3(-1, -2, -1)} width={0.06} />
                    <Beam start={new THREE.Vector3(1, 1.2, 0)} end={new THREE.Vector3(1, -2, -0.5)} width={0.06} />
                </group>
                <group position={[2, 0, 0]}>
                    <Gear position={[0, 0.2, 0]} radius={1.2} teeth={16} width={0.3} speed={1} />
                    <Gear position={[-2, 0.2, 0]} radius={0.8} teeth={10} width={0.3} speed={-1.6} />
                    <Gear position={[0, -2.2, 0]} radius={1.4} teeth={18} width={0.3} speed={0.5} />
                    <mesh position={[0, -1, -0.4]}>
                        <boxGeometry args={[5, 6, 0.1]} />
                        <DarkMetalMaterial />
                    </mesh>
                    <mesh position={[1.5, 1.5, -0.3]}>
                        <circleGeometry args={[0.2, 32]} />
                        <EmissiveMaterial color="#0ea5e9" intensity={4} />
                    </mesh>
                </group>
                <group>
                    <Tube args={[bottomRailCurve, 40, 0.2, 8, false]}>
                        <TrackMaterial />
                    </Tube>
                    <Beam start={new THREE.Vector3(0, -2.8, 0)} end={new THREE.Vector3(0, -4, 0)} width={0.08} />
                </group>
            </group>
        </group>
    );
};

export default function Hero3D() {
    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, overflow: 'hidden' }}>
            <Canvas dpr={[1, 2]} shadows gl={{ alpha: true }} camera={{ position: [0, 0, 11], fov: 42 }}>
                <ambientLight intensity={0.4} />
                <spotLight position={[5, 10, 10]} angle={0.45} penumbra={0.5} intensity={200} distance={50} decay={2} color="#fff" castShadow shadow-mapSize={[1024, 1024]} />
                <pointLight position={[-5, 2, -5]} intensity={50} distance={20} decay={2} color="#3b82f6" />
                <pointLight position={[5, -2, 0]} intensity={40} distance={20} decay={2} color="#f59e0b" />
                <Float rotationIntensity={0.05} floatIntensity={0.1}>
                    <MechanicalScene />
                </Float>
                <ContactShadows resolution={1024} scale={20} blur={2.5} opacity={0.5} far={10} color="#000000" />
                <Environment preset="night" />
                <Stars radius={200} depth={60} count={7000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
}
