import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllCats } from "../../pages/category/categoryAction";
import { getAllProducts } from "../../pages/product/productAction";

export const ProductTable = () => {
  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.productInfo);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>

          <th>Thumbnail</th>
          <th>Status</th>
          <th>Slug</th>
          <th>Qty</th>
          <th>Sales price</th>

          <th>edit</th>
        </tr>
      </thead>
      <tbody>
        {productList.map(
          (
            {
              _id,
              thumbnail,
              title,
              status,
              slug,
              createdAt,
              quantity,
              name,
              price,
              salesPrice,
              salesStartDate,
              salesEndDate,
            },
            i
          ) => (
            <tr key={_id}>
              <td>{i + 1}</td>
              <td>{thumbnail}</td>

              <td
                className={status === "active" ? "text-success" : "text-danger"}
              >
                {status}
              </td>
              <td>
                Name:{name}
                <br />
                slug: {slug}
              </td>
              <td>{quantity}</td>
              <td>
                sales price: {salesPrice}
                <br />
                price: {price}
              </td>

              <td>
                <Button variant="warning">Edit</Button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};
