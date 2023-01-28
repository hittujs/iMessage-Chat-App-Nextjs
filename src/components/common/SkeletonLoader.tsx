import { Skeleton } from "@chakra-ui/react";

interface Props {
  count: number;
  height: string;
  width: string;
}

export const SkeletonLoader: React.FC<Props> = ({ count, height, width }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <Skeleton
          key={index}
          startColor="blackAlpha.400"
          endColor="whiteAlpha.300"
          height={height}
          width={{ base: "full", md: width }}
        />
      ))}
    </>
  );
};
