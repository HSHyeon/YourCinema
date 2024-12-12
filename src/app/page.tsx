"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./Diary.module.css";
import Film from "./components/Film";

const Diary = () => {
  const [diaries, setDiaries] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 데이터를 불러오는 함수
  const fetchDiaries = (page: number) => {
    setLoading(true);
    fetch(`/api/diary?page=${page}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setDiaries((prev) => [...prev, ...data]); // 기존 다이어리에 새로운 다이어리 추가
        setLoading(false);
        console.log("ghcnf");
      })
      .catch((error) => {
        console.error("Error fetching diaries:", error);
        setLoading(false);
      });
  };

  // 페이지가 처음 로드될 때 데이터를 가져오기
  useEffect(() => {
    fetchDiaries(page);
  }, [page]);

  // 스크롤 이벤트로 무한 스크롤 구현
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1); // 페이지 증가
        }
      },
      {
        rootMargin: "100px", // 100px 윈도우 바닥이 가까워지면 트리거
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current); // observer가 마지막 다이어리를 감지하도록 설정
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [loading]);

  return (
    <div className={styles.diary}>
      {diaries.map((diary, index) => (
        <Film key={index} diary={diary} />
      ))}
      {loading && <div>Loading...</div>}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default Diary;
