import React from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../components/editor"), {
    ssr: false
});

const Home = () => {
    return (
        <>
            <h2>nextjs + ckeditor5</h2>
            <Editor />
        </>
    );
};

export default Home;
