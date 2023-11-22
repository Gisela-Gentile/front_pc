import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({ breadcrumbs,}: {  breadcrumbs: Breadcrumb[];}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="mt-3" style={{listStyleType: "none",display:"flex",flexDirection:"row"}}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={`${ breadcrumb.active ? ('text-primary') : ('text-secondary')}`}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
