import { useState, useEffect } from 'react';
import {
    Container,
    Box,
    Typography,
    Avatar
} from "@mui/material";
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

const Post = ({ post }) => {
    const [postContent, setPostContent] = useState("");

    const options = {
        overrides: {
            h1: {
                component: Typography,
                props: {
                    gutterBottom: true,
                    variant: 'h4',
                    component: 'h1'
                },
            },
            h2: {
                component: Typography,
                props: { 
                    gutterBottom: true, 
                    variant: 'h6', 
                    component: 'h2'
                },
            },
            h3: {
                component: Typography,
                props: { 
                    gutterBottom: true, 
                    variant: 'subtitle1'
                },
            },
            h4: {
                component: Typography,
                props: {
                    gutterBottom: true,
                    variant: 'caption',
                    paragraph: true
                },
            },
            p: {
                component: Typography,
                props: { 
                    paragraph: true,
                    sx: {
                        fontSize: "1.25rem"
                    }
                },
            },
            a: { 
                component: (props) => <Link to={props.href}>{props.children}</Link>
            },
            // li: {
            //     component: MarkdownListItem,
            // },
        },
    };

    useEffect(() => {
        import(`./posts/${post.title.replace(/ /g, "-")}.md`)
            .then(res => {
                fetch(res.default)
                    .then(response => response.text())
                    .then(response => setPostContent(response))
                    .catch(err => console.log(err))
            })
    }, [])

    return (
        <Container >
            <Box 
                sx={{
                    backgroundColor: "#2196f3",
                    color: "white",
                    padding: { xs: "1.5rem", lg: "4rem" },
                    mt: "0.5rem",
                    mb: "1.5rem",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3
                }}
            >
                <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: { xs: "2.25rem", md: "3rem" } }} >{post.title}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar>{`${post.author.split(" ")[0][0]}${post.author.split(" ")[1][0]}`}</Avatar>
                    <Typography variant="h6">{post.author}</Typography>
                </Box>
            </Box>
            <Container maxWidth="md" sx={{ mb: "100px" }}>
                <Markdown options={options}>
                    {postContent}
                </Markdown>
            </Container>
        </Container>
    )
}

export default Post