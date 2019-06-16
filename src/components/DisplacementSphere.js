import React, { useEffect, useRef, useContext } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import {
  Vector2, WebGLRenderer, PerspectiveCamera, Scene, DirectionalLight, AmbientLight,
  UniformsUtils, UniformsLib, ShaderLib, SphereBufferGeometry, Mesh, Color, ShaderMaterial
} from 'three';
import { Easing, Tween, autoPlay } from 'es6-tween';
import innerHeight from 'ios-inner-height';
import VertShader from '../shaders/sphereVertShader';
import FragmentShader from '../shaders/sphereFragmentShader';
import { media } from '../utils/styleUtils';
import { AppContext } from '../app/App';
import { usePrefersReducedMotion } from '../utils/hooks';

function DisplacementSphere() {
  const { currentTheme } = useContext(AppContext);
  const initialThemeRef = useRef(currentTheme);
  const width = useRef(window.innerWidth);
  const height = useRef(window.innerHeight);
  const start = useRef(Date.now());
  const container = useRef();
  const mouse = useRef();
  const renderer = useRef();
  const camera = useRef();
  const scene = useRef();
  const light = useRef();
  const ambientLight = useRef();
  const uniforms = useRef();
  const material = useRef();
  const geometry = useRef();
  const sphere = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const rand = Math.random();
    const containerElement = container.current;
    mouse.current = new Vector2(0.8, 0.5);
    renderer.current = new WebGLRenderer();
    camera.current = new PerspectiveCamera(55, width.current / height.current, 0.1, 5000);
    scene.current = new Scene();
    light.current = new DirectionalLight(initialThemeRef.current.colorWhite, 0.6);
    ambientLight.current = new AmbientLight(initialThemeRef.current.colorWhite, initialThemeRef.current.id === 'light' ? 0.8 : 0.1);

    uniforms.current = UniformsUtils.merge([
      UniformsLib['ambient'],
      UniformsLib['lights'],
      ShaderLib.phong.uniforms,
      { time: { type: 'f', value: 0 } },
    ]);

    material.current = new ShaderMaterial({
      uniforms: uniforms.current,
      vertexShader: VertShader,
      fragmentShader: FragmentShader,
      lights: true,
    });

    geometry.current = new SphereBufferGeometry(32, 128, 128);
    sphere.current = new Mesh(geometry.current, material.current);
    scene.current.background = new Color(initialThemeRef.current.colorBackground);
    renderer.current.setSize(width.current, height.current);
    camera.current.position.z = 52;
    light.current.position.z = 200;
    light.current.position.x = 100;
    light.current.position.y = 100;
    scene.current.add(light.current);
    scene.current.add(ambientLight.current);
    scene.current.add(sphere.current);
    sphere.current.position.z = 0;
    sphere.current.modifier = rand;
    containerElement.appendChild(renderer.current.domElement);

    return function cleanUp() {
      scene.current.remove(sphere.current);
      sphere.current.geometry.dispose();
      sphere.current.material.dispose();
      geometry.current.dispose();
      material.current.dispose();
      renderer.current.dispose();
      renderer.current.forceContextLoss();
      scene.current.dispose();
      camera.current = null;
      light.current = null;
      sphere.current = null;
      ambientLight.current = null;
      uniforms.current = null;
      renderer.current.context = null;
      renderer.current.domElement = null;
      containerElement.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    light.current = new DirectionalLight(currentTheme.colorWhite, 0.6);
    ambientLight.current = new AmbientLight(currentTheme.colorWhite, currentTheme.id === 'light' ? 0.8 : 0.1);
    scene.current.background = new Color(currentTheme.colorBackground);
  }, [currentTheme]);

  useEffect(() => {
    const onWindowResize = () => {
      const canvasHeight = innerHeight();
      const windowWidth = window.innerWidth;
      const fullHeight = canvasHeight + canvasHeight * 0.3;
      container.current.style.height = fullHeight;
      renderer.current.setSize(windowWidth, fullHeight);
      camera.current.aspect = windowWidth / fullHeight;
      camera.current.updateProjectionMatrix();

      if (prefersReducedMotion) {
        renderer.current.render(scene.current, camera.current);
      }

      if (windowWidth <= media.numMobile) {
        sphere.current.position.x = 14;
        sphere.current.position.y = 10;
      } else if (windowWidth <= media.numTablet) {
        sphere.current.position.x = 18;
        sphere.current.position.y = 14;
      } else {
        sphere.current.position.x = 22;
        sphere.current.position.y = 16;
      }
    };

    window.addEventListener('resize', onWindowResize);
    onWindowResize();

    return function cleanup() {
      window.removeEventListener('resize', onWindowResize);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const onMouseMove = event => {
      const mouseY = event.clientY / window.innerHeight;
      const mouseX = event.clientX / window.innerWidth;

      new Tween(sphere.current.rotation)
        .to({ x: mouseY / 2, y: mouseX / 2 }, 2000)
        .easing(Easing.Quartic.Out)
        .start();
    };

    if (!prefersReducedMotion) {
      autoPlay(true);
      window.addEventListener('mousemove', onMouseMove);
    }

    return function cleanup() {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    let animation;

    const animate = () => {
      animation = requestAnimationFrame(animate);
      uniforms.current.time.value = .00005 * (Date.now() - start.current);
      sphere.current.rotation.z += 0.001;
      renderer.current.render(scene.current, camera.current);
    };

    if (!prefersReducedMotion) {
      animate();
    } else {
      renderer.current.render(scene.current, camera.current);
    }

    return function cleanup() {
      cancelAnimationFrame(animation);
    };
  }, [prefersReducedMotion]);

  return (
    <SphereContainer aria-hidden ref={container} />
  );
}

const AnimBackgroundFade = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const SphereContainer = styled.div`
  position: absolute;
  width: 100vw;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  canvas {
    position: absolute;
    animation-duration: 3s;
    animation-timing-function: ${props => props.theme.curveFastoutSlowin};
    animation-fill-mode: forwards;
    animation-name: ${AnimBackgroundFade};
  }
`;

export default React.memo(DisplacementSphere);
