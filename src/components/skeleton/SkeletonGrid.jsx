import Skeleton from './Skeleton';

const SkeletonGrid = ({count}) => {
  const skeletonItems = Array.from({ length: count }, (_, index) => <Skeleton key={index} />);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 2xl:px-[42px] xl:px-[42px] px-[18px] mt-[24px] w-full">
      {skeletonItems}
    </div>
  );
};

export default SkeletonGrid;
