import styled from 'styled-components'

export const ProductCard = styled.div`
  position: relative;
`

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`
