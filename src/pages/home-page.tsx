import { useState, useReducer, SetStateAction, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/shared/button/button";
import { PassengersCounter } from "@/components/passengers-counter/passengers-counter";
import { getRandomId } from "@/utils/getRandomId";
import { DestinationFormList } from "@/components/destination-form-list/destination-form-list";
import { ReactComponent as AddIcon } from "@/assets/icons/add-icon.svg";
import { DatePicker } from "@/components/shared/date-picker/date-picker";
import { CityType, DestinationType } from "@/types";
import dayjs from "dayjs";
import { getQueryStringFromObject } from "@/utils/getQueryStringFromObject";
import { RESULTS_PAGE } from "@/routes/routes";
import { useGetDataFromQuery } from "@/hooks/useGetDataFromQuery";

enum Cases {
  ADD = "ADD",
  REMOVE = "REMOVE",
  CLEAR = "CLEAR",
  SELECT = "SELECT",
  REPLACE = "REPLACE",
}

const initialDestinations: DestinationType[] = [
  {
    id: getRandomId(),
  },
  {
    id: getRandomId(),
  },
];

const reducer = (
  state: DestinationType[],
  action: Record<
    string,
    DestinationType[] | string | Record<string, string | number>
  >
) => {
  switch (action.type) {
    case Cases.ADD:
      return [...state, { id: getRandomId() }];
    case Cases.REMOVE:
      return state.filter((item) => item.id !== action.id);
    case Cases.SELECT:
      return state.map((item) => {
        if (item.id !== action.id) return item;
        return {
          ...item,
          ...(action.value as Record<string, string | number>),
        };
      });
    case Cases.CLEAR:
      return state.map((item) => {
        if (item.id !== action.id) return item;
        return {
          id: item.id,
        };
      });
    case Cases.REPLACE:
      return action.value as DestinationType[];
    default:
      return state;
  }
};

export const HomePage = () => {
  const [destinations, dispatch] = useReducer(reducer, initialDestinations);
  const [numbOfPassengers, setNumberOfPassengers] = useState(1);
  const [startDate, setStartDate] = useState<Date>(
    new Date(dayjs(new Date()).add(1, "day").format())
  );
  const navigate = useNavigate();
  const location = useLocation();
  const {
    destinations: destinationsFromQuery,
    passengers,
    date,
  } = useGetDataFromQuery(location.search);

  useEffect(() => {
    if (destinationsFromQuery.length) {
      dispatch({ type: Cases.REPLACE, value: destinationsFromQuery });
    }
    if (passengers >= 1) {
      setNumberOfPassengers(passengers);
    }
    if (date && !dayjs(date).isBefore(new Date())) {
      setStartDate(new Date(dayjs(date).format()));
    }
  }, [destinationsFromQuery, passengers, date]);

  const onAddPassengers = () => setNumberOfPassengers((value) => value + 1);
  const onRemovePassengers = () => setNumberOfPassengers((value) => value - 1);

  const onAddDestination = () => dispatch({ type: Cases.ADD });

  const onRemoveDestination = (id: string) =>
    dispatch({ type: Cases.REMOVE, id });

  const onSelectDestination = (id: string, value: CityType) =>
    dispatch({ type: Cases.SELECT, id, value });

  const onClear = (id: string) => dispatch({ type: Cases.CLEAR, id });

  const isFormValid =
    destinations.every((item) => item.name) &&
    !!numbOfPassengers &&
    !!startDate;

  const onDateChange = (date: SetStateAction<Date>) => setStartDate(date);

  const onSubmit = () => {
    navigate(
      `${RESULTS_PAGE}?${getQueryStringFromObject(destinations, [
        "name",
        "latitude",
        "longitude",
      ])}&passengers=${numbOfPassengers}&date=${dayjs(startDate).valueOf()}`
    );
  };

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="bg-white rounded-3xl py-[62px] px-[89px]">
        <div className="flex items-start">
          <div className="mr-[78px]">
            <DestinationFormList
              destinations={destinations}
              onRemoveDestination={onRemoveDestination}
              onSelectDestination={onSelectDestination}
              onClear={onClear}
            />
          </div>
          <div>
            <PassengersCounter
              className="mb-5 mt-2"
              value={numbOfPassengers}
              onIncrease={onAddPassengers}
              onDecrease={onRemovePassengers}
            />
            <DatePicker startDate={startDate} onChange={onDateChange} />
          </div>
        </div>

        <div className="flex items-center ml-[-25px]">
          <Button onClick={onAddDestination}>
            <AddIcon />
          </Button>
          <Button color="primary" onClick={onAddDestination}>
            Add destination
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            color="dark"
            variant="filled"
            disabled={!isFormValid}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
