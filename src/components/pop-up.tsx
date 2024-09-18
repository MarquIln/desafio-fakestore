import styled from 'styled-components'

export const PopUp = styled.div`
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #28a745;
  color: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 0.875rem;
  text-align: center;
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
`
