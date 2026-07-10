"use client";
import { useState } from "react";
import { useSession, useUser } from "@clerk/nextjs";
import { useSupabase } from "@/lib/supabase";
import { uploadFile } from "@/services/storage";
export default function UploadCard() {
    const [file, setFile] = useState<File | null>(null);
    const { session } = useSession();
    const { isLoaded, isSignedIn, user } = useUser();

    // console.log("isLoaded:", isLoaded);
    // console.log("isSignedIn:", isSignedIn);
    // console.log("user:", user);
    // console.log("session:", session);

    const supabase = useSupabase();
    const handleUpload = async () => {
        // console.log("Upload button clicked");
        if (!file) return;
    
        try {
            const token = await session?.getToken();

            // console.log("Clerk token:", token);
            // console.log("Clerk user:", user);

            const uploadedFile = await uploadFile(supabase, file);
            const { error } = await supabase.from("documents").insert({
                user_id: user?.id,
                file_name: file.name,
                storage_path: uploadedFile.path,
              });
              
              if (error) {
                throw error;
              }

            alert("File uploaded successfully!");
        } catch (error) {
            console.error(error);
            alert(JSON.stringify(error, null, 2));
          }
    }

    return (
      <div className="max-w-3xl mx-auto mt-8 border-2 border-dashed rounded-xl p-10 text-center">
        <h2 className="text-xl font-semibold">Upload Files</h2>
  
        <p className="text-gray-500 mt-2">
          PDF, TXT and DOCX supported
        </p>

        <input
            type="file"
            onChange={(e) => {
                if (e.target.files) {
                    setFile(e.target.files[0]);
                }
            }}/>
            {file && <p className="mt-4">{file.name}</p>}
            <button
                onClick={handleUpload}
                className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            >
                Upload File
            </button>
      </div>
    );
};
