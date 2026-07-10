import { SupabaseClient } from "@supabase/supabase-js";
import { extractPdfText } from "@/lib/pdf";
import { uploadFile } from "./storage";

type UploadDocumentParams = {
  supabase: SupabaseClient;
  file: File;
  userId: string;
};

export async function uploadDocument({
  supabase,
  file,
  userId,
}: UploadDocumentParams) {
  // 1. Extract text
  const text = await extractPdfText(file);
  console.log("Length:", text.length);
  console.log(text.substring(0, 300));


  // 2. Upload file
  const uploadedFile = await uploadFile(supabase, file);

  // 3. Save metadata
  const { error } = await supabase.from("documents").insert({
    user_id: userId,
    file_name: file.name,
    storage_path: uploadedFile.path,
    content: text,
  });

  if (error) {
    throw error;
  }

  return uploadedFile;
}