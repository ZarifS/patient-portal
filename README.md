This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Project Information

NextJS Portal to see patient data and 3D visualizations

Assignment
Building a Basic Patient Information Dashboard with a 3D Visualizer

Objective
Create a single-page application (SPA) using React JS that presents patient data, fetched from an API, in a visually clear and user-friendly manner. Additionally, the application should include a 3D visualizer using Three.js to display patient point cloud data.

Task
Create a mock API or use JSON placeholder: Create a JSON file to simulate the responses an API would send for a user's basic info, video upload status, scoliosis prediction status, and point cloud data. This should include fields like name, age, gender, videoUploadStatus, scoliosisPredictionStatus, and pointCloudData. If you prefer, you can use an API placeholder like My JSON Server to host your mock data.

Fetch and display data: Write a React component that fetches this data and displays the basic patient information in an organized manner on the page. Make sure to handle loading and error states appropriately.

3D Point Cloud Visualization: Using the fetched pointCloudData and Three.js (library), create a 3D point cloud visualization that displays when a user selects a patient. You can use React-Three-Fiber, a React renderer for Three.js, to integrate this into your React application.

Interactivity and updates: Add a feature where a user can manually refresh the videoUploadStatus, scoliosisPredictionStatus, and pointCloudData for a specific patient. The feature should be designed in a way that users can clearly see whether the data is being fetched or if an error has occurred.

Styling and responsiveness: Make the application responsive so that it maintains its layout on different screen sizes. Use Tailwind for basic styling.

See this website for mock pcd data: https://www.dwsamplefiles.com/download-pcd-sample-files/