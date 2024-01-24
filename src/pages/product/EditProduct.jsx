import React, { useEffect, useState } from "react";
import { CustomInpute } from "../../components/custom-inpute/CustomInpute";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getAllCats } from "../category/categoryAction";
import { useParams } from "react-router-dom";

export const EditProduct = () => {
  const [imgs, setImgs] = useState([]);

  const { _id } = useParams();

  const [form, setForm] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCats());
  }, [dispatch]);
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // combine data and file

    const formDt = new FormData();

    for (let key in form) {
      formDt.append(key, form[key]);
    }
  };

  const handleOnChange = (e) => {
    const [name, value] = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleOnImageAttached = (e) => {
    const { name, files } = e.target;

    setImgs(files);
  };

  const inputs = [
    {
      label: "Product Name",
      name: "name",
      required: true,
      placeholder: "Iphone 43",
    },
    {
      label: "SKU",
      name: "sku",
      required: true,
      placeholder: "IP-3434",
    },
    {
      label: "QTY",
      name: "quantity",
      required: true,
      type: "number",
      placeholder: "20",
    },
    {
      label: "Price",
      name: "price",
      required: true,
      type: "number",

      placeholder: "232",
    },
    {
      label: "Sales price",
      name: "salesPrice",
      placeholder: "342442",
    },
    {
      label: "Sales starts Date",
      name: "salesStartDate",
      //   required: true,
      type: "date",
    },
    {
      label: "Sales ENd Date",
      name: "salesEndDate",
      //   required: true,
      type: "date",
    },
    {
      label: "Description",
      name: "description",
      required: true,
      as: "textarea",
      rows: "7",
      placeholder: "descriptionfkafklja",
    },
  ];

  return (
    <div>
      <Form
        onSubmit={handleOnSubmit}
        className="m-auto border rounded shadow-lg p-3 mt-5"
        style={{ width: "500px" }}
      >
        {/* make category available to select */}
        <h3>Edit product</h3>
        <hr />
        {inputs.map((item, i) => (
          <CustomInpute key={i} {...item} onChange={handleOnChange} />
        ))}

        {/* handling the attachment */}

        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            name="img"
            required={true}
            multiple
            onChange={handleOnImageAttached}
          />
        </Form.Group>

        <div className="d-grid">
          <Button type="submit">Add product</Button>
        </div>
      </Form>
    </div>
  );
};
