"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from "@/components/ui/Container";
import Billboard from "@/components/Billboard";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/ProductCard";
import Filter from "./components/Filter";
import MobileFilters from "./components/MobileFilters";
import { Category, Product, Subcategory } from '@/types';

interface CategoryPageProps {
    category: Category;
    products: Product[];
    subcategories: Subcategory[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, products, subcategories }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const searchParams = useSearchParams();

  useEffect(() => {
    const filterProducts = () => {
      return products.filter(product => {
        const subcategoryValues = JSON.parse(product.subcategoryValueIds.toString());
        return subcategories.every(subcategory => {
          const paramValue = searchParams.get(subcategory.id);
          if (!paramValue) return true;
          const productValue = subcategoryValues.find((sv: Subcategory) => sv.id === subcategory.id);
          return productValue && productValue.values.some((v: any) => v.id === paramValue);
        });
      });
    };

    setFilteredProducts(filterProducts());
  }, [products, subcategories, searchParams]);

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters subcategories={subcategories} />
            <div className="hidden lg:block">
              {subcategories.map((subcategory) => (
                <Filter 
                  key={subcategory.id}
                  valueKey={subcategory.id}
                  name={subcategory.name}
                  data={subcategory.values}
                />
              ))}
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {filteredProducts.length === 0 && <NoResults />}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((item) => (
                  <ProductCard 
                    key={item.id}
                    data={item}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;