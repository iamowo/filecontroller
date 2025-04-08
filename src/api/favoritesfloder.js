import http from ".";

export function getOneType(type) {
  return http({
    method: "GET",
    url: `/ff/getOneType/${type}`,
  });
}

export function addOneFolder(data) {
  return http({
    method: "POST",
    url: `/ff/addOneFolder`,
    data: data,
  });
}
