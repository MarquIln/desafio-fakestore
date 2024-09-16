import styled, { keyframes } from 'styled-components'

export const ProductPageSkeleton = () => {
  return (
    <>
      <SkeletonWrapper>
        <SkeletonImage />
        <SkeletonDetails>
          <SkeletonTitle />
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
          <SkeletonPrice />
          <SkeletonButton />
        </SkeletonDetails>
      </SkeletonWrapper>
      <SkeletonSuggested>
        {[...Array(4)].map((_, index) => (
          <SkeletonSuggestedItem key={index} />
        ))}
      </SkeletonSuggested>
    </>
  )
}

const SkeletonWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: white;
  border: 2px solid #f9f9f9;
  border-radius: 8px;
`

const SkeletonAnimation = keyframes`
  0% {
    background-color: #f0f0f0;
  }
  50% {
    background-color: #e0e0e0;
  }
  100% {
    background-color: #f0f0f0;
  }
`

const SkeletonImage = styled.div`
  width: 600px;
  height: 600px;
  background-color: #f0f0f0;
  animation: ${SkeletonAnimation} 1.5s ease-in-out infinite;
`

const SkeletonDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const SkeletonTitle = styled.div`
  width: 50%;
  height: 32px;
  background-color: #f0f0f0;
  animation: ${SkeletonAnimation} 1.5s ease-in-out infinite;
`

const SkeletonText = styled.div`
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  animation: ${SkeletonAnimation} 1.5s ease-in-out infinite;
`

const SkeletonPrice = styled.div`
  width: 30%;
  height: 24px;
  background-color: #f0f0f0;
  animation: ${SkeletonAnimation} 1.5s ease-in-out infinite;
`

const SkeletonButton = styled.div`
  width: 150px;
  height: 40px;
  background-color: #f0f0f0;
  animation: ${SkeletonAnimation} 1.5s ease-in-out infinite;
  border-radius: 8px;
`

const SkeletonSuggested = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`

const SkeletonSuggestedItem = styled.div`
  width: 150px;
  height: 200px;
  background-color: #f0f0f0;
  animation: ${SkeletonAnimation} 1.5s ease-in-out infinite;
  border-radius: 8px;
`
