import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { ProfileFollow } from "../../types/ProfileFollow";

interface Props {
  profile_follows: ProfileFollow[];
}

export const List: FunctionComponent<Props> = ({ profile_follows }) => (
  <div>
    <h1>ProfileFollow List</h1>
    <Link href="/profile_follows/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>source</th>
          <th>target</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {profile_follows &&
          profile_follows.length !== 0 &&
          profile_follows.map((profilefollow) => (
            <tr key={profilefollow["@id"]}>
              <th scope="row">
                <ReferenceLinks
                  items={profilefollow["@id"]}
                  type="profilefollow"
                />
              </th>
              <td>
                <ReferenceLinks items={profilefollow["source"]} type="User" />
              </td>
              <td>
                <ReferenceLinks items={profilefollow["target"]} type="User" />
              </td>
              <td>
                <ReferenceLinks
                  items={profilefollow["@id"]}
                  type="profilefollow"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${profilefollow["@id"]}/edit`}>
                  <a>
                    <i className="bi bi-pen" aria-hidden="true" />
                    <span className="sr-only">Edit</span>
                  </a>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);
