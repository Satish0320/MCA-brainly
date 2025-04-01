"use client";

import { useRef, useState } from "react";
import { Crossicon } from "../icons/crossicon";
import { Button } from "../components/button";
import React from "react";

enum contenttype {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function CreateModel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const titleref = useRef<HTMLInputElement | null>(null);
  const linkref = useRef<HTMLInputElement | null>(null);
  const [type, setType] = useState<contenttype>(contenttype.Youtube);

  async function addcontent() {
    const title = titleref.current?.value;
    const link = linkref.current?.value;

    if (!title || !link) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies (session) are sent
        body: JSON.stringify({ title, link, type }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message);
        return;
      }

      alert("Content added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding content:", error);
      alert("Failed to add content. Please try again.");
    }
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <div className="flex justify-end relative h-7">
              <div onClick={onClose} className="absolute  top-0 right-0 cursor-pointer w-7 h-7">
                <Crossicon />
              </div>
            </div>

            <div className="mt-4">
              <Input placeholder="Title" ref={titleref} />
              <Input placeholder="Link" ref={linkref} />
            </div>

            <div className="mt-4">
              <h1 className="text-center font-semibold text-lg mb-2 text-black">Type</h1>
              <div className="flex justify-center gap-4">
                <Button
                  text="Youtube"
                  variant={type === contenttype.Youtube ? "primary" : "secondary"}
                  onClick={() => setType(contenttype.Youtube)}
                />
                <Button
                  text="Twitter"
                  variant={type === contenttype.Twitter ? "primary" : "secondary"}
                  onClick={() => setType(contenttype.Twitter)}
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button variant="primary" text="Submit" onClick={addcontent} className="w-full flex justify-center "/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Input = React.forwardRef<HTMLInputElement, { placeholder: string }>(
  function InputComponent({ placeholder }, ref) {
    return (
      <div className="mb-4">
        <input
          ref={ref}
          placeholder={placeholder}
          type="text"
          className="px-4 py-2 border rounded-md w-full"
        />
      </div>
    );
  }
);

Input.displayName = "InputComponent";
