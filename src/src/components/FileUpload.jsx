import { FaPaperclip } from 'react-icons/fa';
import { useRef } from 'react';

const FileUpload = () => {
  const identityInputRef = useRef(null);
  const degreeInputRef = useRef(null);

  // Function to trigger file input click
  const handleIdentityClick = () => {
    identityInputRef.current.click();
  };

  const handleDegreeClick = () => {
    degreeInputRef.current.click();
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Upload Identity */}
      <div className="flex flex-col w-full relative">
        <div
          className="border-dashed border-2 border-gray-400 p-2 rounded-md w-full cursor-pointer"
          onClick={handleIdentityClick}
        >
          <span className="text-gray-400">Upload your Identity</span>
          <FaPaperclip className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <input
          type="file"
          ref={identityInputRef}
          className="hidden"
          name="identity"
          id="identity"
        />
      </div>

      {/* Upload Degree */}
      <div className="flex flex-col w-full relative">
        <div
          className="border-dashed border-2 border-gray-400 p-2 rounded-md w-full cursor-pointer"
          onClick={handleDegreeClick}
        >
          <span className="text-gray-400">Upload your Degree</span>
          <FaPaperclip className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <input
          type="file"
          ref={degreeInputRef}
          className="hidden"
          name="degree"
          id="degree"
        />
      </div>
    </div>
  );
};

export default FileUpload;
