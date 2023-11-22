"use client";

import { useRouter } from "next/navigation";

export default function CreateCategoryButton() {
  const router = useRouter();   
    return (
    <button
      onClick={() =>router.push("/dashboard/category/add")}
      className="rounded border bg-black px-4 py-1 text-center text-white m-4"
    >
      Crear Categoria Nueva
    </button>
  );
}
