// 다이어리 아이템 타입
export interface Diary {
  _id: string; // MongoDB의 자동 생성된 ID
  uri: string; // 미디어 파일 경로
  creation_timestamp: number; // 생성된 시간 (UNIX 타임스탬프)
  media_metadata: MediaMetadata; // 미디어 관련 메타데이터
  title: string; // 다이어리 제목
  text: string;
  cross_post_source: CrossPostSource; // 외부 앱 정보
}

// 미디어 메타데이터
export interface MediaMetadata {
  video_metadata: VideoMetadata;
  camera_metadata: CameraMetadata;
}

// 비디오 메타데이터
export interface VideoMetadata {
  exif_data: ExifData[];
}

// EXIF 데이터
export interface ExifData {
  device_id: string; // 장치 ID
  camera_position: string; // 카메라 위치 (전면/후면)
  date_time_original: string; // 원본 날짜와 시간
  source_type: string; // 소스 유형
}

// 카메라 메타데이터
export interface CameraMetadata {
  has_camera_metadata: boolean; // 카메라 메타데이터 여부
}

// 외부 포스트 출처 정보
export interface CrossPostSource {
  source_app: string; // 소스 앱 (예: "FB"는 Facebook)
}

// API 응답에서 반환되는 데이터 타입
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}
