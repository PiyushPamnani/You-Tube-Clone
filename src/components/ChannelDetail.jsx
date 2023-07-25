import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { apiFetching } from "../utils/apiFetching";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  console.log(channelDetail, videos);
  useEffect(() => {
    apiFetching(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );

    apiFetching(`search?channelId=${id}&part=snippet&order=date`).then((data) =>
      setVideos(data?.items)
    );
  }, [id]);

  return (
    <Box minHeight="91vh">
      <Box>
        {channelDetail?.brandingSettings?.image?.bannerExternalUrl ? (
          <CardMedia
            image={channelDetail?.brandingSettings?.image?.bannerExternalUrl}
            alt={channelDetail?.snippet?.title}
            sx={{ height: "300px" }}
          />
        ) : (
          <div
            style={{
              background: "linear-gradient(to bottom right, #7028e4, #ffc107)",
              zIndex: 10,
              height: "300px",
            }}
          />
        )}
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
