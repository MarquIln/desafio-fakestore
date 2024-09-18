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
  color: ${({ theme, isActive }) =>
    isActive ? theme.pageIndicatorActiveColor : theme.pageIndicatorColor};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.pageIndicatorActiveBg : theme.pageIndicatorBg};
  border: 1px solid ${({ theme }) => theme.pageIndicatorColor};
  border-radius: 10%;
  padding: 5px;
  cursor: pointer;
`

const Ellipsis = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.pageIndicatorColor};
  padding: 5px;
`

const ChangePageButton = styled.button`
  background-color: ${({ theme }) => theme.changePageButtonBg};
  color: ${({ theme }) => theme.changePageButtonText};
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
`

export { Pagination, PageIndicator, Ellipsis, ChangePageButton }
