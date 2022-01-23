import Content from "@/components/Content";
import type { NextPage } from "next";
import styles from "../../styles/CategoryOrTag.module.css";
import contentStyles from "../../styles/Content.module.css";
import Author from "@/components/Author";
import { CollectionIcon, TagIcon } from "@heroicons/react/solid";
import Related from "@/components/Related";
import { useRouter } from "next/router";
import ArticlePreview from "@/components/Cards/ArticlePreview";
import Tag from "@/components/Tag";
import CategoryCard from "@/components/Cards/CategoryCard";
import Category from "@/components/Category";

const CategoryOrTagPage: NextPage = () => {
  const router = useRouter();

  const { ptype, slug } = router.query;
  return (
    <Content classNames="overflow-y-hidden">
      <div className={contentStyles.container}>
        <section className={contentStyles.contentContainer}>
          <div className={styles.titleContainer}>
            {ptype === "category" ? (
              <CollectionIcon className="h-5 w-5 self-center" />
            ) : (
              <TagIcon className="h-5 w-5 self-center" />
            )}
            <h2 className={contentStyles.contentTitle}>{slug}</h2>
          </div>

          <section className={styles.contentPreviewContainer}>
            <ArticlePreview className="border-b border-gray-600 pb-4" />
            <ArticlePreview className="border-b border-gray-600 pb-4" />
            <ArticlePreview className="border-b border-gray-600 pb-4" />
            <ArticlePreview className="border-b border-gray-600 pb-4" />
            <ArticlePreview className="border-b border-gray-600 pb-4" />
            <ArticlePreview className="border-b border-gray-600 pb-4" />
            <ArticlePreview className="border-b border-gray-600 pb-4" />
            <ArticlePreview className="border-b border-gray-600 pb-4" />
          </section>
        </section>
        <aside className={`${styles.asideContainer}`}>
          <Category
            isTag={ptype === "tag"}
            heading={`Discover More ${
              ptype === "category" ? "Categories" : "Tags"
            }`}
          />
        </aside>
      </div>
    </Content>
  );
};

export default CategoryOrTagPage;
