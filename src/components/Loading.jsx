const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
          <div className="absolute inset-0 rounded-full border-4 border-indigo-200"></div>
        </div>
        <p className="mt-6 text-gray-600 text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
