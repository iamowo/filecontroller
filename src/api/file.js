import http from ".";

export function getUncategorizedVideo(page, num) {
  return http({
    method: "GET",
    url: `/getUncategorizedVideo?page=${page}&num=${num}`
  });
}

export function getUncategorizedImg(page, num) {
  return http({
    method: "GET",
    url: `/getUncategorizedImg?page=${page}&num=${num}`
  });
}

export function getUncategorizedManga(page, num) {
  return http({
    method: "GET",
    url: `/getUncategorizedManga?page=${page}&num=${num}`
  });
}

export function getUncategorizedMusic(page, num) {
  return http({
    method: "GET",
    url: `/getUncategorizedMusic?page=${page}&num=${num}`
  });
}

export function getLength(type) {
  return http({
    method: "GET",
    url: `/getLength/${type}`
  });
}

