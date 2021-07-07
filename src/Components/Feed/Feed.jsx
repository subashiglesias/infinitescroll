import React, {useState, useEffect} from 'react';
import './Feed.css'
import Card from "../Card/Card";

const Feed = () => {
    const [page, setPage] = useState(1)
    const [state, updateState] = useState({
        nextPage: 1,
        posts: [],
    })

    const debounce = (fn, d) => {
        let timer;
        return function () {
            let args = arguments
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, d)
        }
    }

    function alert() {
        alert("you're at the bottom of the page");
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {

            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                debounce(alert, 10)
            }

        })
    }, [])

    useEffect(() => {
        fetch(`https://api.unsplash.com/photos/?page=${state.nextPage}&client_id=zMrt7EL6xz0a4VxaXGgdnBn6aveO2Q8E23O6bA6scSo`)
            .then(response => response.json())
            .then(data => {
                const {posts, nextPage} = state;
                updateState({nextPage: nextPage + 1, posts: [...posts, ...data]});

            })
    }, [])
    console.log(state)


    return (<div className='app-feed'>
        {
            state.posts.map((post) => <Card key={post.id} caption={post.alt_description} image={post.links.download}/>)
        }
    </div>)
}

export default Feed;