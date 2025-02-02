import React from 'react'
import styles from './singlePage.module.css';
import Menu from '@/components/Menu/Menu';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';

const getData = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("failed");
    }
    
    return res.json();
  }

const SinglePage = async ({params}) => {

   const { slug } = params;
   const data = await getData(slug);
    console.log(data);
  return (
    <div className={styles.container}>
        <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
            <h1 className={styles.title}>{data?.title}</h1>
               {data?.post.user.image && ( 
                <div className={styles.userImageContainer}>
                    <Image 
                    src={data?.post.user.image}
                    alt=''
                    fill
                    className={styles.avatar}
                />
                </div>
                )}
            <div className={styles.userTextContainer}>
                <span className={styles.username}>{data?.post.user.name}</span>
                <span className={styles.date}>{data?.post.createdAt.substring(0, 10)}</span>
            </div>
        </div>
        
           {data?.post.img && (
            <div className={styles.imageContainer}>
              <Image 
                src={data?.post.img}
                alt=''
                fill
                className={styles.image}
              />
            </div>
           )}
        </div>
        
        <div className={styles.content}>
            <div className={styles.post}>
                <div className={styles.description} dangerouslySetInnerHTML={{__html: data?.post.desc}}>
                {}
                </div>
                <div className={styles.comment}>
                    <Comments postSlug={slug} />
                </div>
            </div>
            <Menu />
        </div>
    </div>
  )
}

export default SinglePage