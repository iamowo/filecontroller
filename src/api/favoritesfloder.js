import http from ".";

export function getOneType(type) {
  return http({
    method: "GET",
    url: `/ff/getOneType?page=${type}`,
  });
}
