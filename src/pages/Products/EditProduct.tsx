import { useParams } from "react-router-dom";

const EditProduct = () => {
  const params = useParams();
  const id = params.id;


  return "Edit Product " + id;
};

export default EditProduct;
