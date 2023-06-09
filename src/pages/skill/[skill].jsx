import React from 'react';
import { useRouter } from 'next/router';
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';

// Replace with your Public API Key
builder.init("d7b5ee24982f4bd2bc2198e70d465e8a");

export async function getStaticProps({ params }) {
  // Fetch the builder content
  const page = await builder
    .get('skill', {
      userAttributes: {
        urlPath: '/' + (params?.page?.join('/') || ''),
      },
    })
    .toPromise();

  return {
    props: {
      page: page || null,
    },
    revalidate: 5
  };
}

export async function getStaticPaths() {
  // Get a list of all pages in builder
  const pages = await builder.getAll('skill', {
    // We only need the URL field
    fields: 'data.url', 
    options: { noTargeting: true },
  });


  return {
    paths: pages.map(page => `${page.data?.url}`),
    fallback: true,
  };
}

export default function Page({ page }) {

  console.log("SKILL", page)

  const router = useRouter();
  const isPreviewing = useIsPreviewing();

  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>{page?.data.title}</title>
      </Head>
      {/* Render the Builder page */}
      <BuilderComponent model="skill" content={page} />
    </>
  );
}