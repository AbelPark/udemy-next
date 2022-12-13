import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-util.js";

export default function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug ?? [0, 0];
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // 서버사이드에서 pre-render시에 useRouter가 동작하지 않아 초기값이 filterData가 [0,0]으로 잡히고,
  // 해당 값이 캐싱되어 스크린이 포커스 되어 re-flesh되기 전까지 [0,0]에 해당하는 결과가 나온다.
  // 쿼리 키값을 filterData 즉, 서버사이드에서 호출했던 값이 아닌, 클라이언트사이드에서 호출한 최신 값에 맞춰주면
  // 문제 해결됨
  const { data, isLoading } = useQuery(["filteredEvents", filterData], () =>
    getFilteredEvents({ year: numYear, month: numMonth })
  );

  const pageHeaderData = (
    <Head>
      <title>filtered event</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}`}
      />
    </Head>
  );

  if (isLoading) {
    return (
      <>
        {pageHeaderData}
        <p className="center">Loading...</p>;
      </>
    );
  }

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        {pageHeaderData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (!data || data.length === 0) {
    return (
      <>
        {pageHeaderData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeaderData}
      <Head>
        <title>filtered event</title>
        <meta name="description" content={`A list of filtered data`} />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={data} />
    </>
  );
}
