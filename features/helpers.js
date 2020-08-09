

export const handleModifiedData = res => {
    let responseData = {
      categories: res.categories.map(item => {
        let categoryItem = {
          isExpended: false,
          category: {
            ...item.category,
            subcategories:item.category.subcategories.map(item => {
            let subCategoryItem = {
              data: item.items,
              subCategoryname: item.subCategoryname
            }
            return subCategoryItem
          })}
        }
        return categoryItem
      })
    }
    return responseData
}

