const Skeleton = () => {
    return (
        <div className="skeleton-item flex flex-col space-y-4 py-[13px]  rounded-none relative overflow-hidden">
        <div className="bg-gray h-[500px] w-full rounded-none relative overflow-hidden">
          <div className="shimmer absolute inset-0"></div>
        </div>
        <div className="bg-gray  h-4 w-20 rounded-none relative overflow-hidden">
          <div className="shimmer absolute inset-0"></div>
        </div>
        <div className="bg-gray  h-8 w-48 rounded-none relative overflow-hidden">
          <div className="shimmer absolute inset-0"></div>
        </div>
      </div>
    );
  };
  
  export default Skeleton;