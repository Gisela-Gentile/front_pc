'use client';
import { createUrl } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { HiOutlineSearch } from "react-icons/hi";

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
    <form onSubmit={onSubmit} className="col-md-12 text-center m-5">
      <input
        key={searchParams?.get('q')}
        type="text"
        name="search"
        placeholder="Buscar proyectos..."
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="col-md-7"
      />
      <span className="absolute m-3 flex h-full items-center">
      <HiOutlineSearch/></span>
    </form>
  );
}