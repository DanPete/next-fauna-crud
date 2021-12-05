import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import { Header, Snippet } from "components";

export default function Home() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: snippets, mutate } = useSWR("/api/snippets", fetcher);

  return (
    <div>
      <Head>
        <title>Snippet App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="my-12">
          <Header
            title="WebDev Code Snippets"
            subtitle="Create and browse snippets in Web Development"
          />
        </div>
        {snippets &&
          snippets.map((snippet) => (
            <Snippet
              key={snippet.id}
              snippet={snippet}
              snippetDeleted={mutate}
            />
          ))}
      </main>
    </div>
  );
}
