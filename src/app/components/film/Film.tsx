import React, { useEffect, useState, useRef } from "react";
import styles from "./Film.module.css";
import { Diary } from "../../types";

interface DiaryProps {
  diary: Diary;
}

const Film = ({ diary }: DiaryProps) => {
  const [isValid, setIsValid] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal 외부 클릭을 감지하기 위한 ref
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleError = () => {
    setIsValid(false);
  };

  const handleDelete = () => {
    console.log("삭제", diary._id);
    setIsModalOpen(false); // 삭제 후 모달 닫기
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false); // 모달 외부 클릭 시 닫기
    }
  };

  useEffect(() => {
    // 모달이 열렸을 때만 외부 클릭을 감지하는 이벤트 리스너 추가
    if (isModalOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, [isModalOpen]);

  const handleToggleModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // 버튼 클릭 시 부모로 이벤트 전파되지 않도록 방지
    setIsModalOpen((prevState) => !prevState); // 모달 열기/닫기
  };

  const fileExtension = diary.uri ? diary.uri.split(".").pop() : "";
  const formattedDate = new Date(
    diary.creation_timestamp * 1000,
  ).toLocaleString();

  if (!isValid) {
    return null;
  }

  return (
    <>
      <div className={styles.filmStrip}>
        <div className={styles.filmFrame}>
          <div className={styles.filmHeader}>
            <p>{diary.title}</p>
            <div className={styles.selectWrapper}>
              <button
                className={styles.deleteButton}
                onClick={handleToggleModal} // 모달 토글
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <circle cx="12" cy="6" r="1.5" fill="white" />
                  <circle cx="12" cy="12" r="1.5" fill="white" />
                  <circle cx="12" cy="18" r="1.5" fill="white" />
                </svg>
              </button>

              {/* 모달이 열릴 때만 표시 */}
              {isModalOpen && (
                <div
                  className={styles.modal}
                  ref={modalRef} // 모달 영역 참조
                  onClick={handleDelete} // 삭제 버튼
                >
                  삭제
                </div>
              )}
            </div>
          </div>
          <div key={diary.uri}>
            <div className={styles.content}>
              {diary.uri ? (
                fileExtension === "mp4" ||
                fileExtension === "mov" ||
                fileExtension === "avi" ? (
                  <video
                    className={styles.storyVideo}
                    src={diary.uri}
                    controls
                    onError={handleError}
                  />
                ) : (
                  <img
                    className={styles.storyImg}
                    src={diary.uri}
                    alt="Story Image"
                    onError={handleError}
                  />
                )
              ) : (
                <p>
                  {diary.text?.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <br />}
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              )}
            </div>
            <p className={styles.dateText}>{formattedDate}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Film;
