
"use client"
import { useEffect, useState } from "react";
import { Button } from "../../components/button";
import { Card } from "../../components/card";
import { CreateModel } from "../../components/createModel";
import { Plusicon } from "../../icons/plusicon";
import { Sidebar } from "../../components/sidebar";
import { UseContent } from "../../hooks/useContent";
import axios from "axios";

// Define the session type based on what you're getting from getServerSession
interface Session {
  user: {
    username: string;
    userId: string;
    // Add other properties as needed
  };
  accessToken: string;
}

export default function DashboardPage() {
  const [session, setSession] = useState<Session | null>(null); // Explicitly typing session state
  const [model, setModel] = useState(false);
  const { content, loading, error } = UseContent();

  // Fetch session data on component mount
  useEffect(() => {
    axios.get<Session>('/api/dashboard').then((response) => setSession(response.data))
  }, []);

  

  if (!session) {
    return <p>Loading session...</p>;
  }

  return (
    <div className="flex">
      <Sidebar />

      {/* Main Content Area */}
      <div className="pt-2 ml-60 min-h-screen bg-slate-300 w-full px-4 sm:px-6 md:px-8">
        {/* Create Content Modal */}
        <CreateModel open={model} onClose={() => setModel(false)} />

        {/* Button Actions */}
        <div className="flex justify-end items-center mt-4 gap-10">
          <Button
            onClick={() => setModel(true)}
            variant="primary"
            text="Add Content"
            startIcon={<Plusicon />}
          />
        </div>

        {/* Content Cards Grid */}
        <div className="flex flex-wrap space-x-4 pt-4 sm:space-x-0 sm:space-y-4 sm:grid sm:grid-cols-1 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            content.map(({ type, title, link, id }) => (
              <Card key={title} type={type} link={link} title={title} id={id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}