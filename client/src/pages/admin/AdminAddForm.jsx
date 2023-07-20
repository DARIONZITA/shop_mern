import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAdminProduct,
  setClearErrors,
  setClearInputs,
  setCurrentId,
  setProductData,
  updateAdminProduct,
} from "../../features/admin/product/productAdminSlice";

import { ImSpinner2 } from "react-icons/im";
import FilterCategory from "../../components/filterCategory";

export const AdminAddForm = () => {
  const dispatch = useDispatch();
  const {
    emptyFields,
    error,
    loadingCreate,
    loadingUpdate,
    productData,
    currentId,
  } = useSelector((store) => store.productsAdmin);
  const { admin } = useSelector((store) => store.admin);
  const categoryStatic = useSelector((store)=> store.productsCustomer.categoryStatic)

  // fetch the data that will be edited
  // will populate the form with the data
  useEffect(() => {
    // const url = "http://localhost:7001/api/products/";

    const url = "http://localhost:3000/api/products/";

    const fecthUpdatingProduct = async () => {
      const response = await fetch(url + currentId, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setProductData(data));
      }
    };

    currentId && fecthUpdatingProduct();
  }, [currentId]);

  // image OnChange
  const handleFileInputChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0 && files[0] instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        dispatch(setProductData({ ...productData, [name]: reader.result }));
      };
    } else {
      dispatch(setProductData({ ...productData, [name]: "" }));
    }
  };

  // inputs OnChange
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setProductData({ ...productData, [name]: value }));
  };

  // desc OnChange
  const handleDescriptionChange = (e, index) => {
    const { name, value } = e.target;
    const newDescription = productData.description.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: value };
      }

      return item;
    });

    dispatch(setProductData({ ...productData, description: newDescription }));
  };

  // desc Add
  const handleAddDescription = () => {
    dispatch(
      setProductData({
        ...productData,
        description: [
          ...productData.description,
          { detailOne: "", detailTwo: "" },
        ],
      })
    );
  };

  // desc Remove
  const handleRemoveDescription = (index) => {
    dispatch(
      setProductData({
        ...productData,
        description: productData.description.filter((_, i) => i !== index),
      })
    );
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateAdminProduct({ currentId, productData })).then(
        (response) => {
          if (response.meta.requestStatus === "fulfilled") {
            console.log("Updated");

            const fileInputs = document.querySelectorAll('input[type="file"]');
            fileInputs.forEach((input) => {
              input.value = "";
            });
          }
        }
      );
    } else {
      dispatch(createAdminProduct(productData)).then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          console.log("Created");

          const fileInputs = document.querySelectorAll('input[type="file"]');
          fileInputs.forEach((input) => {
            input.value = "";
          });
        }
      });
    }
  };

  // clearing input fileds
  const onClear = () => {
    dispatch(setClearInputs());
    dispatch(setClearErrors());

    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      input.value = "";
    });
  };

  const onCancel = () => {
    dispatch(setClearInputs());
    dispatch(setClearErrors());
    dispatch(setCurrentId(null));

    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      input.value = "";
    });
  };

  // adjust the height of text area height when pasting words in it
  const adjustHeight = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };
  const onClickCat=(listCat)=>{
    dispatch(setProductData({...productData,category:listCat}))
    
  }

  return (
    <div className="w-screen grid justify-center overflow-y-auto border border-zinc-200 p-5 shadow-md rounded-lg">
      <form
        className="col-span-1 flex flex-col items-center gap-5 font-urbanist bg-green-200 p-5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
          Adicionar um novo Produto
        </h2>

        {/* Product Category */}
        <p>Categorias do produto</p>
        <FilterCategory categoryStatic={categoryStatic} onClickCat={onClickCat}/>
        {/* Product Name */}
         {console.log(emptyFields)}
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          placeholder="Product Name"
         
          className={
            emptyFields.includes("name")
              ? "w-full border-2 border-rose-500 shadow-lg focus:outline-none md:py-2 md:px-3"
              : "w-full border-2 border-transparent shadow-lg focus:outline-none md:py-2 md:px-3"
          }
        />

        {/* Product Price */}
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          placeholder="Product Price"
          className={
            emptyFields.includes("price")
              ? "w-full border-2 border-rose-500 shadow-lg focus:outline-none md:py-2 md:px-3"
              : "w-full border-2 border-transparent shadow-lg focus:outline-none md:py-2 md:px-3"
          }
        />
        {/* Product stock */}
        <input
          type="number"
          name="stock"
          value={productData.stock}
          onChange={handleInputChange}
          placeholder="Product Stock"
          className={
            emptyFields.includes("stock")
              ? "w-full border-2 border-rose-500 shadow-lg focus:outline-none md:py-2 md:px-3"
              : "w-full border-2 border-transparent shadow-lg focus:outline-none md:py-2 md:px-3"
          }
        />


        <input
          type="file"
          name="imgOne"
          onChange={handleFileInputChange}
          className={
            emptyFields.includes("imgOne")
              ? "block w-full text-sm text-gray-900 file:m-3 file:rounded-full file:border-none file:bg-violet-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-violet-700 file:shadow-lg file:ring-2 file:ring-rose-500 hover:file:bg-violet-100"
              : "block w-full text-sm text-gray-900 file:m-3 file:rounded-full file:border-none file:bg-violet-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-violet-700 file:shadow-lg file:ring-2 file:ring-transparent hover:file:bg-violet-100"
          }
        />

        <input
          type="file"
          name="imgTwo"
          onChange={handleFileInputChange}
          className={
            emptyFields.includes("imgTwo")
              ? "block w-full text-sm text-gray-900 file:m-3 file:rounded-full file:border-none file:bg-violet-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-violet-700 file:shadow-lg file:ring-2 file:ring-rose-500 hover:file:bg-violet-100"
              : "block w-full text-sm text-gray-900 file:m-3 file:rounded-full file:border-none file:bg-violet-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-violet-700 file:shadow-lg file:ring-2 file:ring-transparent hover:file:bg-violet-100"
          }
        />

        {/* Product Description */}
        {productData.description.map((item, index) => (
          <div key={index}>
            <div className="mb-2 w-full space-y-6">
              {/* Detail One*/}
              <input
                type="text"
                name="detailOne"
                value={item.detailOne}
                onChange={(e) => handleDescriptionChange(e, index)}
                placeholder="Tema do detalhe"
                className={
                  emptyFields.includes(`description[${index}].detailOne`)
                    ? "w-full border-2 border-rose-500 shadow-lg focus:outline-none md:py-2 md:px-3"
                    : "w-full border-2 border-transparent shadow-lg focus:outline-none md:py-2 md:px-3"
                }
              />

              {/* Detail Two*/}
              <textarea
                name="detailTwo"
                value={item.detailTwo}
                onInput={adjustHeight}
                onChange={(e) => handleDescriptionChange(e, index)}
                placeholder="Descrição"
                className={
                  emptyFields.includes(`description[${index}].detailTwo`)
                    ? "w-full border-2 border-rose-500 shadow-lg focus:outline-none md:py-2 md:px-3"
                    : "w-full border-2 border-transparent shadow-lg focus:outline-none md:py-2 md:px-3"
                }
              />
            </div>

            {productData.description.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveDescription(index)}
                className="max-w-xs rounded-md bg-red-500 py-2 px-5 font-bold text-primary shadow-md transition duration-300 ease-in hover:bg-red-400 md:py-2 md:px-3"
              >
                Remover
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddDescription}
          className="w-full rounded-md bg-blue-300 py-2 px-5 font-bold text-primary shadow-md transition duration-300 ease-in hover:bg-blue-400 md:py-3 md:px-6"
        >
          Adcionar mais descrição
        </button>

        {currentId ? (
          <>
            {loadingUpdate ? (
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md bg-blue-500 py-2 px-5 font-bold text-primary shadow-md transition duration-300 ease-in hover:bg-blue-400 md:py-3 md:px-6"
                disabled
              >
                <ImSpinner2 className="mr-3 h-5 w-5 animate-spin" />
                Updating...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 py-2 px-5 font-bold text-primary shadow-md transition duration-300 ease-in hover:bg-blue-400 md:py-3 md:px-6"
              >
                Atualizar produto
              </button>
            )}

            <button
              type="button"
              onClick={() => onCancel()}
              className="w-full rounded-md bg-red-500 py-2 px-5 font-bold text-primary shadow-md transition duration-300 ease-in hover:bg-red-400 md:py-3 md:px-6"
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            {loadingCreate ? (
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md bg-blue-500 py-2 px-5 font-bold text-primary shadow-md transition duration-300 ease-in hover:bg-blue-400 md:py-3 md:px-6"
                disabled
              >
                <ImSpinner2 className="mr-3 h-5 w-5 animate-spin" />
                Creating...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 py-2 px-5 font-bold text-primary shadow-md transition duration-300 ease-in hover:bg-blue-400 md:py-3 md:px-6"
              >
                Criar Produto
              </button>
            )}

            <button
              type="button"
              onClick={() => onClear()}
              className="w-full rounded-md bg-blue-500 py-2 px-5 font-bold text-primary shadow-md transition duration-300 ease-in hover:bg-blue-400 md:py-3 md:px-6"
            >
              Apagar
            </button>
          </>
        )}

        {error && (
          <div className="text-sm font-bold text-rose-500">{error}</div>
        )}
      </form>
    </div>
  );
};
