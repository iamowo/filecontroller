import http from ".";

export function getUncategorizedVideo(page, num) {
  return http({
    method: "GET",
    url: `/file/getUncategorizedVideo?page=${page}&num=${num}`,
  });
}

export function getUncategorizedImg(page, num) {
  return http({
    method: "GET",
    url: `/file/getUncategorizedImg?page=${page}&num=${num}`,
  });
}

export function getUncategorizedManga(page, num) {
  return http({
    method: "GET",
    url: `/file/getUncategorizedManga?page=${page}&num=${num}`,
  });
}

export function getUncategorizedMusic(page, num) {
  return http({
    method: "GET",
    url: `/file/getUncategorizedMusic?page=${page}&num=${num}`,
  });
}

export function getLength(type) {
  return http({
    method: "GET",
    url: `/file/getLength/${type}`,
  });
}
