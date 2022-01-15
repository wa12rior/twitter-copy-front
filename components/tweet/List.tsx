import { FunctionComponent } from "react";
import Link from "next/link";
import { Tweet } from "../../types/Tweet";
import UserReferenceLinks from "../common/UserReferenceLinks";

interface Props {
  tweets: Tweet[];
}

export const List: FunctionComponent<Props> = ({ tweets }) => (
  <div>
    <h1>Tweet List</h1>
      <div className="my-3">
          <Link href="/tweets/create">
              <a className="btn btn-primary">Add new tweet</a>
          </Link>
      </div>
    <div>
        {tweets &&
        tweets.length !== 0 &&
        tweets.map((tweet) => (
            <div className="card" key={tweet["@id"]}>
                <div className="card-body">
                    <h5 className="card-title"><UserReferenceLinks items={tweet["createdBy"]} type="User" /></h5>
                    <span className="card-subtitle mb-2 text-muted"><i className="fa fa-calendar" aria-hidden="true"/><span
                        className="badge bg-secondary text-white ml-2">{tweet["createdAt"]}</span></span>
                    <p className="card-text mt-2">{tweet["content"]}</p>
                    <Link href={`${tweet["@id"]}/edit`}>
                        <a>
                            <i className="bi bi-pen" aria-hidden="true" />
                            <span className="sr-only">Edit</span>
                        </a>
                    </Link>
                </div>
            </div>
        ))}
    </div>
  </div>
);
