import Link from "next/link"
import LikeButton from "./LikeButton"

const fetchPosts = () =>{
    return fetch('direcccion url')
    .then(res => res.json())
}

export async function ListsOfPost() {
    const posts = await fetchPosts()
    return (
        <>
            {
                posts.slice(0,5).map((post:{id:string,title:string,body:string})=>(
                    <article key={post.id}>
                        <Link href='/posts/[id]'as={`/posts/${post.id}`}>
                            <h2 style={{color:'#09f'}}>{post.title}</h2>
                            <p>{post.body}</p>
                            <LikeButton id={post.id}/>
                        </Link>
                    </article>
                ))
            }
        </>
    )
}