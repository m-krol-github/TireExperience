const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="h-2 w-full bg-white bg-opacity-50 rounded-lg mt-4 overflow-hidden">
    <div
      className="h-full transition-all bg-white"
      style={{ width: `${progress}%` }}
    />
  </div>
);

export default ProgressBar;
