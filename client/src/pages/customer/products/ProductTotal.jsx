import React from "react";

export const ProductTotal = ({
  filterCategory,
  categoryCount,
  categoryTotal,
}) => {
  console.log(categoryCount);
  return (
    <div>
      {filterCategory === "All" ? (
        categoryCount.length > 0 ? (
          <p>{categoryTotal} Produtos.</p>
        ) : (
          <p>buscando por produtos...</p>
        )
      ) : (
        <>
          {categoryCount.length > 0 ? (
            categoryCount
              .filter((count) => count.category === filterCategory)
              .map((count, i) => (
                <p key={i}>
                  There are {count.count} {count.category} products.
                </p>
              ))
          ) : (
            <p>Product not available.</p>
          )}
        </>
      )}
    </div>
  );
};
