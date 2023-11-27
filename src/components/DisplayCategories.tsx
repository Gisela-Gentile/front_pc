"use client"
import { API_URL } from '@/config/constants';
import { Category } from '@/app/interfaces/Category';
import styles from '@/components/DisplayCategories.module.css'
import ListCategories from './ListCategories';
import { useEffect, useState } from 'react';

export default function DisplayCategories({format}:{format:string}) {
  
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
        try {
          const res = await fetch(`${API_URL}/category/view/all`);
          const data = await res.json();
          setCategories(data);
        } catch (error) {
            console.error('Error recuperando categorias', error);
        }
    };
    fetchCategories();
  }, []);
  
  return (
    <div className={styles.divContent}>
        <ul className={`${(format==='list-button')?'d-flex':''}`}>
        { 
            categories.length > 0 ? (<ListCategories list={categories} format={format}/>) : (
            <li className={styles.liNoResult} key={0}>No existen Categorias vigentes.</li>
            )
        }
        </ul> 
    </div>    
  )
}
