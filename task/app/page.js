import Sidebar from "./components/sidebar";


export default function Home() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Welcome to the E-commerce Platform</h1>
        {/* Add the homepage content here */}
      </div>
    </div>
  );
}
