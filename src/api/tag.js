import http from ".";

// 获取全部
export function allTag() {
  return http({
    method: "GET",
    url: "/tag/allTag",
  });
}

// 匹配tag
export function matchingTags(tag) {
  return http({
    method: "GET",
    url: `/tag/matchingTags/${tag}`,
  });
}
