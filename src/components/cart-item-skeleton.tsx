import styled from 'styled-components'

export function CartItemSkeleton() {
  return (
    <CartItemSkeletonWrapper>
      <ImageSkeleton />
      <ContentSkeleton>
        <TitleSkeleton />
        <PriceSkeleton />
        <ButtonSkeleton />
      </ContentSkeleton>
    </CartItemSkeletonWrapper>
  )
}

const CartItemSkeletonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  animation: pulse 1.5s infinite ease-in-out;

  @media (max-width: 600px) {
    flex-direction: column;
  }

  @keyframes pulse {
    0% {
      background-color: #f0f0f0;
    }
    50% {
      background-color: #e0e0e0;
    }
    100% {
      background-color: #f0f0f0;
    }
  }
`

const ImageSkeleton = styled.div`
  width: 80px;
  height: 80px;
  background-color: #e0e0e0;
  border-radius: 8px;
`

const ContentSkeleton = styled.div`
  flex: 1;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TitleSkeleton = styled.div`
  width: 150px;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 10px;
`

const PriceSkeleton = styled.div`
  width: 100px;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 10px;
`

const ButtonSkeleton = styled.div`
  width: 120px;
  height: 40px;
  background-color: #e0e0e0;
  border-radius: 4px;
`
