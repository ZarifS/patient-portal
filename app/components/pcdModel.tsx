/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js';

const PCDModel = ({ width = 500, height = 500, modelPath = '../../../sampleModel.pcd' }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    let container = containerRef.current;
    let camera: THREE.Object3D<THREE.Event>, scene: THREE.Scene, renderer: THREE.WebGLRenderer;

    useEffect(() => {
        container = containerRef.current;

        const init = () => {
            // Init the renderer, scene and camera
            renderer = new THREE.WebGLRenderer({ antialias: true });
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.01, 40);

            // Set up the rendered and add it to the dom
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);
            container?.appendChild(renderer.domElement);

            // Set up the camera and add it to the scene
            camera.position.set(0, 0, 1);
            scene.add(camera);

            // Set up the controls to allow user to control the model
            const controls = new OrbitControls(camera as THREE.Camera, renderer.domElement);
            controls.minDistance = 0.5;
            controls.maxDistance = 10;

            // Load up the actual model
            const loader = new PCDLoader();
            loader.load(modelPath, function (points) {
                // Center all the points and rotate them to be on center
                points.geometry.center();
                points.geometry.rotateX(Math.PI);
                points.name = 'PCD Model';
                // Add all the points to our scene
                scene.add(points);
            });
        }

        const animate = () => {
            // Update the render each time the screen is refreshed
            requestAnimationFrame(animate);
            renderer.render(scene, camera as THREE.PerspectiveCamera);
        }

        // On mount, initialize the scene and animate it
        init();
        animate();

        // On unmount, clears the scene and removes from dom
        return () => {
            while (containerRef?.current?.firstChild) {
                containerRef.current.firstChild.remove();
            }
        };
    }, []);

    return (
        <div ref={containerRef} />
    )
}

export default PCDModel;
