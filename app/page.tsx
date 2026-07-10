import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import UploadCard from "@/components/UploadCard";
import DocumentList from "@/components/DocumentList";
import ChatBox from "@/components/ChatBox";
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-slate-900">
            Your AI Second Brain
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Search your files the way you remember them.
          </p>
        </div>

        <SearchBar />
        <UploadCard />
        <DocumentList />
        <ChatBox />
      </section>
    </main>
  );
}