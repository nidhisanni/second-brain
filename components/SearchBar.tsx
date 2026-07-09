export default function SearchBar() {
    return (
      <div className="max-w-3xl mx-auto mt-10">
        <input
          type="text"
          placeholder="Search your files..."
          className="w-full border rounded-lg p-4 text-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }