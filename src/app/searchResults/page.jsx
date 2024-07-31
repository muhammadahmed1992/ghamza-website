"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import utils from "@/util/utils";
import SearchResultsItem from "@/components/searchResultsItems/SearchResultsItem";
import { setLastQuery, setSearchResults } from "@/redux/searchResultsSlice";

const SearchResults = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const searchResults = useSelector((state) => state.searchResults.results);
  const lastQuery = useSelector((state) => state.searchResults.lastQuery);
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;

    dispatch(setSearchResults([]));

    const types = ["shows", "films", "lives", "documentaries", "musics"];
    const allResults = [];

    const lang = selectedLanguage === "ENG" ? "en" : "ar";

    try {
      for (const type of types) {
        const response = await fetch(
          `${utils.BASE_URL}${type}?populate=*&locale=${lang}&filters[name][$containsi]=${searchQuery}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${utils.token}`,
            },
          }
        );
        const results = await response.json();
        if (results && results.data) {
          allResults.push(...results.data);
        }
      }

      dispatch(setSearchResults(allResults));
      dispatch(setLastQuery(searchQuery));
      setSearchQuery("");
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="mt-[73.59px] lg:mt-[108px] min-h-[100vh]">
      <div className="searchbar h-[100px] sm:h-[120px] md:h-[140px] lg:h-[160px] xl:h-[180px] bg-pink flex items-center">
        <form
          onSubmit={handleSearchSubmit}
          className="w-full mx-4 sm:mx-[42px]"
        >
          <input
            dir={`${selectedLanguage === "ENG" ? "ltr" : "rtl"}`}
            type="text"
            placeholder={lastQuery ? `${lastQuery}` : "Search"}
            value={searchQuery}
            onChange={handleSearchInputChange}
            className={`w-full p-4 text-5xl bg-pink text-white placeholder-[#fff] placeholder-opacity-50 outline-none ${
              selectedLanguage === "ENG" ? "font-custom1" : "font-custom3"
            }`}
          />
        </form>
      </div>
      <div
        dir={`${selectedLanguage === "ENG" ? "ltr" : "rtl"}`}
        className={`mx-[16px] sm:mx-[42px] ${
          selectedLanguage === "ENG" ? "font-custom1" : "font-custom3"
        }`}
      >
        {searchResults.length === 0 ? (
          <>
          <h6 className="uppercase px-2 py-[39px] text-[13px] border-b border-black">
            {selectedLanguage === "ENG"
              ? `We found ${searchResults.length} results:`
              : `وجدنا ${searchResults.length} نتائج:`}
          </h6>
          {/* <div className="py-20"></div> */}
              </>
        ) : (
          <h6 className="uppercase px-2 py-[39px] text-[13px] lg:text-[15px] border-b border-black">
            {selectedLanguage === "ENG"
              ? `We found ${searchResults.length} results:`
              : `وجدنا ${searchResults.length} نتائج:`}
          </h6>
        )}
        <div className="md:mx-10">
          {searchResults?.map((item, index) => (
            <div key={item.id}>
              <SearchResultsItem
                length={searchResults?.length}
                index={index}
                item={item}
                id={item?.id}
                name={item?.attributes?.name}
                category={item?.attributes?.category?.data?.attributes?.name}
                promoText={item?.attributes?.promoText}
                thumbnailImg={
                  item?.attributes?.thumbnail?.data?.attributes?.url
                }
                result={searchResults}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
