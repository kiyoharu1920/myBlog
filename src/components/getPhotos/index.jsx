"use client";

import Image from "next/image";

const API_URL = "https://jsonplaceholder.typicode.com/";

export async function GetPhotos() {
  const json = await fetch(API_URL + "/photos");
  const /** @type {Promise} */ photos = await json.json();

  console.log(photos[0]);

  return (
    <div>
      {photos.map((photo, index) => {
        //if (index > 10) return;
        return (
          <span key={photo.albumId + "_" + photo.id}>
            <Image
              src={photo.thumbnailUrl}
              width={150}
              height={150}
              alt={photo.title}
            ></Image>
          </span>
        );
      })}
    </div>
  );
}
