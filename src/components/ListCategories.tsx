
import { Category } from '@/app/interfaces/Category';
import styles from '@/components/DisplayCategories.module.css'


export default function ListCategories({list,format}:{list:Category[],format:string}) {
  return (
    <>
      { 
        list.length > 0 ? 
        (
          list.map((category: Category) => (
            <li className={`${(format==='list-button')?'listButton':''}`} key={category.categoryId}>
            { (format==='list-button') ? 
              (<button type="button" className="btn btn-outline-secondary btn-sm text-capitalize">{category.name}</button>) : 
              (<div className={styles.defaultLiTitle}>{category.name}</div>)
            }
            </li>
          ))
        ):''
      }
    </>
  )
}


