import { builder, BuilderComponent } from '@builder.io/react'

builder.init('d7b5ee24982f4bd2bc2198e70d465e8a')

export const getStaticProps = async (context) => {
  // Dynamically fetch latest content from Builder.io API, so you can publish updates without
  // codebase changes
  const content = await builder.get('skill', { url: context.resolvedUrl }).promise();
  console.log("CONTENT", content)
  return { props: { content } }
}

// View full integration options and docs here: https://builder.io/c/docs/developers
export default function MyCompoennt(props) {
  return <BuilderComponent
    content={props.content}
    model="skill" />
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}