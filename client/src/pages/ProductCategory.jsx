import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import { categories } from '../assets/assets' // Correct path to categories

const ProductCategory = () => {
  const { products } = useAppContext()
  const { category } = useParams()

  // Match category from URL with one in categories list
  const searchCategory = categories.find(
    (item) => item?.path?.toLowerCase() === category?.toLowerCase()
  )

  // Filter products by category
  const filteredProducts = products.filter(
    (product) => product?.category?.toLowerCase() === category?.toLowerCase()
  )

  return (
    <div className='mt-16'> {/* Add margin-top for the entire section */}
      {/* Title section */}
      {searchCategory && (
        <div className='flex flex-col items-end w-max'>
          <p className='text-2xl font-medium uppercase'>{searchCategory.text}</p> {/* Category title */}
          <div className='w-16 h-0.5 bg-primary rounded-full mt-2'></div> {/* Green line under the title */}
        </div>
      )}

      {/* Products grid */}
      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center h-[60vh]'>
          <p className='text-2xl font-medium text-primary'>
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductCategory
