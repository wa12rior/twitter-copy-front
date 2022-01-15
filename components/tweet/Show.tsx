import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { Tweet } from "../../types/Tweet";

interface Props {
  tweet: Tweet;
}

export const Show: FunctionComponent<Props> = ({ tweet }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(tweet["@id"], { method: "DELETE" });
      router.push("/tweets");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show Tweet ${tweet["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">content</th>
            <td>{tweet["content"]}</td>
          </tr>
          <tr>
            <th scope="row">createdBy</th>
            <td>
              <ReferenceLinks items={tweet["createdBy"]} type="User" />
            </td>
          </tr>
          <tr>
            <th scope="row">createdAt</th>
            <td>{tweet["createdAt"]}</td>
          </tr>
          <tr>
            <th scope="row">updatedAt</th>
            <td>{tweet["updatedAt"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/tweets">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${tweet["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
