import { DestinationResultList } from "@/components/destination-result-list/destination-result-list";
import { Button } from "@/components/shared/button/button";
import { useGetDataFromQuery } from "@/hooks/useGetDataFromQuery";
import { useGetDistance } from "@/hooks/useGetDistance";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Spinner } from "@/components/shared/spinner/spinner";
import { HOME_PAGE } from "@/routes/routes";

export const ResultsPage = () => {
  const location = useLocation();
  const { destinations, passengers, date } = useGetDataFromQuery(
    location.search
  );
  const { distances, totalDistance, error, isLoading } =
    useGetDistance(destinations);
  const navigation = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error.toString());
    }
  }, [error]);

  const onGoBack = () => navigation(`${HOME_PAGE}${location.search}`);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-[100vw] h-[100vh]">
        <div className="bg-white rounded-3xl pt-[78px] pb-[31px] px-[252px]">
          <Spinner className="mb-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="bg-white rounded-3xl pt-[30px] md:pt-[78px] pb-[22px] md:pb-[31px] px-4 md:px-[252px] w-full md:w-auto">
        {!error ? (
          <>
            <div className="relative flex justify-center">
              <DestinationResultList
                destinations={destinations}
                distances={distances}
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="mt-2">
                <span className="text-purple font-bold">
                  {totalDistance} km
                </span>{" "}
                is total distance
              </p>
              <p className="mt-2">
                <span className="text-purple font-bold">{passengers}</span>
                {` ${passengers === 1 ? "passenger" : "passengers"}`}
              </p>
              <p className="text-purple font-bold mt-2 mb-[28px]">
                {dayjs(date).format("MMM DD, YYYY")}
              </p>
            </div>
          </>
        ) : (
          <p className="my-[92px] font-bold text-purple">
            Oops! Something went wrong!
          </p>
        )}
        <div className="flex justify-center">
          <Button
            className="w-full mdw-auto"
            color="dark"
            variant="filled"
            onClick={onGoBack}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};
