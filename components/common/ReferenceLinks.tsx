import Link from "next/link";
import {Fragment, FunctionComponent, useState} from "react";
import {fetch} from "../../utils/dataAccess";

interface Props {
  items: string | string[];
  type: string;
  useIcon?: boolean;
}

const fetchReference = async (resourceIri: string) => {
  const ref = await fetch(resourceIri);

  return { ref };
}

const ReferenceLinks: FunctionComponent<Props> = ({
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
            <ReferenceLinks items={item} type={type} />
          </div>
        )})}
      </Fragment>
    );
  }

  const [ref, setRef] = useState(items);
  items = items.replace(/\/api/g, '');

  fetchReference(items).then((res) => {
    console.log(res)})

  return (
    <Link href={items}>
      <a>
        {useIcon ? (
          <Fragment>
            <i className="bi bi-search" aria-hidden="true"></i>
            <span className="sr-only">Show</span>
          </Fragment>
        ) : (
          items
        )}
      </a>
    </Link>
  );
};

export default ReferenceLinks;
