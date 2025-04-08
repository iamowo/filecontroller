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

// 此类待分类文件个数
export function getLength(type) {
  return http({
    method: "GET",
    url: `/file/getLength/${type}`,
  });
}

// 分类一个文件
export function cateorizeOneFile(type) {
  return http({
    method: "POST",
    url: `/file/cateorizeOneFile/${type}`,
  });
}

// 批量处理
// title默认文件名 ， intro为空， tag 一样， 处于同一个收藏夹中
export function cateorizeFiles(type) {
  return http({
    method: "POST",
    url: `/file/cateorizeOneFile/${type}`,
  });
}
