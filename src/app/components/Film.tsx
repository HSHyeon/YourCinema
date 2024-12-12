import React, { useEffect, useState } from "react";
import styles from "./Film.module.css";
import { Diary } from "../types";

interface DiaryProps {
  diary: Diary;
}
const Film = ({ diary }: DiaryProps) => {
  const [isValid, setIsValid] = useState(true);

  const handleError = () => {
    setIsValid(false);
  };

  const handleDelete = () => {
    console.log("삭제", diary._id);
  };

  useEffect(() => {
    if (!isValid) {
      return;
    }
  }, [isValid]);

  if (!isValid) {
    return null;
  }

  const fileExtension = diary.uri ? diary.uri.split(".").pop() : "";
  const formattedDate = new Date(
    diary.creation_timestamp * 1000
  ).toLocaleString();

  return (
    <>
      <div className={styles.filmStrip}>
        <div className={styles.filmFrame}>
          <div className={styles.filmHeader}>
            <p>{diary.title}</p>
            <button className={styles.deleteButton} onClick={handleDelete}>
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
