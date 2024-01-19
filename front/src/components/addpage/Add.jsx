import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { postData, getData, DeleteData } from "../../redux/slice/slice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Input } from "@mui/material";

const SignupSchema = Yup.object().shape({
  prodname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  detail: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  imagecard: Yup.string()
    .matches(
      /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
      "Enter a valid url"
    )
    .required("Required"),
});

const Add = () => {
  const [inpVal, setinpVal] = useState("");
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);

  let filtrdata = products.filter((p) =>
    p.prodname.toLowerCase().includes(inpVal)
  );
  return (
    <div>
      <Formik
        initialValues={{
          prodname: "",
          detail: "",
          imagecard: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
          dispatch(postData(values));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="prodname" placeholder="ProdName" />
            {errors.prodname && touched.prodname ? (
              <div>{errors.prodname}</div>
            ) : null}
            <Field name="detail" placeholder="Detail" />
            {errors.detail && touched.detail ? (
              <div>{errors.detail}</div>
            ) : null}
            <Field name="imagecard" placeholder="imageCard" />
            {errors.imagecard && touched.imagecard ? (
              <div>{errors.imagecard}</div>
            ) : null}
            <button type="submit">Add</button>
          </Form>
        )}
      </Formik>

      <div className="table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">ProdName</TableCell>
                <TableCell align="right">Detail</TableCell>
                <TableCell align="right">ImageCard</TableCell>
                <TableCell align="right">Delete</TableCell>
                <TableCell align="right">
                  <Input
                    placeholder="Search"
                    onChange={(e) => {
                      setinpVal(e.target.value);
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtrdata
                ? filtrdata.map((p) => (
                    <TableRow
                      key={p._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {p._id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {p.prodname}
                      </TableCell>
                      <TableCell align="right">{p.detail}</TableCell>
                      <TableCell align="right">{p.imagecard}</TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => {
                            dispatch(DeleteData(p._id));
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : products.map((p) => (
                    <TableRow
                      key={p._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {p._id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {p.prodname}
                      </TableCell>
                      <TableCell align="right">{p.detail}</TableCell>
                      <TableCell align="right">{p.imagecard}</TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => {
                            dispatch(DeleteData(p._id));
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Add;
