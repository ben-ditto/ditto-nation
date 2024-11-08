import Link from "next/link";
import { NextSeo } from "next-seo";

//Data Fetching
import { useQuery, dehydrate, QueryClient } from "@tanstack/react-query";
import { patreonRequestClient } from "src/lib/clients/axiosClient";
//Layout
import { getLayout } from "components/Layout/Layout";

type SHOW = {
  id: string;
  type: string;
  attributes: {
    content: string;
    title: string;
    url: string;
  };
};

const ShowsPage = ({ data }) => {
  const posts = data.postData.data as SHOW[];

  const PATTERN = "DITTO NATION",
    filtered = posts.filter((str: any) => {
      return str.attributes.title.includes(PATTERN);
    });

  filtered.sort(function (a, b) {
    return parseFloat(b.id) - parseFloat(a.id);
  });

  console.log("shows", posts);

  return (
    <>
      <NextSeo
        title={"All Shows"}
        description={"Display All Shows"}
        openGraph={{
          type: "website",
          title: "All Shows",
          description: "Display All Shows",
        }}
      />
      <div className="absolute top-0 left-0 !w-screen">
        {filtered.length > 0 ? (
          filtered.map((post, idx) => {
            return (
              <Link
                key={idx}
                passHref
                href={`https://patreon.com${post.attributes.url}`}
              >
                <a target="_blank">
                  <article
                    key={idx}
                    className="w-full py-6 px-8 text-2xl hover:bg-pink border-b border-black transition-all duration-200 ease-in-out"
                  >
                    <h2 className="uppercase font-bold">
                      {post.attributes.title}
                    </h2>
                    {/* <p>{post.attributes.content}</p> */}
                  </article>
                </a>
              </Link>
            );
          })
        ) : (
          <h2 className="text-center">No Posts Yet</h2>
        )}
      </div>
    </>
  );
};

ShowsPage.getLayout = getLayout;

export const getStaticProps = async () => {
  const res = await patreonRequestClient.get(
    `https://www.patreon.com/api/oauth2/v2/campaigns/6702424/posts?fields${encodeURIComponent(
      "[post]"
    )}=url,title,content`
  );
  const postData = res.data;

  return {
    props: {
      data: {
        postData: postData,
      },
    },
    revalidate: 10,
  };
};

export default ShowsPage;
