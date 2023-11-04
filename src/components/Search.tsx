'use client';

import { createUrl } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const val = event.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }

  return (
    <form onSubmit={onSubmit} className="col-md-12 text-center">
      <input
        key={searchParams?.get('q')}
        type="text"
        name="search"
        placeholder="Search proyects..."
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className=""
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        icono
      </div>
    </form>
  );
}