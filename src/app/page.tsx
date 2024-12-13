"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import styles from "./Diary.module.css";
import Film from "./components/Film";
import Header from "./components/Header";
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

  // Intersection Observer로 페이지가 바닥에 가까워지면 fetchNextPage 호출
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage && hasNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "100px" }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <>
      <Header />{" "}
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
        <div ref={bottomRef}></div>
      </div>
    </>
  );
};

export default Home;
