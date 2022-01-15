import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { ProfileFollow } from "../../types/ProfileFollow";

interface Props {
  profilefollow?: ProfileFollow;
}

export const Form: FunctionComponent<Props> = ({ profilefollow }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(profilefollow["@id"], { method: "DELETE" });
      router.push("/profile_follows");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>
        {profilefollow
          ? `Edit ProfileFollow ${profilefollow["@id"]}`
          : `Create ProfileFollow`}
      </h1>
      <Formik
        initialValues={
          profilefollow ? { ...profilefollow } : new ProfileFollow()
        }
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/profile_follows" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/profile_follows");
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
              <label className="form-control-label" htmlFor="_source">
                source
              </label>
              <input
                name="source"
                id="_source"
                value={values.source ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.source && touched.source ? " is-invalid" : ""
                }`}
                aria-invalid={errors.source && touched.source}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="source"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_target">
                target
              </label>
              <input
                name="target"
                id="_target"
                value={values.target ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.target && touched.target ? " is-invalid" : ""
                }`}
                aria-invalid={errors.target && touched.target}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="target"
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
      <Link href="/profile_follows">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {profilefollow && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
