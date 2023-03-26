import { Routes as RoutesCompnent, Route } from "react-router-dom";
import { HomePage } from "@/pages/home-page";
import { ResultsPage } from "@/pages/results-page";

export const HOME_PAGE = "/";
export const RESULTS_PAGE = "/results";

export const Routes = () => {
  return (
    <RoutesCompnent>
      <Route path={HOME_PAGE} element={<HomePage />}></Route>
      <Route path={RESULTS_PAGE} element={<ResultsPage />}></Route>
    </RoutesCompnent>
  );
};
