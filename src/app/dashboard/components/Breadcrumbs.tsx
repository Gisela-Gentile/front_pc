import Link from 'next/link';
import styles from "@/app/dashboard/components/Breadcrumbs.module.css"
interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({ breadcrumbs,}: { breadcrumbs: Breadcrumb[];}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className= {styles.ol}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={`${ breadcrumb.active ? ('text-primary') : ('text-secondary')}`}
          >
            <Link className={`${ breadcrumb.active ? ('link-primary') : ('link-secondary')}`} href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
