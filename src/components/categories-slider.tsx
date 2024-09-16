import styled from 'styled-components'
import { CategoryCard } from './category-card'

export const CategoriesSlider = () => {
  return (
    <CategoriesSliderWrapper>
      <CategoriesSliderTitle>Categorias</CategoriesSliderTitle>
      <Slider>
        <CategoryCard />
      </Slider>
    </CategoriesSliderWrapper>
  )
}

const CategoriesSliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
`
const CategoriesSliderTitle = styled.h2`
  font-size: 2rem;
`
const Slider = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
`
