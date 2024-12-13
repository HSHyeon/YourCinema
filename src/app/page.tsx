"use client";

import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import styles from "./Diary.module.css";
import Film from "./components/film/Film";
import Header from "./components/header/Header";
import { Diary } from "./types";

const fetchDiaries = async ({ pageParam = 1 }) => {
  const res = await fetch(`/api/diary?page=${pageParam}&limit=10`);
  if (!res.ok) {
    throw new Error("Error fetching diaries");
  }
  return res.json();
};

const Home = () => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const bottomRefCurrent = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["diaries"], fetchDiaries, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 10 ? pages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage && hasNextPage) {
          console.log("dd");
          fetchNextPage();
        }
      },
      { rootMargin: "100px" },
    );

    bottomRefCurrent.current = bottomRef.current;

    if (bottomRefCurrent.current) {
      observer.observe(bottomRefCurrent.current);
    }

    return () => {
      if (bottomRefCurrent.current) {
        observer.unobserve(bottomRefCurrent.current);
      }
    };
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <>
      <Header />
      <div className={styles.diary}>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error loading diaries</div>}
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((diary: Diary) => (
              <Film key={diary._id} diary={diary} />
            ))}
          </React.Fragment>
        ))}
        {isFetchingNextPage && <div>Loading more...</div>}
        <div ref={bottomRef}>last film</div>
      </div>
    </>
  );
};

export default Home;
