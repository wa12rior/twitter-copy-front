import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { Tweet } from "../../types/Tweet";

interface Props {
  tweet?: Tweet;
}

const fetchUsersReference = async () => {
  return await fetch("/users");
}

export const Form: FunctionComponent<Props> = ({ tweet }) => {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(tweet["@id"], { method: "DELETE" });
      router.push("/tweets");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{tweet ? `Edit Tweet ${tweet["@id"]}` : `Create Tweet`}</h1>
      <Formik
        initialValues={tweet ? { ...tweet } : new Tweet()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/tweets" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/tweets");
          } catch (error) {
            setStatus({
              isValid: false,
              msg: `${error.defaultErrorMsg}`,
            });
            setErrors(error.fields);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-control-label" htmlFor="_content">
                content
              </label>
              <input
                name="content"
                id="_content"
                value={values.content ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors?.content && touched.content ? " is-invalid" : ""
                }`}
                aria-invalid={errors?.content && touched.content}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="content"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_createdBy">
                createdBy
              </label>
              <input
                name="createdBy"
                id="_createdBy"
                value={values.createdBy ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors?.createdBy && touched.createdBy ? " is-invalid" : ""
                }`}
                aria-invalid={errors?.createdBy && touched.createdBy}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="createdBy"
            />

            {status && status.msg && (
              <div
                className={`alert ${
                  status.isValid ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Link href="/tweets">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {tweet && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
