import Image from "next/image";

// JSONPlaceholder APIのベースURL
const API_URL = "https://jsonplaceholder.typicode.com/";

/**
 * 写真一覧を取得・表示するコンポーネント
 * JSONPlaceholder APIから写真データを取得し、サムネイル画像を表示
 */
export async function GetPhotos() {
  // JSONPlaceholder APIから写真データを取得
  const res = await fetch(API_URL + "/photos");
  /** @type {Promise} */
  const json = await res.json();
  const photos = json;

  // デバッグ用：最初の写真データをコンソールに出力
  console.log(photos[0]);

  return (
    <div>
      {/* データソースの表示 */}
      <div>
        from{" "}
        <a href="https://jsonplaceholder.typicode.com/" target="_blank">
          JSONPlaceholder
        </a>
      </div>
      
      {/* 写真のサムネイル一覧を表示 */}
      <div>
        {photos.map((photo, index) => {
          // 最初の100枚のみ表示（パフォーマンス考慮）
          if (index > 100) return;
          return (
            <span key={photo.albumId + "_" + photo.id}>
              <Image
                src={photo.thumbnailUrl}
                width={100}
                height={100}
                alt={photo.title}
                quality={80}
                priority={true}
              ></Image>
            </span>
          );
        })}
      </div>
    </div>
  );
}
