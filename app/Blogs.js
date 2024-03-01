import React, { useEffect, useState } from 'react'

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('https://wordpress-1223464-4354486.cloudwaysapps.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                {
                    posts {
                        nodes{
                            title
                            author {
                                node {
                                    name
                                }
                            }
                        }
                    }
                }`
            })
        }).then(res => res.json())
        .then(res => {
            console.log(res)
            setBlogs(res.data.posts.nodes)
        })
    }, [])

    return (
        <div>
            {blogs.map(blog =>
                <div key={blog.id}>
                    <h4>{blog.title}</h4>
                    <p>Author: {blog.author.node.name}</p>
                </div>
            )}
        </div>
    );
}

export default Blogs
