/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js';

/**
 * PCDModel is a component that renders a 3D model of a patient's point cloud data given a PCD file.
 */
const PCDModel = ({ modelPath = '../../../sampleModel.pcd' }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    let container = containerRef.current;
    let camera: THREE.Object3D<THREE.Event>, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
    let modelSize = 300;

    const getModelSize = () => {
        const windowSize = window.innerWidth;
        let size;

        if (windowSize < 640) { // if window size is less than 640px (small)
            size = 300; // set model size to 300
        } else if (windowSize < 768) { // if window size is less than 768px (medium)
            size = 400; // set model size to 400
        } else { // if window size is greater than or equal to 768px (large)
            size = 500; // set model size to 500
        }
        return size;
    }

    useEffect(() => {
        container = containerRef.current;

        const init = () => {
            // Init the renderer, scene and camera
            renderer = new THREE.WebGLRenderer({ antialias: true });
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.01, 40);
            modelSize = getModelSize();

            // Set up the rendered and add it to the dom
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(modelSize, modelSize);
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

            window.addEventListener('resize', onWindowResize);

        }

        const onWindowResize = () => {
            let newModelSize = getModelSize();
            // If the model size has changed, update the renderer
            if (newModelSize !== modelSize) {
                modelSize = newModelSize;
                renderer.setSize(modelSize, modelSize);
            }
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
