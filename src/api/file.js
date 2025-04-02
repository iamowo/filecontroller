import http from ".";

export default function getAllUncategorized() {
  return http({
    method: "GET",
    url: "/getAllUncategorized",
  });
}
