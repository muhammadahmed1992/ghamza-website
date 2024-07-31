"use client";
import React, { useEffect, useState } from "react";
import "./Hero.css";
import "../kid/Kid.css";
import { useSelector } from "react-redux";
import NavBarDetails from "@/components/NavBarDetails/NavBarDetails";
import VideoPlayer from "../slider/VideoPlayer";

const Hero = ({ projectData }) => {
  const [mediaData, setMediaData] = useState([]);
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const [lang, setLang] = useState(selectedLanguage === "ENG" ? "en" : "ar");

  useEffect(() => {
    if (selectedLanguage === "ENG") {
      setLang("en");
    } else {
      setLang("ar");
    }
  }, [selectedLanguage]);

  useEffect(() => {
    const extractMediaData = (jsonData) => {
      let extractedData = [];
      var url, name, releaseDate, id, category, thumbnail, uniqueID;
      if (jsonData?.data && Array.isArray(jsonData?.data)) {
        jsonData?.data[0]?.attributes?.shows?.data?.forEach((item) => {
          var filter = item?.attributes?.media?.data?.filter(
            (item) =>
              item?.attributes?.mime === "video/mp4" ||
              item?.attributes?.mime === "video/webm"
          );

          filter?.forEach((mediaItem) => {
            url = mediaItem?.attributes?.url;
            name = item?.attributes?.name;
            releaseDate = item?.attributes?.releaseDate;
            id = item.id;
            thumbnail = item?.attributes?.thumbnail?.data?.attributes?.url;
            category = "shows";
            uniqueID = item?.attributes?.uniqueID;
            extractedData.push({
              name,
              url,
              releaseDate,
              id,
              category,
              thumbnail,
              uniqueID,
            });
          });
        });

        jsonData?.data[0]?.attributes?.films?.data?.forEach((item) => {
          var filter = item?.attributes?.media?.data?.filter(
            (item) =>
              item?.attributes?.mime === "video/mp4" ||
              item?.attributes?.mime === "video/webm"
          );

          filter?.forEach((mediaItem) => {
            url = mediaItem?.attributes?.url;
            name = item?.attributes?.name;
            releaseDate = item?.attributes?.releaseDate;
            id = item.id;
            thumbnail = item?.attributes?.thumbnail?.data?.attributes?.url;
            category = "films";
            uniqueID = item?.attributes?.uniqueID;
            extractedData.push({
              name,
              url,
              releaseDate,
              id,
              category,
              thumbnail,
              uniqueID,
            });
          });
        });

        jsonData?.data[0]?.attributes?.documentaries?.data?.forEach((item) => {
          var filter = item.attributes.media.data?.filter(
            (item) =>
              item.attributes.mime === "video/mp4" ||
              item?.attributes?.mime === "video/webm"
          );

          filter?.forEach((mediaItem) => {
            url = mediaItem?.attributes.url;
            name = item?.attributes.name;
            releaseDate = item?.attributes.releaseDate;
            thumbnail = item?.attributes.thumbnail?.data?.attributes.url;
            id = item.id;
            category = "documentaries";
            uniqueID = item?.attributes?.uniqueID;
            extractedData.push({
              name,
              url,
              releaseDate,
              id,
              category,
              thumbnail,
              uniqueID,
            });
          });
        });

        jsonData?.data[0]?.attributes?.musics?.data?.forEach((item) => {
          var filter = item?.attributes.media.data?.filter(
            (item) =>
              item?.attributes.mime === "video/mp4" ||
              item?.attributes?.mime === "video/webm"
          );

          filter?.forEach((mediaItem) => {
            url = mediaItem?.attributes.url;
            name = item?.attributes.name;
            releaseDate = item?.attributes.releaseDate;
            thumbnail = item?.attributes.thumbnail.data.attributes.url;
            id = item.id;
            category = "music";
            uniqueID = item?.attributes?.uniqueID;
            extractedData.push({
              name,
              url,
              releaseDate,
              id,
              category,
              thumbnail,
              uniqueID,
            });
          });
        });
        jsonData?.data[0]?.attributes?.lives?.data?.forEach((item) => {
          var filter = item?.attributes?.media.data?.filter(
            (item) =>
              item?.attributes?.mime === "video/mp4" ||
              item?.attributes?.mime === "video/webm"
          );

          filter?.forEach((mediaItem) => {
            url = mediaItem?.attributes?.url;
            name = item?.attributes?.name;
            releaseDate = item?.attributes?.releaseDate;
            thumbnail = item?.attributes?.thumbnail?.data?.attributes?.url;
            id = item.id;
            category = "lives";
            uniqueID = item?.attributes?.uniqueID;
            extractedData.push({
              name,
              url,
              releaseDate,
              id,
              category,
              thumbnail,
              uniqueID,
            });
          });
        });
      }
      const sortedData = [...extractedData].sort((a, b) =>
        a?.uniqueID.localeCompare(b?.uniqueID)
      );
      return sortedData;
    };

    const extractedMediaData = extractMediaData(projectData);
    setMediaData(extractedMediaData);
  }, [projectData]);

  return (
    <>
      <NavBarDetails />
      <VideoPlayer mediaData={mediaData} />
    </>
  );
};

export default Hero;
