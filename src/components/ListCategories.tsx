import { API_URL } from '@/config/constants';
import { Category } from '@/app/interfaces/Category';
import styles from '@/components/ListCategories.module.css'
async function fetchCategories() {
  const res = await fetch(`${API_URL}/category/view/all`);
  const data = await res.json();
  return data;
}

async function ListCategories() {
  const categories = await fetchCategories();
  return (
    <section className='p-4'>      
      <div className='row'>
        <div className='col-md-1'><h5>Categorías</h5></div>
        <div className='col-md-11'>
          <ul className={styles.defaultItemList}>
            { 
              categories.length > 0 ? (
              categories.map((category: Category) => (
                <li key={category.categoryId}>
                  <button type="button" className="btn btn-outline-secondary btn-sm text-capitalize">{category.name}</button>
                </li>))
              ) : (
              <li key={0}>No existen Categorias vigentes.</li>
              )
            }
          </ul> 
        </div>
      </div>
    </section>
  )
}

export default ListCategories;
