import React, {useState, useEffect} from 'react';
import './Feed.css'
import Card from "../Card/Card";

const Feed = () => {
    const [feeds, updateFeeds] = useState({nextPage: 1, posts: []})

    const debounce = (fn, d) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, d)
        }
    }

    const alert = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            fetch(`https://api.unsplash.com/photos/?page=${feeds.nextPage}&client_id=zMrt7EL6xz0a4VxaXGgdnBn6aveO2Q8E23O6bA6scSo`)
                .then(response => response.json())
                .then(data => {
                    const {posts, nextPage} = feeds;
                    console.log("Calling update feeds to set page ", {
                        nextPage: (nextPage + 1),
                        posts: [...posts, ...data]
                    })
                    updateFeeds({nextPage: (nextPage + 1), posts: [...posts, ...data]});
                })
        }
    }

    let getAlert = debounce(alert, 1000);

    useEffect(() => {
        alert();
        window.addEventListener('scroll', () => {
            getAlert()
        })
        return () => {
            window.removeEventListener('scroll', () => {
            })
        }
    }, [])


    return (<div className='app-feed'>
        {
            feeds.posts.map((post) => <Card key={post.id} caption={post.alt_description} image={post.links.download}/>)
        }
    </div>)
}

export default Feed;