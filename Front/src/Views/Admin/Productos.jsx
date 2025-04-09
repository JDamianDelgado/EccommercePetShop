import { toast } from "react-toastify";
import axiosInstance from "../../config/axios";
import { useEffect, useState } from "react";
import "src/Styles/Admin/Productos-Adm.css"

export const ProductosAdmin = () => {
  const [productItems, setProductItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const loadProducts = async () => {
    try {
      const response = await axiosInstance.get("product");
      setProductItems(response.data);
      toast.success("Productos cargados correctamente");
    } catch (error) {
      console.error("Error al cargar los productos", error);
      toast.error("Error al cargar los productos");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const editableProduct = (product) => {
    setEditMode(true);
    setEditProduct({ ...product });
    setOriginalProduct({ ...product });
  };

  const saveProduct = async () => {
    try {
      if (!editProduct.IdProduct) {
        const response = await axiosInstance.post("product", editProduct);
        const newProduct = response.data;

        setProductItems((prev) => [...prev, newProduct]);
        toast.success("Producto agregado correctamente");
      } else {
        const IdProduct = editProduct.IdProduct;
        const changedFields = {};
        for (const key in editProduct) {
          if (editProduct[key] !== originalProduct[key]) {
            changedFields[key] = editProduct[key];
          }
        }
  
        if (Object.keys(changedFields).length > 0) {
          await axiosInstance.put(`product/${IdProduct}`, changedFields);
          setProductItems((prev) =>
            prev.map((product) =>
              product.IdProduct === IdProduct ? { ...editProduct } : product
            )
          );
          toast.success("Producto actualizado correctamente");
        } else {
          toast.info("No se detectaron cambios");
        }
      }
  
      setEditMode(false);
      setEditProduct(null);
      setOriginalProduct(null);
    } catch (error) {
      console.error("Error al guardar el producto", error);
      toast.error("Error al guardar el producto");
    }
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditProduct(null);
    setOriginalProduct(null);
  };

  const handleFieldChange = (field, value) => {
    setEditProduct({
      ...editProduct,
      [field]: value,
    });
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const deleteProduct = async (IdProduct) => {
    try {
      await axiosInstance.delete(`product/${IdProduct}`);
      setProductItems((prev) =>
        prev.filter((product) => product.IdProduct !== IdProduct)
      );
      setShowDeleteConfirm(null);
      toast.success("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el producto", error);
      toast.error("Error al eliminar el producto");
    }
  };


  const handleAddNewProduct = () => {
    const newProduct = {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
    };
    setEditProduct(newProduct);
    setOriginalProduct(null);
    setEditMode(true);
  };

  return (
    <div className="container">
      <h1 className="title">Gestión de Productos</h1>

<button onClick={handleAddNewProduct} className="btn add">Agregar Producto</button>
{editMode && editProduct && !editProduct.IdProduct && (
      <div className="card">
        <h3 className="card-title">Nuevo Producto</h3>
        <div className="form">
         <label>
            Nombre del producto
          <input
            type="text"
            value={editProduct.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            placeholder="Nombre"
            />
         </label>
          <label>Precio
          <input
            type="number"
            value={editProduct.price}
            onChange={(e) => handleFieldChange("price", e.target.value)}
            placeholder="Precio"
          />
          </label>
          <label>
            Descripcion del producto
          <input
            type="text"
            value={editProduct.description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            placeholder="Descripción"
            />
        </label>
          <label>Stock
          <input
            type="number"
            value={editProduct.stock}
            onChange={(e) => handleFieldChange("stock", e.target.value)}
            placeholder="Stock"
          />
          </label>
          <input
            type="string"
            value={editProduct.image}
            onChange={(e) => handleFieldChange("image", e.target.value)}
            placeholder="URL de imagen"
          />

          <div className="actions">
            <button onClick={saveProduct} className="btn save">
              Guardar
            </button>
            <button onClick={cancelEdit} className="btn cancel">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )}

      <div className="grid">
        {productItems.map((product) => {
          const isEditing =
            editMode && editProduct && product.IdProduct === editProduct.IdProduct;

          return (
            <div key={product.IdProduct} className="card">
              {isEditing ? (
                <>
                  <h3 className="card-title">Editar Producto</h3>
                  <div className="form">
                    <input
                      type="text"
                      value={editProduct.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      placeholder="Nombre"
                    />
                    <input
                      type="number"
                      value={editProduct.price}
                      onChange={(e) => handleFieldChange("price", e.target.value)}
                      placeholder="Precio"
                    />
                    <input
                      type="text"
                      value={editProduct.description}
                      onChange={(e) =>
                        handleFieldChange("description", e.target.value)
                      }
                      placeholder="Descripción"
                    />
                    <input
                      type="number"
                      value={editProduct.stock}
                      onChange={(e) => handleFieldChange("stock", e.target.value)}
                      placeholder="Stock"
                    />
                    <input
                      type="url"
                      value={editProduct.image}
                      onChange={(e) => handleFieldChange("image", e.target.value)}
                      placeholder="URL de imagen"
                    />

                    <div className="actions">
                      <button onClick={saveProduct} className="btn save">Guardar</button>
                      <button onClick={cancelEdit} className="btn cancel">Cancelar</button>
                      <button
                        onClick={() => setShowDeleteConfirm(product.IdProduct)}
                        className="btn delete"
                      >
                        Eliminar
                      </button>
                    </div>

                    {showDeleteConfirm === product.IdProduct && (
                      <div className="confirm-dialog">
                        <p>¿Estás seguro de eliminar este producto?</p>
                        <div className="actions">
                          <button
                            onClick={() => deleteProduct(product.IdProduct)}
                            className="btn confirm"
                          >
                            Confirmar
                          </button>
                          <button onClick={cancelDelete} className="btn cancel">
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <h3 className="card-title">{product.name}</h3>
                  <p className="description">{product.description}</p>
                  <p className="price">Precio: ${product.price}</p>
                  <p className="stock">Stock: {product.stock}</p>
                  <button
                    onClick={() => editableProduct(product)}
                    className="btn edit"
                  >
                    Editar
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
