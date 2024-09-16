import styled from 'styled-components'

export const AllProductsSkeleton = () => {
  return (
    <CardContainer>
      <SkeletonImageWrapper />
      <SkeletonText />
      <SkeletonText />
      <SkeletonText />
      <SkeletonPrice />
      <SkeletonButton />
    </CardContainer>
  )
}

const CardContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 16px;
  background-color: #fff;
  max-width: 300px;
  height: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
`

const SkeletonImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin-bottom: 16px;
`

const SkeletonText = styled.div`
  height: 16px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 8px;
`

const SkeletonPrice = styled.div`
  width: 50px;
  height: 24px;
  background-color: #e0e0e0;
  border-radius: 4px;
`

const SkeletonButton = styled.div`
  width: 40px;
  height: 40px;
  background-color: #e0e0e0;
  border-radius: 50%;
`
