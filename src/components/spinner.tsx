import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const SpinnerWrapper = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #fd3a3a;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`

export const Spinner = () => <SpinnerWrapper />
