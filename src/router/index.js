import { createBrowserRouter } from "react-router-dom";

import Home from "../views/home/home";
import MainView from "../views/secondViews/main/main";
import VideoView from "../views/secondViews/video/video";
import ImgsView from "../views/secondViews/imgs/imgs";
import MangaView from "../views/secondViews/manga/manga";
import SettingView from "../views/secondViews/setting/setting";
import MusicView from "../views/secondViews/music/music";
import UnCategorized from "../views/secondViews/uncategorized/uncategorized";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        path: "main",
        element: <MainView />,
      },
      {
        path: "videos",
        element: <VideoView />,
      },
      {
        path: "imgs",
        element: <ImgsView />,
      },
      {
        path: "mangas",
        element: <MangaView />,
      },
      {
        path: "musics",
        element: <MusicView />,
      },
      {
        path: "setting",
        element: <SettingView />,
      },
      {
        path: "uncategorized/:type",
        element: <UnCategorized />,
      },
    ],
  },
]);

export default router;
