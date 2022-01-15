import Link from "next/link";
import {Fragment, FunctionComponent, useState} from "react";
import {fetch} from "../../utils/dataAccess";

interface Props {
  items: string | string[];
  type: string;
  useIcon?: boolean;
}

const fetchUserReference = async (resourceIri: string) => {
  return await fetch(resourceIri);
}

const UserReferenceLinks: FunctionComponent<Props> = ({
  items,
  type,
  useIcon = false,
}) => {
  if (Array.isArray(items)) {
    return (
      <Fragment>
        {items.map((item, index) => {
          item = item.replace(/\/api/g, '');
          return (
          <div key={index}>
            <UserReferenceLinks items={item} type={type} />
          </div>
        )})}
      </Fragment>
    );
  }

  const [ref, setRef] = useState(items);
  items = items.replace(/\/api/g, '');

  fetchUserReference(items).then((res) => {
    setRef(res.username)
  })

  return (
    <Link href={items}>
      <a>
        {useIcon ? (
          <Fragment>
            <i className="bi bi-search" aria-hidden="true"></i>
            <span className="sr-only">Show</span>
          </Fragment>
        ) : (
          ref
        )}
      </a>
    </Link>
  );
};

export default UserReferenceLinks;
