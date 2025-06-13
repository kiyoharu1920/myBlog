"use client";

import Image from "next/image";
const API_URL = "https://jsonplaceholder.typicode.com/";

export async function GetPhotos() {
  const res = await fetch(API_URL + "/photos");
  const json = await res.json();
  const /** @type {Promise} */ photos = await json.json();

  console.log(photos[0]);

  return (
    <div>
      <div>from <a href="https://jsonplaceholder.typicode.com/" target="_blank">JSONPlaceholder</a></div>
      <div>
        {photos.map((photo, index) => {
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
