import { useEffect, useState } from 'react'
import { fetchAllCategories } from '@/services/api'
import styled from 'styled-components'

export const CategoryCard = () => {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchAllCategories()
        setCategories(fetchedCategories)
      } catch (err) {
        console.log(err)
      }
    }

    loadCategories()
  }, [])

  return (
    <>
      {categories.map((category) => (
        <Card key={category}>{category}</Card>
      ))}
    </>
  )
}

const Card = styled.div`
  width: 200px;
  flex-grow: 1;
  height: 40px;
  color: black;
  gap: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  border: 1px solid black;

  &:hover {
    background-color: #fd3a3a;
    color: white;
    border: 1px solid #fd3a3a;
  }
`
