This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Make sure you have Node 18 or higher running on your machine. 

Install dependencies first by going to the root of the project and running:
```bash
npm run install
```

Then to run the app:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Testing and Linting
I have written some basic tests using Jest and React Testing Library. To run the tests, run:
```bash
npm run test
```

Linting is pre-configured per NextJS bootstrap, to run lints run:
```bash
npm run lint
```

## Project Information

NextJS Portal to see patient data and 3D visualizations render.

### Assignment
Building a Basic Patient Information Dashboard with a 3D Visualizer

### Objective
Create a single-page application (SPA) using React JS that presents patient data, fetched from an API, in a visually clear and user-friendly manner. Additionally, the application should include a 3D visualizer using Three.js to display patient point cloud data.

### Task
Create a mock API or use JSON placeholder: Create a JSON file to simulate the responses an API would send for a user's basic info, video upload status, scoliosis prediction status, and point cloud data. This should include fields like name, age, gender, videoUploadStatus, scoliosisPredictionStatus, and pointCloudData. If you prefer, you can use an API placeholder like My JSON Server to host your mock data.

Fetch and display data: Write a React component that fetches this data and displays the basic patient information in an organized manner on the page. Make sure to handle loading and error states appropriately.

3D Point Cloud Visualization: Using the fetched pointCloudData and Three.js (library), create a 3D point cloud visualization that displays when a user selects a patient. You can use React-Three-Fiber, a React renderer for Three.js, to integrate this into your React application.

Interactivity and updates: Add a feature where a user can manually refresh the videoUploadStatus, scoliosisPredictionStatus, and pointCloudData for a specific patient. The feature should be designed in a way that users can clearly see whether the data is being fetched or if an error has occurred.

Styling and responsiveness: Make the application responsive so that it maintains its layout on different screen sizes. Use Tailwind for basic styling.