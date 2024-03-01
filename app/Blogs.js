// Next.js components
import React from 'react';
import { gql, GraphQLClient } from 'graphql-request';

export default function Blogs({ blogs }) {
    return (
        <div>
            {blogs.map((blog) => (
                <div key={blog.id}>
                    <h4>{blog.title}</h4>
                    <p>Author: {blog.author.node.name}</p>
                </div>
            ))}
        </div>
    );
}

// This function runs at build time in production
// and will pre-render the page with the blogs data
export async function getStaticProps() {
    const graphQLClient = new GraphQLClient('https://wordpress-1223464-4354486.cloudwaysapps.com/graphql', {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const query = gql`
        {
            posts {
                nodes {
                    id
                    title
                    author {
                        node {
                            name
                        }
                    }
                }
            }
        }
    `;

    const data = await graphQLClient.request(query);
    const blogs = data.posts.nodes;

    return {
        props: {
            blogs,
        },
        revalidate: 10, // In seconds, you can adjust this value based on how often you expect the data to change
    };
}
