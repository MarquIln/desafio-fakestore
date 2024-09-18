import styled from 'styled-components'

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`

const PageIndicator = styled.span<{ isActive?: boolean }>`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ isActive }) => (isActive ? 'white' : '#fd3a3a')};
  background-color: ${({ isActive }) => (isActive ? '#fd3a3a' : 'white')};
  border: 1px solid #fd3a3a;
  border-radius: 10%;
  padding: 5px;
  cursor: pointer;
`

const Ellipsis = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #fd3a3a;
  padding: 5px;
`

const ChangePageButton = styled.button`
  background-color: white;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
`

export { Pagination, PageIndicator, Ellipsis, ChangePageButton }
