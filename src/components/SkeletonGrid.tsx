import SkeletonCard from './SkeletonCard';

const SkeletonGrid = () => {
  return (
    <>
      {Array.from(Array(50), () => (
        <SkeletonCard />
      ))}
    </>
  );
};

export default SkeletonGrid;
