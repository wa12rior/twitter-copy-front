import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { ProfileFollow } from "../../types/ProfileFollow";

interface Props {
  profilefollow: ProfileFollow;
}

export const Show: FunctionComponent<Props> = ({ profilefollow }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(profilefollow["@id"], { method: "DELETE" });
      router.push("/profile_follows");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show ProfileFollow ${profilefollow["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">source</th>
            <td>
              <ReferenceLinks items={profilefollow["source"]} type="User" />
            </td>
          </tr>
          <tr>
            <th scope="row">target</th>
            <td>
              <ReferenceLinks items={profilefollow["target"]} type="User" />
            </td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/profile_follows">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${profilefollow["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
