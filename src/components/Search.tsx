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
    <section>
      <div className="row justify-content-center m-5">
      <div className="col-6 align-self-center">
      <form onSubmit={onSubmit}>
        <input
          key={searchParams?.get('q')}
          type="text"
          name="search"
          placeholder="Buscar proyectos..."
          autoComplete="off"
          defaultValue={searchParams?.get('q') || ''}
          className="col-11 p-1"
        />
        <span className="col-1 p-2 bg-black text-white border rounded-end">
        <HiOutlineSearch/></span>
      </form>
      </div>
      </div>
    </section>
  );
}