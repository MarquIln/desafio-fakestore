import styled from 'styled-components'

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 600px) {
    gap: 0.5rem;
    padding: 0.5rem;
  }
`

export const ProductCard = styled.div`
  flex: 1 1 200px;
  box-sizing: border-box;
  margin: 0.5rem;

  @media (max-width: 600px) {
    max-width: calc(100% - 1rem);

    padding: 0.5rem 2rem;
  }
`
