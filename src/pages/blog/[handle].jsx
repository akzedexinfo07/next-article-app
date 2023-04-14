// pages/blog/[handle].jsx
import {
  builder,
  BuilderComponent,
  BuilderContent,
  useIsPreviewing,
} from "@builder.io/react";
import Head from "next/head";
import DefaultErrorPage from "next/error";
import React from "react";

builder.init("d7b5ee24982f4bd2bc2198e70d465e8a");

function BlogArticle({ article }) {
  const isPreviewing = useIsPreviewing();
  if (!article && !isPreviewing) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  return (
    <BuilderContent
      content={article}
      options={{ includeRefs: true }}
      model="blog-article"
    >
      {(data, loading, fullContent) => (
        <React.Fragment>
          <Head>
            {/* Render meta tags from custom field */}
            <title>{data?.title}</title>
            <meta name="description" content={data?.blurb} />
            <meta name="og:image" content={data?.image} />
          </Head>

          <div>
            <div>{data?.title}</div>
            {/* Render the Builder drag/drop'd content */}
            <BuilderComponent
              name="blog-article"
              content={fullContent}
              options={{ includeRefs: true }}
            />
          </div>
        </React.Fragment>
      )}
    </BuilderContent>
  );
}

export async function getStaticProps({ params }) {
  const article = await builder
    .get("blog-article", {
      // Include references, like our `author` ref
      options: { includeRefs: true },
      query: {
        // Get the specific article by handle
        "data.handle": params.handle,
      },
    })
    .promise() || null;

  return {
    props: {
      article,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default BlogArticle;
