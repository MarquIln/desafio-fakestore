import styled from 'styled-components'

interface DiscountTagProps {
  discount: number | string
}

export const DiscountTag = ({ discount }: DiscountTagProps) => {
  return <Tag>{Number(discount) > 0 ? `${discount}% OFF` : 'SALE'}</Tag>
}

const Tag = styled.span`
  position: absolute;
  top: 8px;
  left: 0px;
  background-color: #fd3a3a;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  z-index: 5;
`
