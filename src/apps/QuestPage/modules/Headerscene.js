import * as THREE from 'three'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Plane, useAspect, useTexture } from '@react-three/drei'
import { EffectComposer, DepthOfField, Vignette } from '@react-three/postprocessing'


import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

// This material takes care of wiggling and punches a hole into
// alpha regions so that the depth-of-field effect can process the layers.
// Credit: Gianmarco Simone https://twitter.com/ggsimm

const LayerMaterial = shaderMaterial(
  { textr: null, movement: [0, 0, 0], scale: 1, factor: 0, wiggle: 0, time: 0 },
  ` uniform float time;
    uniform vec2 resolution;
    uniform float wiggle;
    varying vec2 vUv;
    varying vec3 vNormal;
    void main()	{
      vUv = uv;
      vec3 transformed = vec3(position);
      if (wiggle > 0.) {
        float theta = sin(time + position.y) / 2.0 * wiggle;
        float c = cos(theta);
        float s = sin(theta);
        mat3 m = mat3(c, 0, s, 0, 1, 0, -s, 0, c);
        transformed = transformed * m;
        vNormal = vNormal * m;
      }      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.);
    }`,
  ` uniform float time;
    uniform vec2 resolution;
    uniform float factor;
    uniform float scale;
    uniform vec3 movement;
    uniform sampler2D textr;
    varying vec2 vUv;
    void main()	{
      vec2 uv = vUv / scale + movement.xy * factor;
      vec4 color = texture2D(textr, uv);
      if (color.a < 0.1) discard;
      gl_FragColor = vec4(color.rgb, .1);
    }`,
)

extend({ LayerMaterial })


function Scene({ dof }) {
  const scaleHero = useAspect(2759, 1219, 1)
  const scaleW = useAspect(2200, 1000, 1)

  const textures = useTexture([desk, tris1, tris2])
  const subject = useRef()
  const group = useRef()
  const layersRef = useRef([])
  const [movement] = useState(() => new THREE.Vector3())
  const [temp] = useState(() => new THREE.Vector3())
  const [focus] = useState(() => new THREE.Vector3())
  const layers = [
   /*{ texture: textures[0], z: 0, factor: 0.005, scale: scaleW },
    { texture: textures[1], z: 10, factor: 0.005, scale: scaleW },
    { texture: textures[2], z: 0, scale: scaleW },*/
    { texture: textures[0], z: 30, ref: subject, scaleFactor: 0.9, scale: scaleHero },
    { texture: textures[1], x: 25, y: 20, factor: 0.1, scaleFactor: 0.7, z: 40, wiggle: 0.1, scale: scaleW },
    { texture: textures[2], x: 25, y: 20, factor: 0.04, scaleFactor: 0.7, z: 49, wiggle: 0.3, scale: scaleW },
  ]

  useFrame((state, delta) => {
    dof.current.target = focus.lerp(subject.current.position, 0.05)
    movement.lerp(temp.set(state.mouse.x, state.mouse.y * 0.2, 0), 0.2)
    // group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.mouse.x * 20, 0.2)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.mouse.y / 10, 0.2)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -state.mouse.x / 10, 0.2)
    layersRef.current[1].uniforms.time.value = layersRef.current[2].uniforms.time.value += delta
  }, 1)

  return (
    <group ref={group}>
      {layers.map(({ scale, texture, ref, factor = 0, scaleFactor = 1, wiggle = 0, x, y, z }, i) => (
        <Plane scale={scale} args={[1, 1, wiggle ? 10 : 1, wiggle ? 10 : 1]} position-x={x || 0} position-y={y || 0} position-z={z} key={i} ref={ref}>
          <layerMaterial movement={movement} textr={texture} factor={factor} ref={(el) => (layersRef.current[i] = el)} wiggle={wiggle} scale={scaleFactor} />
        </Plane>
      ))}
    </group>
  )
}


const Effects = React.forwardRef((props, ref) => {
  const { viewport: { width, height } } = useThree() // prettier-ignore
  return (
    <EffectComposer multisampling={0}>
      <DepthOfField ref={ref} bokehScale={4} focalLength={0.1} width={(width * 5) / 2} height={(height * 5) / 2} />
      <Vignette />
    </EffectComposer>
  )
})


export default function Headerscene() {
  const dof = useRef()
  return (
    <Canvas
      linear
      orthographic
      gl={{ antialias: true, stencil: false, alpha: true, depth: false }}
      camera={{ zoom: 5, position: [0, 0, 200], far: 300, near: 0 }}>
      <Suspense fallback={null}>
        <Scene dof={dof} />
      </Suspense>
      <Effects ref={dof} />
    </Canvas>
  )
}
