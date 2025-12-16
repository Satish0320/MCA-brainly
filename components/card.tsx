
// import { Plusicon } from "../icons/plusicon";
import { Shareicon } from "../icons/shareicon";
import { useEffect } from "react";

interface Cinterface {
  id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter";
}

const getYouTubeEmbedUrl = (url: string): string => {
  const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
};

export const Card = ({ id, title, link, type }: Cinterface) => {
  useEffect(() => {
    if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => window.twttr?.widgets?.load();
      document.body.appendChild(script);
    }
  }, [type]);

  const handleDelete = async () => {
    try {
      const payload = JSON.stringify({ id });
      const res = await fetch(`/api/content`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });

      const data = await res.json();
      if (res.ok) {
        alert("ID deleted");
      } else {
        alert(data.message || "Failed to delete content");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-72 min-h-48 min-w-72 p-8 bg-slate-200 rounded-md shadow-lg">
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          {/* <Plusicon className="pr-2 text-gray-500" /> */}
          <span className="text-black">{title}</span>
        </div>
        <div className="flex items-center">
          <a href={link} target="_blank" rel="noopener noreferrer" className="pr-2 text-gray-500">
            <Shareicon />
          </a>
          <button
            onClick={() => {
              // console.log("Delete button clicked, ID:", id);
              handleDelete();
            }}
            className="pr-2 text-gray-500 hover:text-red-500 border border-red-500">
           DELETE
          </button>

        </div>
      </div>

      {/* Embedded Content */}
      <div className="mt-4">
        {type === "youtube" && (
          <iframe
            width="100%"
            height="200"
            src={getYouTubeEmbedUrl(link)}
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};
