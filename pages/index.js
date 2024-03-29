import { getSession } from "next-auth/client";
import Head from "next/head";

import Feed from "../components/Feed/Feed";
import Header from "../components/Header/Header";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar/Sidebar";
import Widgets from "../components/Widgets/Widgets";
import { db } from "../firebase";

export default function Home({ session, posts }) {
 
  if (!session) return <Login />;
  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook</title>
      </Head>

      {/* Header */}
      <Header />
    
      <main className="flex">
        {/* Side bar */}
        <Sidebar />
        {/* Feed */}
        <Feed posts={posts} />
        {/* Widgets */}
        <Widgets />
      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  // Get the user
  const session = await getSession(context);
  const posts = await db.collection("posts").orderBy("timestamp", "desc").get();
  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));

  return {
    props: { session, posts: docs },
  };
}
